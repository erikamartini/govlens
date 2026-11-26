import { Link } from 'react-router-dom'
import { ClipboardList, CheckCircle2, XCircle, Hourglass, FileSearch, ChevronRight, FilePlus2 } from 'lucide-react'
import { SeloStatus, Aviso } from '../../components/ui'
import { useApp } from '../../context/AppContext'
import { sistemaPorId } from '../../data/mockData'

export default function DashboardCidadao() {
  const { usuario, solicitacoes, auditorias } = useApp()
  const minhas = solicitacoes
  const cont = s => minhas.filter(x => x.status === s).length
  const andamento = auditorias.filter(a => a.status === 'em_andamento').length

  return (
    <>
      <div className="flex between wrap mb-3">
        <div>
          <h1 style={{ fontSize: '1.6rem' }}>Olá, {usuario.nome.split(' ')[0]}.</h1>
          <p className="muted">Acompanhe aqui suas solicitações de auditoria e os processos em andamento.</p>
        </div>
        <Link to="/cidadao/solicitar" className="btn btn-primario"><FilePlus2 size={17} aria-hidden="true" /> Solicitar auditoria</Link>
      </div>

      <div className="stats-grid mb-3">
        <div className="stat"><span className="rotulo"><Hourglass size={14} aria-hidden="true" /> Pendentes</span><span className="valor">{cont('pendente')}</span></div>
        <div className="stat"><span className="rotulo"><CheckCircle2 size={14} aria-hidden="true" /> Aprovadas</span><span className="valor">{cont('aprovada')}</span></div>
        <div className="stat"><span className="rotulo"><XCircle size={14} aria-hidden="true" /> Rejeitadas</span><span className="valor">{cont('rejeitada')}</span></div>
        <div className="stat"><span className="rotulo"><FileSearch size={14} aria-hidden="true" /> Auditorias em andamento</span><span className="valor">{andamento}</span><span className="nota">Resultantes de solicitações e ações institucionais</span></div>
      </div>

      {cont('pendente') > 0 && <div className="mb-3"><Aviso tipo="alerta">Você possui {cont('pendente')} solicitação(ões) em análise pela equipe administrativa. Você será notificada(o) quando houver decisão.</Aviso></div>}

      <div className="card">
        <div className="card-pad flex between wrap" style={{ paddingBottom: 8 }}>
          <h2 style={{ fontSize: '1.2rem' }}>Solicitações recentes</h2>
          <span className="small muted">{minhas.length} no total</span>
        </div>
        <div className="tabela-wrap">
          <table className="tabela">
            <thead><tr><th>Protocolo</th><th>Sistema relacionado</th><th>Data da solicitação</th><th>Status</th><th aria-label="Ações"></th></tr></thead>
            <tbody>
              {minhas.map(s => (
                <tr key={s.id}>
                  <td className="mono">{s.id}</td>
                  <td style={{ maxWidth: 280 }}>{sistemaPorId(s.sistemaId)?.nome}</td>
                  <td>{new Date(s.data + 'T12:00').toLocaleDateString('pt-BR')}</td>
                  <td><SeloStatus status={s.status} /></td>
                  <td style={{ textAlign: 'right' }}>
                    <Link className="btn btn-contorno btn-sm" to={`/cidadao/solicitacoes/${s.id}`}>Visualizar <ChevronRight size={14} aria-hidden="true" /></Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="card card-pad mt-3 flex between wrap">
        <div style={{ maxWidth: 560 }}>
          <h2 style={{ fontSize: '1.05rem', display: 'flex', gap: 8, alignItems: 'center' }}><ClipboardList size={17} aria-hidden="true" /> Como funciona uma solicitação</h2>
          <p className="muted small mt-1">1. Você registra a solicitação com justificativa. 2. A equipe administrativa analisa e decide. 3. Se aprovada, uma auditoria é instaurada e o relatório é publicado após as três etapas de validação e autorização.</p>
        </div>
        <Link to="/cidadao/solicitacoes" className="btn btn-contorno">Ver todas as solicitações</Link>
      </div>
    </>
  )
}
