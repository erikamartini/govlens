import { Link, useNavigate, useParams } from 'react-router-dom'
import { ArrowLeft, ChevronRight, Info, Landmark } from 'lucide-react'
import { CabecalhoPublico, Rodape } from '../../components/publicShell'
import { SITUACAO_SISTEMA, Aviso } from '../../components/ui'
import { sistemaPorId, orgaoPorId } from '../../data/mockData'
import { useApp } from '../../context/AppContext'

export default function DetalheSistema() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { perfil } = useApp()
  const s = sistemaPorId(id)
  if (!s) return navigate('/sistemas', { replace: true })
  const o = orgaoPorId(s.orgaoId)

  const solicitar = () => {
    if (!perfil) navigate('/entrar', { state: { de: `/cidadao/solicitar?sistema=${s.id}` } })
    else navigate(perfil === 'cidadao' ? `/cidadao/solicitar?sistema=${s.id}` : '/entrar')
  }

  return (
    <>
      <CabecalhoPublico />
      <div className="container" style={{ padding: '24px 24px 56px' }}>
        <Link className="voltar-link" to="/sistemas"><ArrowLeft size={15} aria-hidden="true" /> Voltar ao catálogo</Link>

        <div className="flex between wrap mb-2" style={{ alignItems: 'flex-start' }}>
          <div style={{ maxWidth: 720 }}>
            <div className="flex mb-1">
              <span className="selo" style={{ background: 'var(--azul-claro)', color: 'var(--institucional)' }}>{s.area}</span>
              <span className={`selo ${SITUACAO_SISTEMA[s.situacao]}`}>{s.situacao}</span>
            </div>
            <h1 style={{ fontSize: '1.9rem' }}>{s.nome}</h1>
            <p className="muted"><Landmark size={15} style={{ verticalAlign: -3 }} aria-hidden="true" /> {o.nome} · Esfera {o.esfera}</p>
          </div>
          <button className="btn btn-primario" onClick={solicitar}>Solicitar auditoria deste sistema</button>
        </div>

        <div className="grid-2 mt-3">
          <div className="card card-pad">
            <h2 style={{ fontSize: '1.15rem', marginBottom: 8 }}>Finalidade</h2>
            <p className="muted">{s.finalidade}</p>
            <hr className="hr" />
            <h2 style={{ fontSize: '1.15rem', marginBottom: 8 }}>Como funciona</h2>
            <p className="muted">{s.descricao}</p>
          </div>
          <div className="card card-pad">
            <h2 style={{ fontSize: '1.15rem', marginBottom: 8 }}>Critérios conhecidos</h2>
            <ul style={{ paddingLeft: 20, color: 'var(--texto)' }}>{s.criterios.map((c, i) => <li key={i} className="mb-1">{c}</li>)}</ul>
            <hr className="hr" />
            <h2 style={{ fontSize: '1.15rem', marginBottom: 8 }}>Dados utilizados</h2>
            <ul style={{ paddingLeft: 20, color: 'var(--texto)' }}>{s.dadosUtilizados.map((d, i) => <li key={i} className="mb-1">{d}</li>)}</ul>
          </div>
        </div>

        <div className="card card-pad mt-3">
          <h2 style={{ fontSize: '1.15rem', marginBottom: 12 }}>Responsável identificado e informações institucionais</h2>
          <div className="grid-2">
            <div>
              <h3 style={{ fontSize: '.95rem', marginBottom: 6 }}>Responsável (divulgável)</h3>
              <p className="muted small">{s.responsavel.cargo}<br />{s.responsavel.orgao}<br />{s.responsavel.contato}</p>
              <Aviso tipo="info" className="mt-2">Somente informações institucionais apropriadas para divulgação são exibidas. Não constam dados pessoais, credenciais ou informações confidenciais.</Aviso>
            </div>
            <div>
              <h3 style={{ fontSize: '.95rem', marginBottom: 6 }}>Informações institucionais</h3>
              <table className="tabela">
                <tbody>
                  {s.infosInstitucionais.map((inf, i) => (
                    <tr key={i}><td style={{ width: '45%', color: 'var(--texto)', fontWeight: 600 }}>{inf.rotulo}</td><td>{inf.valor}</td></tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="card card-pad mt-3 flex between wrap">
          <div>
            <h3 style={{ fontSize: '1.05rem' }}>Deseja acompanhar ou solicitar auditoria deste sistema?</h3>
            <p className="muted small mt-1">A solicitação passa por análise da equipe administrativa antes de instaurar a auditoria. <ChevronRight size={13} style={{ verticalAlign: -2 }} aria-hidden="true" /></p>
          </div>
          {!perfil
            ? <div className="flex wrap"><Link to="/entrar" className="btn btn-marinho">Entrar</Link><Link to="/cadastro" className="btn btn-contorno">Criar conta</Link></div>
            : <button className="btn btn-primario" onClick={solicitar}>Solicitar auditoria deste sistema</button>}
        </div>
      </div>
      <Rodape />
    </>
  )
}
