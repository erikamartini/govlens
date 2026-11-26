import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ArrowLeft, CheckCircle2, XCircle, FileText, PenLine, ShieldCheck, Building2 } from 'lucide-react'
import { SeloStatus, Aviso, Toasts } from '../../components/ui'
import { useApp } from '../../context/AppContext'
import { sistemaPorId } from '../../data/mockData'

// Relatórios no fluxo de publicação (3 etapas obrigatórias)
const FLUXO = [
  { id: 'REL-2026-001', titulo: 'Auditoria do Sistema de Análise de Solicitações de Benefícios', sistemaId: 'social-beneficios', auditoria: 'AUD-2026-0011', autor: 'Dra. Helena Vasconcelos', validador: 'Aud. Marcos Tavares', validacao: 'Aprovada em 21/11/2026 — metodologia e limitações revisadas sem ressalvas.', decisoes: [{ d: '18/11/2026', t: 'Relatório concluído (v1.0) pela auditoria responsável.', a: 'Dra. Helena Vasconcelos' }, { d: '21/11/2026', t: 'Validação técnica aprovada pelo validador designado.', a: 'Aud. Marcos Tavares' }], status: 'aguardando_autorizacao' },
  { id: 'REL-2026-004', titulo: 'Auditoria do Sistema de Análise de Ocorrências de Segurança Pública', sistemaId: 'seg-analise', auditoria: 'AUD-2026-0002', autor: 'Aud. Marcos Tavares', validador: 'Dra. Helena Vasconcelos', validacao: 'Aprovada com ressalvas em 12/11/2026 — recomendação adicional de revisão semestral incluída.', decisoes: [{ d: '05/11/2026', t: 'Relatório concluído (v1.0).', a: 'Aud. Marcos Tavares' }, { d: '12/11/2026', t: 'Validação técnica aprovada com ressalvas documentadas.', a: 'Dra. Helena Vasconcelos' }], status: 'aguardando_autorizacao' }
]

export default function AutorizacaoPublicacao() {
  const [aberto, setAberto] = useState(null)
  const [just, setJust] = useState('')
  const [erroJust, setErroJust] = useState(false)
  const [publicados, setPublicados] = useState([])
  const { toast } = useApp()
  const navigate = useNavigate()
  const r = FLUXO.find(x => x.id === aberto && !publicados.includes(x.id))

  const autorizar = () => {
    setPublicados(p => [...p, aberto]); setAberto(null); setJust('')
    toast(`Publicação do relatório ${aberto} autorizada e simulada no portal.`)
  }
  const rejeitar = () => {
    if (just.trim().length < 15) { setErroJust(true); return }
    setPublicados(p => [...p, aberto]); setAberto(null); setJust('')
    toast('Publicação rejeitada com justificativa registrada.', 'alerta')
  }

  const Etapas = ({ compacto }) => (
    <div className="steps" style={{ marginBlock: compacto ? 8 : 14 }}>
      <span className="step ok"><span className="num">1</span> Elaboração pelo auditor responsável</span>
      <span className="step ok"><span className="num">2</span> Validação técnica por outro auditor</span>
      <span className="step atual"><span className="num">3</span> Autorização administrativa</span>
    </div>
  )

  if (aberto && r) return (
    <>
      <button className="voltar-link" style={{ background: 'none', border: 'none' }} onClick={() => setAberto(null)}><ArrowLeft size={15} aria-hidden="true" /> Voltar</button>
      <h1 style={{ fontSize: '1.5rem' }}>{r.titulo}</h1>
      <p className="muted mb-2">Relatório <span className="mono">{r.id}</span> · Auditoria <span className="mono">{r.auditoria}</span> · {sistemaPorId(r.sistemaId)?.nome}</p>
      <Etapas />
      <div className="grid-2">
        <div className="card card-pad">
          <h2 style={{ fontSize: '1.1rem', marginBottom: 10 }}>Responsáveis e validação</h2>
          <table className="tabela">
            <tbody>
              <tr><td style={{ color: 'var(--texto)', fontWeight: 600, width: '42%' }}>Auditor responsável (elaboração)</td><td>{r.autor}</td></tr>
              <tr><td style={{ color: 'var(--texto)', fontWeight: 600 }}>Auditor validador</td><td>{r.validador}</td></tr>
              <tr><td style={{ color: 'var(--texto)', fontWeight: 600 }}>Resultado da validação</td><td><span className="selo selo-aprovada">Aprovada</span><br /><span className="small muted">{r.validacao}</span></td></tr>
            </tbody>
          </table>
          <Aviso tipo="info" className="mt-2">A validação técnica foi realizada por outra pessoa que não a autora do relatório, conforme exigido pela plataforma.</Aviso>
        </div>
        <div className="card card-pad">
          <h2 style={{ fontSize: '1.1rem', marginBottom: 10 }}>Histórico de decisões</h2>
          <ul style={{ listStyle: 'none' }}>
            {r.decisoes.map((d, i) => (
              <li key={i} className="mb-2" style={{ paddingLeft: 14, borderLeft: '2px solid var(--borda)' }}>
                <div className="small" style={{ fontWeight: 600, color: 'var(--marinho)' }}>{d.t}</div>
                <div className="small muted">{d.d} · {d.a}</div>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="card card-pad mt-3">
        <h2 style={{ fontSize: '1.1rem', marginBottom: 8 }}>Autorização administrativa de publicação</h2>
        <div className="campo">
          <label htmlFor="pub-just" className="req">Justificativa (obrigatória para rejeição; recomendada para autorização)</label>
          <textarea id="pub-just" className="textarea" style={{ minHeight: 80 }} value={just} onChange={e => setJust(e.target.value)} placeholder="Fundamente a decisão administrativa." aria-invalid={erroJust} />
          {erroJust && <p role="alert" className="small" style={{ color: 'var(--vermelho)', marginTop: 4 }}>A rejeição exige justificativa com pelo menos 15 caracteres.</p>}
        </div>
        <div className="flex wrap">
          <button className="btn btn-verde" onClick={autorizar}><CheckCircle2 size={16} aria-hidden="true" /> Autorizar publicação</button>
          <button className="btn btn-perigo" onClick={rejeitar}><XCircle size={16} aria-hidden="true" /> Rejeitar publicação</button>
        </div>
      </div>
      <Toasts />
    </>
  )

  return (
    <>
      <h1 style={{ fontSize: '1.5rem' }}>Autorização de publicação</h1>
      <p className="muted mb-2"><FileText size={16} style={{ verticalAlign: -3 }} aria-hidden="true" /> Relatórios que concluíram a validação técnica e aguardam decisão administrativa.</p>
      <Etapas compacto />
      <div className="card">
        <div className="tabela-wrap">
          <table className="tabela">
            <thead><tr><th>Relatório</th><th>Auditoria</th><th>Auditor responsável</th><th>Auditor validador</th><th>Validação</th><th>Situação</th><th aria-label="Ações"></th></tr></thead>
            <tbody>
              {FLUXO.map(x => {
                const done = publicados.includes(x.id)
                return (
                  <tr key={x.id}>
                    <td style={{ maxWidth: 280 }}>{x.titulo}<br /><span className="mono small">{x.id}</span></td>
                    <td className="mono small">{x.auditoria}</td>
                    <td className="small">{x.autor}</td>
                    <td className="small">{x.validador}</td>
                    <td><span className="selo selo-aprovada">Aprovada</span></td>
                    <td><span className={`selo ${done ? 'selo-neutro' : 'selo-pendente'}`}>{done ? 'Decisão registrada' : 'Aguardando autorização'}</span></td>
                    <td style={{ textAlign: 'right' }}>
                      {!done && <button className="btn btn-contorno btn-sm" onClick={() => { setAberto(x.id); setJust(''); setErroJust(false) }}>Analisar</button>}
                      {done && <Link to="/relatorios" className="small">Ver portal</Link>}
                    </td>
                  </tr>
                )
              })}
              {!FLUXO.length && <tr><td colSpan="7" className="vazio">Nenhum relatório aguardando autorização.</td></tr>}
            </tbody>
          </table>
        </div>
      </div>
      <div className="mt-3">
        <Aviso tipo="info" icone={<Building2 size={18} aria-hidden="true" />}>
          A publicação somente ocorre após as três etapas: <PenLine size={13} style={{ verticalAlign: -2 }} aria-hidden="true" /> elaboração pelo auditor responsável, <ShieldCheck size={13} style={{ verticalAlign: -2 }} aria-hidden="true" /> validação técnica por outro auditor e autorização administrativa nesta tela. O autor nunca valida o próprio relatório.
        </Aviso>
      </div>
      <Toasts />
    </>
  )
}
