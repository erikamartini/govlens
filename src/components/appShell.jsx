import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import {
  LayoutDashboard, Search, FileText, Send, Menu, X, Bell, LogOut, Users, Building2,
  FolderCog, ClipboardList, Settings, History, ShieldCheck, RefreshCcw, ChevronRight
} from 'lucide-react'
import { Logo, Toasts } from './ui'
import { useApp } from '../context/AppContext'

const MENUS = {
  cidadao: [
    { to: '/cidadao', rotulo: 'Início', icone: LayoutDashboard, fim: true },
    { to: '/cidadao/solicitar', rotulo: 'Solicitar auditoria', icone: Send, fim: true },
    { to: '/cidadao/solicitacoes', rotulo: 'Minhas solicitações', icone: ClipboardList, fim: true },
    { to: '/sistemas', rotulo: 'Sistemas algorítmicos', icone: Search, fim: true },
    { to: '/relatorios', rotulo: 'Relatórios publicados', icone: FileText, fim: true }
  ],
  auditor: [
    { to: '/auditor', rotulo: 'Painel de auditorias', icone: LayoutDashboard, fim: true },
    { to: '/auditor/auditorias', rotulo: 'Auditorias', icone: ClipboardList, fim: true },
    { to: '/auditor/importar', rotulo: 'Importação de dados', icone: FolderCog, fim: true },
    { to: '/auditor/indicadores', rotulo: 'Análise de indicadores', icone: ShieldCheck, fim: true },
    { to: '/historico', rotulo: 'Histórico de atividades', icone: History, fim: true }
  ],
  admin: [
    { to: '/admin', rotulo: 'Painel administrativo', icone: LayoutDashboard, fim: true },
    { to: '/admin/solicitacoes', rotulo: 'Solicitações', icone: ClipboardList, fim: true },
    { to: '/admin/publicacao', rotulo: 'Autorização de publicação', icone: FileText, fim: true },
    { to: '/admin/usuariaseorgaos', rotulo: 'Usuários e órgãos', icone: Users, fim: true },
    { to: '/admin/sistemas', rotulo: 'Sistemas registrados', icone: FolderCog, fim: true },
    { to: '/historico', rotulo: 'Histórico de atividades', icone: History, fim: true }
  ]
}

function MenuPerfil({ fechar }) {
  const { alternarPerfil, perfil, logout } = useApp()
  const navigate = useNavigate()
  const ir = (p) => { fechar(); alternarPerfil(p); navigate(p === 'cidadao' ? '/cidadao' : p === 'auditor' ? '/auditor' : '/admin') }
  return (
    <div style={{ padding: '12px 10px', borderTop: '1px solid rgba(255,255,255,.1)' }}>
      <div className="nav-grupo">Demonstração — alternar perfil</div>
      {['cidadao', 'auditor', 'admin'].map(p => (
        <button key={p} className={`nav-item ${perfil === p ? 'ativo' : ''}`} onClick={() => ir(p)}>
          <RefreshCcw size={17} aria-hidden="true" />
          {p === 'cidadao' ? 'Cidadã(o)' : p === 'auditor' ? 'Auditor(a)' : 'Administrador(a)'}
          <ChevronRight size={14} style={{ marginLeft: 'auto' }} aria-hidden="true" />
        </button>
      ))}
      <button className="nav-item" onClick={() => { fechar(); logout(); navigate('/') }}>
        <LogOut size={17} aria-hidden="true" /> Sair da plataforma
      </button>
    </div>
  )
}

export default function LayoutAutenticado() {
  const { usuario, perfil, notificacoes, notifNaoLidas, marcarNotificacoesLidas } = useApp()
  const [lateral, setLateral] = useState(false)
  const [painelNotif, setPainelNotif] = useState(false)
  const itens = MENUS[perfil] || []
  const iniciais = usuario.nome.split(' ').map(p => p[0]).slice(0, 2).join('')

  return (
    <div className="app-shell">
      <a href="#conteudo" className="skip-link">Ir para o conteúdo principal</a>
      <aside className={`app-lateral ${lateral ? 'aberta' : ''}`} aria-label="Menu lateral">
        <div className="marca"><Logo invertido tamanho={30} /></div>
        <nav>
          {itens.map(({ to, rotulo, icone: Icone, fim }) => (
            <NavLink key={to} to={to} end={fim} className={({ isActive }) => `nav-item ${isActive ? 'ativo' : ''}`} onClick={() => setLateral(false)}>
              <Icone size={17} aria-hidden="true" /> {rotulo}
            </NavLink>
          ))}
        </nav>
        <MenuPerfil fechar={() => setLateral(false)} />
      </aside>

      <div className="app-conteudo">
        <header className="app-topo">
          <div className="flex">
            <button className="menu-btn" onClick={() => setLateral(true)} aria-label="Abrir menu"><Menu size={22} /></button>
            <span className="perfil-badge">{usuario.rotulo}</span>
          </div>
          <div className="usuario">
            <div style={{ position: 'relative' }}>
              <button className="nav-item" style={{ color: 'var(--texto)' }} aria-label={`Notificações: ${notifNaoLidas} não lidas`} onClick={() => { setPainelNotif(p => !p); marcarNotificacoesLidas() }}>
                <Bell size={19} />
                {notifNaoLidas > 0 && <span style={{ position: 'absolute', top: 4, right: 4, width: 9, height: 9, background: 'var(--vermelho)', borderRadius: '50%' }} aria-hidden="true" />}
              </button>
              {painelNotif && (
                <div className="card card-pad" style={{ position: 'absolute', right: 0, top: 48, width: 320, zIndex: 300 }}>
                  <h3 style={{ fontSize: '1rem', marginBottom: 10 }}>Notificações</h3>
                  {notificacoes.map(n => (
                    <div key={n.id} className="small mb-2" style={{ paddingBottom: 8, borderBottom: '1px solid var(--borda)' }}>
                      <div className="muted">{n.data}</div>{n.texto}
                    </div>
                  ))}
                  {!notificacoes.length && <p className="muted small">Nenhuma notificação.</p>}
                </div>
              )}
            </div>
            <div className="avatar" aria-hidden="true">{iniciais}</div>
            <div style={{ lineHeight: 1.2 }}>
              <div style={{ fontSize: '.88rem', fontWeight: 600, color: 'var(--marinho)' }}>{usuario.nome}</div>
              <div className="small muted">{usuario.cargo}</div>
            </div>
          </div>
        </header>
        <main id="conteudo" className="app-main"><Outlet /></main>
      </div>
      {lateral && <div onClick={() => setLateral(false)} style={{ position: 'fixed', inset: 0, background: 'rgba(20,43,69,.4)', zIndex: 150 }} aria-hidden="true" />}
      <Toasts />
    </div>
  )
}
