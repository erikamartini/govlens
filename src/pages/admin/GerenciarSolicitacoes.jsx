import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ArrowLeft, Paperclip, CheckCircle2, XCircle, ClipboardList } from 'lucide-react'
import { SeloStatus, Aviso, Toasts } from '../../components/ui'
import { useApp } from '../../context/AppContext'
import { sistemaPorId, orgaoPorId } from '../../data/mockData'

export default function GerenciarSolicitacoes() {
  const { solicitacoes, setSolicitacoes, toast, setAuditorias } = useApp()
  const [aberta, setAberta] = useState(null)
  const [just, setJust] = useState('')
  const [erroJust, setErroJust] = useState(false)
  const navigate = useNavigate()

  const decidir = (tipo) => {
    if (just.trim().length < 15) { setErroJust(true); return }
    setErroJust(false)
    const s = solicitacoes.find(x => x.id === aberta)
    const agora = new Date().toLocaleString('pt-BR', { dateStyle: 'short', timeStyle: 'short' }).replace(',', '')
    setSolicitacoes(list => list.map(x => x.id === aberta ? {
      ...x, status: tipo,
      historico: [...x.historico, { data: agora, acao: tipo === 'aprovada' ? 'Solicitação aprovada pela equipe administrativa.' : 'Solicitação rejeitada pela equipe administrativa.', usuario: 'Equipe administrativa' }],
      decisao: { tipo, justificativa: just }
    } : x))
    if (tipo === 'aprovada' && s) {
      const novoId = `AUD-2026-00${15 + Math.floor(Math.random() * 80)}`
      setAuditorias(list => [...list, {
        id: novoId, sistemaId: s.sistemaId, origem: `Solicitação cidadã (${s.id})`,
        responsavel: 'Dra. Helena Vasconcelos', validador: 'Aud. Marcos Tavares',
        status: 'em_andamento', etapa: 1, dataInicio: new Date().toISOString().slice(0, 10),
        grupos: [{ nome: 'Grupo A', criterio: 'Grupo A (definir na auditoria)', total: 0, positivos: 0 },
        { nome: 'Grupo B', criterio: 'Grupo B (definir na auditoria)', total: 0, positivos: 0 }],
        participanteCount: 3
      }])
      toast(`Solicitação aprovada. Auditoria ${novoId} instaurada.`)
    } else {
      toast('Solicitação rejeitada com justificativa registrada.', 'alerta')
    }
    setAberta(null); setJust('')
  }

  const s = solicitacoes.find(x => x.id === aberta)

  return (
    <>
      {aberta ? (
        <>
          <Link to="/admin/solicitacoes" className="voltar-link" onClick={(e) => { e.preventDefault(); setAberta(null); navigate('/admin/solicitacoes') }}>
            <ArrowLeft size={15} aria-hidden="true" /> Voltar à lista
          </Link>
          <div className="flex between wrap mb-3">
            <h1 style={{ fontSize: '1.5rem' }}>Solicitação <span className="mono" style={{ color: 'var(--institucional)' }}>{s.id}</span></h1>
            <SeloStatus status={s.status} />
          </div>
          <div className="grid-2">
            <div className="card card-pad">
              <h2 style={{ fontSize: '1.1rem', marginBottom: 10 }}>Dados da solicitação</h2>
              <table className="tabela">
                <tbody>
                  <tr><td style={{ color: 'var(--texto)', fontWeight: 600, width: '40%' }}>Cidadã(o) solicitante</td><td>{s.cidadao}<br /><span className="small muted">{s.email}</span></td></tr>
                  <tr><td style={{ color: 'var(--texto)', fontWeight: 600 }}>Sistema relacionado</td><td><Link to={`/sistemas/${s.sistemaId}`}>{sistemaPorId(s.sistemaId)?.nome}</Link></td></tr>
                  <tr><td style={{ color: 'var(--texto)', fontWeight: 600 }}>Órgão</td><td>{orgaoPorId(sistemaPorId(s.sistemaId)?.orgaoId)?.nome}</td></tr>
                  <tr><td style={{ color: 'var(--texto)', fontWeight: 600 }}>Data de envio</td><td>{new Date(s.data + 'T12:00').toLocaleDateString('pt-BR')}</td></tr>
                  <tr><td style={{ color: 'var(--texto)', fontWeight: 600 }}>Anexos</td><td className="small"><Paperclip size={13} style={{ verticalAlign: -2 }} aria-hidden="true" /> Nenhum anexo obrigatório (protótipo)</td></tr>
                </tbody>
              </table>
            </div>
            <div className="card card-pad">
              <h2 style={{ fontSize: '1.1rem', marginBottom: 10 }}>Justificativa e descrição</h2>
              <h3 style={{ fontSize: '.9rem', marginBottom: 4 }}>Justificativa</h3>
              <p className="muted small mb-2">{s.justificativa}</p>
              <h3 style={{ fontSize: '.9rem', marginBottom: 4 }}>Descrição do problema</h3>
              <p className="muted small">{s.descricaoProblema}</p>
            </div>
          </div>

          {s.status === 'pendente' ? (
            <div className="card card-pad mt-3">
              <h2 style={{ fontSize: '1.1rem', marginBottom: 8 }}>Decisão da equipe administrativa</h2>
              <div className="campo">
                <label htmlFor="dec-just" className="req">Justificativa da decisão (obrigatória para aprovar e para rejeitar)</label>
                <textarea id="dec-just" className="textarea" value={just} onChange={e => setJust(e.target.value)} placeholder="Explique os critérios que fundamentam a decisão." aria-invalid={erroJust} />
                {erroJust && <p role="alert" className="small" style={{ color: 'var(--vermelho)', marginTop: 4 }}>A justificativa é obrigatória e deve ter pelo menos 15 caracteres.</p>}
              </div>
              <div className="flex wrap">
                <button className="btn btn-verde" onClick={() => decidir('aprovada')}><CheckCircle2 size={16} aria-hidden="true" /> Aprovar e instaurar auditoria</button>
                <button className="btn btn-perigo" onClick={() => decidir('rejeitada')}><XCircle size={16} aria-hidden="true" /> Rejeitar</button>
              </div>
              <div className="mt-3"><Aviso tipo="info">Ao aprovar, uma auditoria é instaurada automaticamente e atribuída a uma pessoa auditora. Ao rejeitar, a justificativa fica visível ao cidadão solicitante.</Aviso></div>
            </div>
          ) : (
            <div className="card card-pad mt-3">
              <h2 style={{ fontSize: '1.1rem', marginBottom: 8 }}>Decisão registrada</h2>
              <SeloStatus status={s.decisao?.tipo || s.status} />
              <p className="muted mt-1">{s.decisao?.justificativa}</p>
            </div>
          )}
        </>
      ) : (
        <>
          <h1 style={{ fontSize: '1.5rem' }}>Gerenciamento de solicitações</h1>
          <p className="muted mb-3"><ClipboardList size={16} style={{ verticalAlign: -3 }} aria-hidden="true" /> Solicitações recebidas de cidadãs e cidadãos. Toda decisão exige justificativa.</p>
          <div className="card">
            <div className="tabela-wrap">
              <table className="tabela">
                <thead><tr><th>Protocolo</th><th>Solicitante</th><th>Sistema</th><th>Data</th><th>Status</th><th aria-label="Ações"></th></tr></thead>
                <tbody>
                  {solicitacoes.map(x => (
                    <tr key={x.id}>
                      <td className="mono">{x.id}</td>
                      <td>{x.cidadao}</td>
                      <td style={{ maxWidth: 260 }}>{sistemaPorId(x.sistemaId)?.nome}</td>
                      <td>{new Date(x.data + 'T12:00').toLocaleDateString('pt-BR')}</td>
                      <td><SeloStatus status={x.status} /></td>
                      <td style={{ textAlign: 'right' }}>
                        <button className="btn btn-contorno btn-sm" onClick={() => { setAberta(x.id); setJust(''); setErroJust(false) }}>Abrir</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
      <Toasts />
    </>
  )
}
