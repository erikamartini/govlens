import { useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { Send, Paperclip, CheckCircle2, FileText } from 'lucide-react'
import { Aviso, Toasts } from '../../components/ui'
import { useApp } from '../../context/AppContext'
import { SISTEMAS } from '../../data/mockData'

export default function SolicitarAuditoria() {
  const [params] = useSearchParams()
  const [sistemaId, setSistemaId] = useState(params.get('sistema') || '')
  const [justificativa, setJustificativa] = useState('')
  const [descricao, setDescricao] = useState('')
  const [anexos, setAnexos] = useState([])
  const [enviada, setEnviada] = useState(null)
  const [erros, setErros] = useState({})
  const { setSolicitacoes, toast, usuario } = useApp()
  const navigate = useNavigate()

  const anexar = () => setAnexos(a => [...a, `documento-demo-${a.length + 1}.pdf`])

  const submeter = (e) => {
    e.preventDefault()
    const er = {}
    if (!sistemaId) er.sistema = 'Selecione o sistema algorítmico.'
    if (justificativa.trim().length < 20) er.just = 'Descreva a justificativa com pelo menos 20 caracteres.'
    setErros(er)
    if (Object.keys(er).length) return
    const protocolo = `SOL-2026-${String(40 + Math.floor(Math.random() * 50)).padStart(4, '0')}`
    const nova = {
      id: protocolo, sistemaId, cidadao: usuario.nome, email: usuario.email,
      justificativa, descricaoProblema: descricao || '—', data: new Date().toISOString().slice(0, 10),
      status: 'pendente',
      historico: [{ data: `${new Date().toISOString().slice(0, 10)} ${new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}`, acao: 'Solicitação registrada pelo cidadão.', usuario: usuario.nome }],
      decisao: null
    }
    setSolicitacoes(s => [nova, ...s])
    setEnviada(nova)
    toast(`Solicitação ${protocolo} enviada para análise.`)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  if (enviada) {
    return (
      <>
        <div className="card card-pad" style={{ maxWidth: 640, margin: '0 auto', textAlign: 'center', padding: 44 }}>
          <CheckCircle2 size={52} color="var(--verde)" aria-hidden="true" />
          <h1 style={{ fontSize: '1.5rem', margin: '14px 0 6px' }}>Solicitação enviada</h1>
          <p className="muted">Sua solicitação foi registrada para análise da equipe administrativa.</p>
          <div className="stat mt-3" style={{ maxWidth: 320, margin: '0 auto' }}>
            <span className="rotulo">Número de protocolo</span>
            <span className="valor mono">{enviada.id}</span>
            <span className="nota">Guarde este número para acompanhar o processo.</span>
          </div>
          <div className="flex mt-3" style={{ justifyContent: 'center' }}>
            <button className="btn btn-primario" onClick={() => navigate(`/cidadao/solicitacoes/${enviada.id}`)}>Acompanhar solicitação</button>
            <button className="btn btn-contorno" onClick={() => { setEnviada(null); setSistemaId(''); setJustificativa(''); setDescricao(''); setAnexos([]) }}>Nova solicitação</button>
          </div>
        </div>
        <Toasts />
      </>
    )
  }

  return (
    <>
      <h1 style={{ fontSize: '1.5rem' }}>Solicitar auditoria</h1>
      <p className="muted mb-3">Descreva a situação que motivou a solicitação. A análise é realizada pela equipe administrativa.</p>
      <form onSubmit={submeter} noValidate style={{ maxWidth: 720 }}>
        <div className="card card-pad mb-3">
          <div className="campo">
            <label htmlFor="s-sistema" className="req">Sistema algorítmico</label>
            <select id="s-sistema" className="select" value={sistemaId} onChange={e => setSistemaId(e.target.value)} aria-invalid={!!erros.sistema}>
              <option value="">Selecione…</option>
              {SISTEMAS.map(s => <option key={s.id} value={s.id}>{s.nome}</option>)}
            </select>
            {erros.sistema && <p role="alert" className="small" style={{ color: 'var(--vermelho)', marginTop: 4 }}>{erros.sistema}</p>}
          </div>
          <div className="campo">
            <label htmlFor="s-just" className="req">Justificativa da solicitação</label>
            <textarea id="s-just" className="textarea" value={justificativa} onChange={e => setJustificativa(e.target.value)} placeholder="Explique por que este sistema deve ser auditado." aria-invalid={!!erros.just} />
            {erros.just && <p role="alert" className="small" style={{ color: 'var(--vermelho)', marginTop: 4 }}>{erros.just}</p>}
          </div>
          <div className="campo">
            <label htmlFor="s-desc">Descrição do problema identificado</label>
            <textarea id="s-desc" className="textarea" style={{ minHeight: 90 }} value={descricao} onChange={e => setDescricao(e.target.value)} placeholder="Detalhe o que aconteceu, quando e com quem (sem incluir dados pessoais de terceiros)." />
            <p className="dica">Não inclua informações pessoais suas ou de outras pessoas no texto.</p>
          </div>
          <div className="campo">
            <label>Anexos demonstrativos</label>
            <div className="flex wrap">
              <button type="button" className="btn btn-contorno btn-sm" onClick={anexar}><Paperclip size={15} aria-hidden="true" /> Anexar documento (simulação)</button>
            </div>
            {anexos.map(a => (
              <div key={a} className="flex mt-1 small" style={{ gap: 6 }}><FileText size={14} aria-hidden="true" /> {a} <span className="muted">(exemplo ilustrativo)</span></div>
            ))}
          </div>
        </div>
        <Aviso tipo="info" className="mb-3">Ao enviar, sua solicitação passará por análise da equipe administrativa, que poderá aprová-la, rejeitá-la (com justificativa) ou pedir esclarecimentos.</Aviso>
        <div className="flex wrap">
          <button type="submit" className="btn btn-primario"><Send size={16} aria-hidden="true" /> Enviar solicitação</button>
          <Link to="/cidadao" className="btn btn-contorno">Cancelar</Link>
        </div>
      </form>
      <Toasts />
    </>
  )
}
