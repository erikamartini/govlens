import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ArrowLeft, UserPlus, Lock } from 'lucide-react'
import { CabecalhoPublico } from '../../components/publicShell'
import { Aviso, Toasts } from '../../components/ui'
import { useApp } from '../../context/AppContext'

export default function Cadastro() {
  const [form, setForm] = useState({ nome: '', email: '', senha: '', conf: '' })
  const [erros, setErros] = useState({})
  const [aceite, setAceite] = useState(false)
  const { toast } = useApp()
  const navigate = useNavigate()
  const set = (k) => (e) => setForm(f => ({ ...f, [k]: e.target.value }))

  const submeter = (e) => {
    e.preventDefault()
    const er = {}
    if (!form.nome.trim()) er.nome = 'Informe o nome completo.'
    if (!/^\S+@\S+\.\S+$/.test(form.email)) er.email = 'Informe um e-mail válido.'
    if (form.senha.length < 6) er.senha = 'A senha deve ter pelo menos 6 caracteres.'
    if (form.conf !== form.senha) er.conf = 'As senhas não coincidem.'
    if (!aceite) er.aceite = 'É necessário ler e aceitar o aviso de privacidade.'
    setErros(er)
    if (Object.keys(er).length) return
    toast('Conta criada com sucesso (simulação). Utilize a entrada por demonstração para acessar.')
    navigate('/entrar')
  }

  const campoErro = (k) => erros[k] ? <p role="alert" className="small" style={{ color: 'var(--vermelho)', marginTop: 4 }}>{erros[k]}</p> : null

  return (
    <>
      <CabecalhoPublico />
      <div className="container" style={{ padding: '48px 24px 64px' }}>
        <Link to="/" className="voltar-link"><ArrowLeft size={15} aria-hidden="true" /> Voltar ao portal público</Link>
        <div style={{ maxWidth: 520, margin: '0 auto' }}>
          <div className="card card-pad">
            <h1 style={{ fontSize: '1.4rem', textAlign: 'center' }}>Cadastro de cidadã(o)</h1>
            <p className="muted" style={{ textAlign: 'center', marginBottom: 22 }}>Crie sua conta para solicitar e acompanhar auditorias.</p>
            <form onSubmit={submeter} noValidate>
              <div className="campo">
                <label htmlFor="nome" className="req">Nome completo</label>
                <input id="nome" className="input" value={form.nome} onChange={set('nome')} autoComplete="name" aria-invalid={!!erros.nome} />
                {campoErro('nome')}
              </div>
              <div className="campo">
                <label htmlFor="c-email" className="req">E-mail</label>
                <input id="c-email" className="input" type="email" value={form.email} onChange={set('email')} autoComplete="email" aria-invalid={!!erros.email} />
                {campoErro('email')}
              </div>
              <div className="campo">
                <label htmlFor="c-senha" className="req">Senha</label>
                <input id="c-senha" className="input" type="password" value={form.senha} onChange={set('senha')} autoComplete="new-password" aria-invalid={!!erros.senha} />
                {campoErro('senha')}
              </div>
              <div className="campo">
                <label htmlFor="c-conf" className="req">Confirmação de senha</label>
                <input id="c-conf" className="input" type="password" value={form.conf} onChange={set('conf')} autoComplete="new-password" aria-invalid={!!erros.conf} />
                {campoErro('conf')}
              </div>
              <div className="campo">
                <label style={{ display: 'flex', gap: 8, alignItems: 'flex-start', fontWeight: 500 }}>
                  <input type="checkbox" checked={aceite} onChange={e => setAceite(e.target.checked)} style={{ marginTop: 4 }} />
                  <span>Li e concordo com o aviso de privacidade abaixo.</span>
                </label>
                {campoErro('aceite')}
              </div>
              <Aviso tipo="info" className="mb-2" icone={<Lock size={18} aria-hidden="true" />}>
                <strong>Privacidade:</strong> seus dados serão utilizados exclusivamente para identificar sua participação nas solicitações de auditoria e comunicar andamentos. Não são compartilhados com órgãos auditados nem usados para qualquer outra finalidade. Este é um protótipo acadêmico: nenhum dado é armazenado de forma permanente.
              </Aviso>
              <button type="submit" className="btn btn-primario" style={{ width: '100%' }}><UserPlus size={17} aria-hidden="true" /> Criar conta</button>
            </form>
            <p className="muted small mt-2" style={{ textAlign: 'center' }}>Já possui conta? <Link to="/entrar">Entrar</Link></p>
          </div>
        </div>
      </div>
      <Toasts />
    </>
  )
}
