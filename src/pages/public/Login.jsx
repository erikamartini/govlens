import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { ArrowLeft, LogIn, UserPlus, RefreshCcw } from 'lucide-react'
import { CabecalhoPublico } from '../../components/publicShell'
import { Logo, Aviso, Toasts } from '../../components/ui'
import { useApp } from '../../context/AppContext'

export default function Login() {
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [erro, setErro] = useState('')
  const { login, toast } = useApp()
  const navigate = useNavigate()
  const location = useLocation()
  const destino = location.state?.de || null

  const entrar = (perfil) => {
    setErro('')
    login(perfil)
    toast(`Bem-vinda(o), ${email || 'usuária(o) demonstração'}! Sessão simulada iniciada.`)
    navigate(destino && perfil === 'cidadao' ? destino : perfil === 'cidadao' ? '/cidadao' : perfil === 'auditor' ? '/auditor' : '/admin')
  }

  const submeter = (e) => {
    e.preventDefault()
    if (!email || !senha) { setErro('Informe e-mail e senha para entrar. Em demonstração, qualquer valor é aceito.'); return }
    const p = email.includes('auditor') ? 'auditor' : email.includes('admin') ? 'admin' : 'cidadao'
    entrar(p)
  }

  const demo = [
    { p: 'cidadao', rotulo: 'Cidadã(o)', desc: 'Acompanhar solicitações e solicitar auditorias' },
    { p: 'auditor', rotulo: 'Auditor(a)', desc: 'Conduzir auditorias, indicadores e relatórios' },
    { p: 'admin', rotulo: 'Administrador(a)', desc: 'Gerenciar solicitações e autorizar publicações' }
  ]

  return (
    <>
      <CabecalhoPublico />
      <div className="container" style={{ padding: '48px 24px 64px' }}>
        <Link to="/" className="voltar-link"><ArrowLeft size={15} aria-hidden="true" /> Voltar ao portal público</Link>
        <div style={{ maxWidth: 460, margin: '0 auto' }}>
          <div className="card card-pad">
            <div style={{ textAlign: 'center', marginBottom: 20 }}><Logo tamanho={36} /></div>
            <h1 style={{ fontSize: '1.4rem', textAlign: 'center' }}>Entrar na plataforma</h1>
            <p className="muted" style={{ textAlign: 'center', marginBottom: 20 }}>Ambiente demonstrativo — nenhuma credencial real é verificada.</p>

            {erro && <div className="mb-2"><Aviso tipo="erro">{erro}</Aviso></div>}

            <form onSubmit={submeter}>
              <div className="campo">
                <label htmlFor="email" className="req">E-mail</label>
                <input id="email" className="input" type="email" autoComplete="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="nome@email.com" />
              </div>
              <div className="campo">
                <label htmlFor="senha" className="req">Senha</label>
                <input id="senha" className="input" type="password" autoComplete="current-password" value={senha} onChange={e => setSenha(e.target.value)} placeholder="••••••••" />
                <p className="dica">Demonstração: qualquer e-mail e senha entram no ambiente.</p>
              </div>
              <button type="submit" className="btn btn-primario" style={{ width: '100%' }}><LogIn size={17} aria-hidden="true" /> Entrar</button>
            </form>

            <div className="flex mt-3" style={{ justifyContent: 'center' }}>
              <Link to="/cadastro" className="btn btn-contorno btn-sm"><UserPlus size={15} aria-hidden="true" /> Criar conta</Link>
            </div>
          </div>

          <div className="card card-pad mt-3">
            <h2 style={{ fontSize: '1.05rem', display: 'flex', gap: 8, alignItems: 'center' }}><RefreshCcw size={18} aria-hidden="true" /> Demonstração de perfis</h2>
            <p className="muted small mt-1 mb-2">Selecione um perfil para explorar os ambientes sem realizar cadastro:</p>
            {demo.map(d => (
              <button key={d.p} className="btn btn-contorno btn-sm mt-1" style={{ width: '100%', justifyContent: 'space-between' }} onClick={() => entrar(d.p)}>
                <span style={{ fontWeight: 600 }}>{d.rotulo}</span><span className="small muted">{d.desc}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
      <Toasts />
    </>
  )
}
