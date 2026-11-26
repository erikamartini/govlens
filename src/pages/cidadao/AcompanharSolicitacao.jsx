import { Link, useParams } from 'react-router-dom'
import { ArrowLeft, XCircle, History } from 'lucide-react'
import { SeloStatus, Aviso, Toasts } from '../../components/ui'
import { useApp } from '../../context/AppContext'
import { sistemaPorId, orgaoPorId } from '../../data/mockData'

export default function AcompanharSolicitacao() {
  const { id } = useParams()
  const { solicitacoes, setSolicitacoes, toast } = useApp()
  const s = solicitacoes.find(x => x.id === id)

  if (!s) return (
    <div className="vazio card card-pad">
      <p>Solicitação não encontrada.</p>
      <Link to="/cidadao/solicitacoes" className="btn btn-contorno btn-sm mt-2">Voltar à lista</Link>
    </div>
  )
  const sistema = sistemaPorId(s.sistemaId)

  const cancelar = () => {
    setSolicitacoes(list => list.map(x => x.id === id ? {
      ...x, status: 'rejeitada',
      historico: [...x.historico, { data: new Date().toLocaleString('pt-BR', { dateStyle: 'short', timeStyle: 'short' }).replace(',', ''), acao: 'Solicitação cancelada pelo próprio cidadão.', usuario: s.cidadao }],
      decisao: { tipo: 'rejeitada', justificativa: 'Cancelada a pedido da própria pessoa solicitante enquanto aguardava análise.' }
    } : x))
    toast('Solicitação cancelada.', 'alerta')
  }

  return (
    <>
      <Link to="/cidadao/solicitacoes" className="voltar-link"><ArrowLeft size={15} aria-hidden="true" /> Voltar às solicitações</Link>
      <div className="flex between wrap mb-3">
        <div>
          <h1 style={{ fontSize: '1.55rem' }}>Solicitação <span className="mono" style={{ color: 'var(--institucional)' }}>{s.id}</span></h1>
          <p className="muted">Sistema relacionado: <Link to={`/sistemas/${s.sistemaId}`}>{sistema?.nome}</Link></p>
        </div>
        <SeloStatus status={s.status} />
      </div>

      <div className="grid-2">
        <div className="card card-pad">
          <h2 style={{ fontSize: '1.1rem', marginBottom: 10 }}>Identificação</h2>
          <table className="tabela">
            <tbody>
              <tr><td style={{ color: 'var(--texto)', fontWeight: 600, width: '40%' }}>Protocolo</td><td className="mono">{s.id}</td></tr>
              <tr><td style={{ color: 'var(--texto)', fontWeight: 600 }}>Sistema</td><td>{sistema?.nome}</td></tr>
              <tr><td style={{ color: 'var(--texto)', fontWeight: 600 }}>Órgão responsável</td><td>{sistema && orgaoPorId(sistema.orgaoId)?.nome}</td></tr>
              <tr><td style={{ color: 'var(--texto)', fontWeight: 600 }}>Data de envio</td><td>{new Date(s.data + 'T12:00').toLocaleDateString('pt-BR')}</td></tr>
              <tr><td style={{ color: 'var(--texto)', fontWeight: 600 }}>Situação atual</td><td><SeloStatus status={s.status} /></td></tr>
            </tbody>
          </table>
        </div>
        <div className="card card-pad">
          <h2 style={{ fontSize: '1.1rem', marginBottom: 10 }}>Conteúdo da solicitação</h2>
          <h3 style={{ fontSize: '.9rem', marginBottom: 4 }}>Justificativa</h3>
          <p className="muted small mb-2">{s.justificativa}</p>
          <h3 style={{ fontSize: '.9rem', marginBottom: 4 }}>Descrição do problema</h3>
          <p className="muted small">{s.descricaoProblema}</p>
          <p className="small muted mt-2">Anexos: nenhum documento obrigatório (protótipo demonstrativo).</p>
        </div>
      </div>

      <div className="card card-pad mt-3">
        <h2 style={{ fontSize: '1.1rem', marginBottom: 12, display: 'flex', alignItems: 'center', gap: 8 }}><History size={17} aria-hidden="true" /> Histórico de movimentações</h2>
        <ul style={{ listStyle: 'none' }}>
          {s.historico.map((h, i) => (
            <li key={i} style={{ display: 'flex', gap: 12, paddingBottom: 14, borderLeft: '2px solid var(--borda)', paddingLeft: 16, marginLeft: 6, position: 'relative' }}>
              <span style={{ position: 'absolute', left: -6, top: 4, width: 10, height: 10, borderRadius: '50%', background: 'var(--institucional)' }} aria-hidden="true" />
              <div>
                <div className="small" style={{ fontWeight: 600, color: 'var(--marinho)' }}>{h.acao}</div>
                <div className="small muted">{h.data} · {h.usuario}</div>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {s.decisao && (
        <div className="card card-pad mt-3">
          <h2 style={{ fontSize: '1.1rem', marginBottom: 8 }}>Decisão</h2>
          <SeloStatus status={s.decisao.tipo} />
          <p className="muted mt-1">{s.decisao.justificativa}</p>
        </div>
      )}

      {s.status === 'pendente' && (
        <div className="card card-pad mt-3 flex between wrap">
          <div style={{ maxWidth: 520 }}>
            <h2 style={{ fontSize: '1.05rem' }}>Cancelar solicitação</h2>
            <p className="muted small mt-1">Você pode cancelar esta solicitação somente enquanto ela estiver pendente de análise. Esta ação não pode ser desfeita.</p>
          </div>
          <button className="btn btn-perigo" onClick={cancelar}><XCircle size={16} aria-hidden="true" /> Cancelar solicitação</button>
        </div>
      )}
      <Toasts />
    </>
  )
}


