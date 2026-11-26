import { Link, useNavigate } from 'react-router-dom'
import { ClipboardList, Hourglass, ShieldCheck, FileText, Activity, Plus, ChevronRight } from 'lucide-react'
import { SeloStatus, Aviso, Progresso } from '../../components/ui'
import { useApp } from '../../context/AppContext'
import { sistemaPorId, orgaoPorId } from '../../data/mockData'

export default function DashboardAuditor() {
  const { usuario, auditorias } = useApp()
  const atribuidas = auditorias.filter(a => a.responsavel === usuario.nome)
  const emAndamento = auditorias.filter(a => a.status === 'em_andamento')
  const agAnalis = auditorias.filter(a => a.status === 'em_andamento' && a.etapa <= 3)
  const agValid = auditorias.filter(a => a.status === 'aguardando_validacao')
  const atividades = [
    { d: '17/11 16:48', t: 'Indicadores calculados — AUD-2026-0014' },
    { d: '16/11 10:03', t: 'Conjunto de dados importado — AUD-2026-0014' },
    { d: '15/11 09:12', t: 'Auditoria instaurada a partir de SOL-2026-0031' },
    { d: '10/11 14:40', t: 'Participantes definidos — AUD-2026-0011' }
  ]

  const stats = [
    { r: 'Auditorias atribuídas a você', v: atribuidas.length, i: ClipboardList },
    { r: 'Em andamento', v: emAndamento.length, i: Hourglass },
    { r: 'Aguardando análise inicial', v: agAnalis.length, i: Activity },
    { r: 'Relatórios aguardando validação', v: agValid.length, i: FileText }
  ]

  return (
    <>
      <div className="flex between wrap mb-3">
        <div>
          <h1 style={{ fontSize: '1.6rem' }}>Painel de auditorias</h1>
          <p className="muted">Bem-vinda, {usuario.nome}. Acompanhe seus trabalhos e as auditorias da plataforma.</p>
        </div>
        <button className="btn btn-primario" onClick={() => alert('Fluxo demonstrativo: a instauração de auditoria institucional exige autorização do seu perfil. Neste protótipo, o botão confirma a ação e cria uma auditoria de exemplo.')}><Plus size={17} aria-hidden="true" /> Iniciar auditoria institucional</button>
      </div>

      <div className="stats-grid mb-3">
        {stats.map(s => <div className="stat" key={s.r}><span className="rotulo"><s.i size={14} aria-hidden="true" /> {s.r}</span><span className="valor">{s.v}</span></div>)}
      </div>

      <div className="card">
        <div className="card-pad" style={{ paddingBottom: 8 }}><h2 style={{ fontSize: '1.2rem' }}>Auditorias</h2></div>
        <div className="tabela-wrap">
          <table className="tabela">
            <thead><tr><th>Identificador</th><th>Sistema auditado</th><th>Órgão</th><th>Origem</th><th>Responsável</th><th>Status</th><th aria-label="Ações"></th></tr></thead>
            <tbody>
              {auditorias.map(a => (
                <tr key={a.id}>
                  <td className="mono">{a.id}</td>
                  <td style={{ maxWidth: 260 }}>{sistemaPorId(a.sistemaId)?.nome}</td>
                  <td className="small">{orgaoPorId(sistemaPorId(a.sistemaId)?.orgaoId)?.sigla}</td>
                  <td className="small">{a.origem}</td>
                  <td className="small">{a.responsavel}</td>
                  <td><SeloStatus status={a.status} /></td>
                  <td style={{ textAlign: 'right' }}>
                    <Link className="btn btn-contorno btn-sm" to={`/auditor/auditorias/${a.id}`}>Acessar <ChevronRight size={14} aria-hidden="true" /></Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="grid-2 mt-3">
        <div className="card card-pad">
          <h2 style={{ fontSize: '1.1rem', marginBottom: 10 }}>Atividades recentes</h2>
          <ul style={{ listStyle: 'none' }}>
            {atividades.map((at, i) => (
              <li key={i} className="flex mb-2" style={{ gap: 10 }}><span className="small muted" style={{ minWidth: 76 }}>{at.d}</span><span className="small">{at.t}</span></li>
            ))}
          </ul>
        </div>
        <div className="card card-pad">
          <h2 style={{ fontSize: '1.1rem', marginBottom: 10 }}>Progresso das auditorias atribuídas</h2>
          {atribuidas.map(a => (
            <div key={a.id} className="mb-3">
              <div className="flex between small mb-1"><span className="mono">{a.id}</span><SeloStatus status={a.status} /></div>
              <Progresso atual={a.etapa} total={9} />
            </div>
          ))}
          {!atribuidas.length && <p className="muted small">Nenhuma auditoria atribuída a este perfil na demonstração.</p>}
        </div>
      </div>

      <div className="mt-3"><Aviso tipo="info">Todo relatório desta plataforma segue as três etapas obrigatórias: elaboração pelo auditor responsável, validação técnica por outro auditor e autorização administrativa. O autor não pode validar o próprio relatório.</Aviso></div>
    </>
  )
}
