import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { Menu, X, LogIn } from 'lucide-react'
import { Logo } from './ui'

const LINKS = [
  { to: '/', rotulo: 'Início' },
  { to: '/sistemas', rotulo: 'Sistemas algorítmicos' },
  { to: '/relatorios', rotulo: 'Relatórios de auditoria' },
  { to: '/sobre', rotulo: 'Sobre o GovLens' }
]

export function CabecalhoPublico() {
  const [aberto, setAberto] = useState(false)
  const navigate = useNavigate()
  const navCls = ({ isActive }) => `nav-item ${isActive ? 'ativo' : ''}`
  return (
    <header style={{ background: '#fff', borderBottom: '1px solid var(--borda)', position: 'sticky', top: 0, zIndex: 100 }}>
      <div className="container flex between" style={{ height: 72 }}>
        <Link to="/" style={{ textDecoration: 'none' }} aria-label="GovLens — página inicial"><Logo /></Link>
        <nav className="app-lateral-aberta" aria-label="Navegação principal" style={{ display: 'flex' }}>
          <div className="nav-desktop">
            {LINKS.map(l => (
              <NavLink key={l.to} to={l.to} className={({ isActive }) => `nav-link ${isActive ? 'ativo' : ''}`} onClick={() => setAberto(false)}>
                {l.rotulo}
              </NavLink>
            ))}
          </div>
        </nav>
        <div className="flex">
          <button className="btn btn-marinho btn-sm" onClick={() => navigate('/entrar')}><LogIn size={16} aria-hidden="true" /> Entrar</button>
          <button className="menu-btn" aria-expanded={aberto} aria-label={aberto ? 'Fechar menu' : 'Abrir menu'} onClick={() => setAberto(a => !a)}>
            {aberto ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
      {aberto && (
        <nav className="container" aria-label="Navegação principal (mobile)" style={{ padding: '8px 24px 16px' }}>
          {LINKS.map(l => (
            <NavLink key={l.to} to={l.to} className="nav-item" onClick={() => setAberto(false)}>{l.rotulo}</NavLink>
          ))}
        </nav>
      )}
      <style>{`
        .nav-desktop { display: flex; gap: 4px; }
        .nav-link { padding: 8px 14px; border-radius: 8px; text-decoration: none; color: var(--texto); font-size: .92rem; font-weight: 500; }
        .nav-link:hover { color: var(--institucional); background: var(--azul-claro); }
        .nav-link.ativo { color: var(--institucional); font-weight: 600; background: var(--azul-claro); }
        @media (max-width: 900px) { .nav-desktop { display: none; } }
        @media (min-width: 901px) { header nav[aria-label$="(mobile)"] { display: none; } .menu-btn { display: none !important; } }
      `}</style>
    </header>
  )
}

export function Rodape() {
  return (
    <footer className="rodape">
      <div className="container">
        <div className="grade">
          <div>
            <Logo invertido />
            <p className="mt-2" style={{ maxWidth: 360 }}>
              Plataforma de transparência e auditoria algorítmica governamental. Projeto acadêmico conceitual: os dados exibidos são ilustrativos e não representam órgãos reais.
            </p>
          </div>
          <div>
            <h4>Plataforma</h4>
            <Link to="/sistemas">Sistemas algorítmicos</Link>
            <Link to="/relatorios">Relatórios de auditoria</Link>
            <Link to="/entrar">Entrar</Link>
            <Link to="/cadastro">Criar conta</Link>
          </div>
          <div>
            <h4>Transparência</h4>
            <Link to="/historico">Histórico de atividades</Link>
            <Link to="/sobre">Sobre o GovLens</Link>
            <Link to="/sobre">Política de dados</Link>
          </div>
          <div>
            <h4>Compromissos</h4>
            <span style={{ display: 'block', padding: '3px 0' }}>Responsabilidade humana nas decisões</span>
            <span style={{ display: 'block', padding: '3px 0' }}>Proteção de dados pessoais</span>
            <span style={{ display: 'block', padding: '3px 0' }}>Validação técnica independente</span>
          </div>
        </div>
        <div className="linha-final">
          <span>© 2026 GovLens — protótipo acadêmico sem vínculo institucional real.</span>
          <span>Acessibilidade: referência WCAG 2.1 nível AA e eMAG.</span>
        </div>
      </div>
    </footer>
  )
}
