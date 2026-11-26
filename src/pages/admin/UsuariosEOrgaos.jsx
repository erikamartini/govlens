import { Building2, Users, ShieldCheck, FolderCog } from 'lucide-react'
import { ORGAOS, SISTEMAS, PERFIS } from '../../data/mockData'
import { SITUACAO_SISTEMA } from '../../components/ui'

export default function UsuariosEOrgaos() {
  return (
    <>
      <h1 style={{ fontSize: '1.5rem' }}>Usuários, perfis e órgãos</h1>
      <p className="muted mb-3">Gestão demonstrativa de contas, autorizações e órgãos públicos registrados na plataforma.</p>

      <div className="card mb-3">
        <div className="card-pad" style={{ paddingBottom: 6 }}><h2 style={{ fontSize: '1.15rem', display: 'flex', alignItems: 'center', gap: 8 }}><Users size={17} aria-hidden="true" /> Usuários e perfis</h2></div>
        <div className="tabela-wrap">
          <table className="tabela">
            <thead><tr><th>Nome</th><th>E-mail</th><th>Perfil</th><th>Autorizações ativas</th></tr></thead>
            <tbody>
              {Object.entries(PERFIS).map(([k, u]) => (
                <tr key={k}>
                  <td style={{ fontWeight: 600 }}>{u.nome}</td><td className="small">{u.email}</td>
                  <td><span className="perfil-badge">{u.rotulo}</span></td>
                  <td className="small">{k === 'auditor' ? 'Elaborar relatórios; validar relatórios de outros auditores' : k === 'admin' ? 'Aprovar solicitações; autorizar publicações; parâmetros' : 'Solicitar auditorias; acompanhar processos'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="card mb-3">
        <div className="card-pad" style={{ paddingBottom: 6 }}><h2 style={{ fontSize: '1.15rem', display: 'flex', alignItems: 'center', gap: 8 }}><ShieldCheck size={17} aria-hidden="true" /> Regra de validação técnica</h2></div>
        <div className="card-pad" style={{ paddingTop: 4 }}><p className="muted small">Parâmetro ativo: <strong>o auditor autor do relatório não pode realizar sua validação técnica</strong>. O sistema designa automaticamente outro auditor autorizado. Alterar este parâmetro é restrito ao perfil administrador (demonstrativo).</p></div>
      </div>

      <div className="card">
        <div className="card-pad" style={{ paddingBottom: 6 }}><h2 style={{ fontSize: '1.15rem', display: 'flex', alignItems: 'center', gap: 8 }}><Building2 size={17} aria-hidden="true" /> Órgãos públicos registrados</h2></div>
        <div className="tabela-wrap">
          <table className="tabela">
            <thead><tr><th>Órgão</th><th>Sigla</th><th>Esfera</th><th>Sistemas vinculados</th></tr></thead>
            <tbody>
              {ORGAOS.map(o => (
                <tr key={o.id}>
                  <td style={{ fontWeight: 600 }}>{o.nome}</td><td className="mono">{o.sigla}</td><td>{o.esfera}</td>
                  <td>{SISTEMAS.filter(s => s.orgaoId === o.id).length}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}

export function SistemasAdmin() {
  return (
    <>
      <h1 style={{ fontSize: '1.5rem' }}>Sistemas algorítmicos registrados</h1>
      <p className="muted mb-3"><FolderCog size={16} style={{ verticalAlign: -3 }} aria-hidden="true" /> Cadastro administrativo dos sistemas divulgados no portal público.</p>
      <div className="card">
        <div className="tabela-wrap">
          <table className="tabela">
            <thead><tr><th>Nome</th><th>Órgão</th><th>Esfera</th><th>Área</th><th>Situação cadastral</th></tr></thead>
            <tbody>
              {SISTEMAS.map(s => {
                const o = ORGAOS.find(x => x.id === s.orgaoId)
                return (
                  <tr key={s.id}>
                    <td style={{ maxWidth: 280, fontWeight: 600 }}>{s.nome}</td>
                    <td className="small">{o?.nome}</td><td>{o?.esfera}</td><td>{s.area}</td>
                    <td><span className={`selo ${SITUACAO_SISTEMA[s.situacao]}`}>{s.situacao}</span></td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}
