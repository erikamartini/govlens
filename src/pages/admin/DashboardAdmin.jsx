import { Link } from 'react-router-dom'
import { Users, Building2, FolderCog, ClipboardList, FileText, Activity, ChevronRight } from 'lucide-react'
import { Aviso } from '../../components/ui'
import { useApp } from '../../context/AppContext'
import { ORGAOS, SISTEMAS, ATIVIDADES } from '../../data/mockData'

export default function DashboardAdmin() {
  const { solicitacoes, auditorias } = useApp()
  const pendentes = solicitacoes.filter(s => s.status === 'pendente').length
  const agAutorizacao = auditorias.filter(a => a.status === 'validado').length
  const stats = [
    { r: 'Total de usuários', v: 3, i: Users, n: 'Perfis demonstrativos' },
    { r: 'Órgãos cadastrados', v: ORGAOS.length, i: Building2 },
    { r: 'Sistemas registrados', v: SISTEMAS.length, i: FolderCog },
    { r: 'Solicitações pendentes', v: pendentes, i: ClipboardList },
    { r: 'Relatórios aguardando autorização', v: agAutorizacao, i: FileText }
  ]
  const menu = [
    ['Usuários', '/admin/usuariaseorgaos'], ['Perfis e autorizações', '/admin/usuariaseorgaos'],
    ['Órgãos públicos', '/admin/usuariaseorgaos'], ['Sistemas algorítmicos', '/admin/sistemas'],
    ['Solicitações de auditoria', '/admin/solicitacoes'], ['Auditorias', '/auditor/auditorias'],
    ['Relatórios', '/admin/publicacao'], ['Parâmetros', '/admin/usuariaseorgaos'], ['Histórico de atividades', '/historico']
  ]

  return (
    <>
      <h1 style={{ fontSize: '1.6rem' }}>Painel administrativo</h1>
      <p className="muted mb-3">Gestão da plataforma: usuários, órgãos, solicitações e autorização de publicações.</p>

      <div className="stats-grid mb-3">
        {stats.map(s => <div className="stat" key={s.r}><span className="rotulo"><s.i size={14} aria-hidden="true" /> {s.r}</span><span className="valor">{s.v}</span>{s.n && <span className="nota">{s.n}</span>}</div>)}
      </div>

      <div className="grid-2">
        <div className="card card-pad">
          <h2 style={{ fontSize: '1.1rem', marginBottom: 10 }}><Activity size={17} style={{ verticalAlign: -3 }} aria-hidden="true" /> Atividades recentes</h2>
          <div className="tabela-wrap">
            <table className="tabela">
              <thead><tr><th>Quando</th><th>Usuário</th><th>Ação</th></tr></thead>
              <tbody>
                {ATIVIDADES.slice(0, 5).map(a => (
                  <tr key={a.id}><td className="small">{a.data}</td><td className="small">{a.usuario}</td><td className="small">{a.acao} <span className="mono small">({a.entidade})</span></td></tr>
                ))}
              </tbody>
            </table>
          </div>
          <Link to="/historico" className="btn btn-contorno btn-sm mt-2">Histórico completo <ChevronRight size={14} aria-hidden="true" /></Link>
        </div>
        <div className="card card-pad">
          <h2 style={{ fontSize: '1.1rem', marginBottom: 10 }}>Menu administrativo</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
            {menu.map(([r, to]) => <Link key={r} to={to} className="btn btn-contorno btn-sm" style={{ justifyContent: 'flex-start' }}>{r}</Link>)}
          </div>
          {pendentes > 0 && <div className="mt-3"><Aviso tipo="alerta">{pendentes} solicitação(ões) aguardam decisão. Prazo sugerido de análise: 10 dias corridos (parâmetro demonstrativo).</Aviso></div>}
        </div>
      </div>
    </>
  )
}
