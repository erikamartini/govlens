import { Link } from 'react-router-dom'
import { SeloStatus, Progresso } from '../../components/ui'
import { useApp } from '../../context/AppContext'
import { sistemaPorId, orgaoPorId } from '../../data/mockData'
import { ChevronRight } from 'lucide-react'

export default function ListaAuditorias() {
  const { auditorias } = useApp()
  return (
    <>
      <h1 style={{ fontSize: '1.5rem' }}>Auditorias</h1>
      <p className="muted mb-3">Processos de auditoria institucional e cidadã acompanhados pela equipe técnica.</p>
      <div className="card">
        <div className="tabela-wrap">
          <table className="tabela">
            <thead><tr><th>Identificador</th><th>Sistema</th><th>Órgão</th><th>Origem</th><th>Responsável</th><th>Progresso</th><th>Status</th><th aria-label="Ações"></th></tr></thead>
            <tbody>
              {auditorias.map(a => (
                <tr key={a.id}>
                  <td className="mono">{a.id}</td>
                  <td style={{ maxWidth: 240 }}>{sistemaPorId(a.sistemaId)?.nome}</td>
                  <td className="small">{orgaoPorId(sistemaPorId(a.sistemaId)?.orgaoId)?.sigla}</td>
                  <td className="small">{a.origem}</td>
                  <td className="small">{a.responsavel}</td>
                  <td style={{ minWidth: 130 }}><Progresso atual={a.etapa} total={9} /></td>
                  <td><SeloStatus status={a.status} /></td>
                  <td style={{ textAlign: 'right' }}><Link className="btn btn-contorno btn-sm" to={`/auditor/auditorias/${a.id}`}>Abrir <ChevronRight size={14} aria-hidden="true" /></Link></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}
