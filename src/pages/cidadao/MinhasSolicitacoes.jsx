import { Link } from 'react-router-dom'
import { SeloStatus } from '../../components/ui'
import { useApp } from '../../context/AppContext'
import { sistemaPorId } from '../../data/mockData'
import { ChevronRight } from 'lucide-react'

export default function MinhasSolicitacoes() {
  const { solicitacoes } = useApp()
  return (
    <>
      <h1 style={{ fontSize: '1.5rem' }}>Minhas solicitações</h1>
      <p className="muted mb-3">Histórico completo das solicitações de auditoria registradas por você.</p>
      <div className="card">
        <div className="tabela-wrap">
          <table className="tabela">
            <thead><tr><th>Protocolo</th><th>Sistema</th><th>Data</th><th>Status</th><th aria-label="Ações"></th></tr></thead>
            <tbody>
              {solicitacoes.map(s => (
                <tr key={s.id}>
                  <td className="mono">{s.id}</td>
                  <td style={{ maxWidth: 300 }}>{sistemaPorId(s.sistemaId)?.nome}</td>
                  <td>{new Date(s.data + 'T12:00').toLocaleDateString('pt-BR')}</td>
                  <td><SeloStatus status={s.status} /></td>
                  <td style={{ textAlign: 'right' }}><Link className="btn btn-contorno btn-sm" to={`/cidadao/solicitacoes/${s.id}`}>Detalhes <ChevronRight size={14} aria-hidden="true" /></Link></td>
                </tr>
              ))}
              {!solicitacoes.length && <tr><td colSpan="5" className="vazio">Nenhuma solicitação registrada ainda.</td></tr>}
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}
