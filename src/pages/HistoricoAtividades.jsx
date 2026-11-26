import { useMemo, useState } from 'react'
import { History } from 'lucide-react'
import { ATIVIDADES } from '../data/mockData'

export default function HistoricoAtividades() {
  const [busca, setBusca] = useState('')
  const [papel, setPapel] = useState('')
  const papeis = [...new Set(ATIVIDADES.map(a => a.papel))]
  const lista = useMemo(() => ATIVIDADES.filter(a => {
    const t = busca.toLowerCase()
    return (!t || a.usuario.toLowerCase().includes(t) || a.acao.toLowerCase().includes(t) || a.entidade.toLowerCase().includes(t) || a.descricao.toLowerCase().includes(t)) && (!papel || a.papel === papel)
  }), [busca, papel])

  return (
    <>
      <h1 style={{ fontSize: '1.5rem' }}>Histórico de atividades</h1>
      <p className="muted mb-3"><History size={16} style={{ verticalAlign: -3 }} aria-hidden="true" /> Registro cronológico das ações realizadas na plataforma, com responsável e horário.</p>

      <div className="card card-pad mb-3">
        <div className="grid-2" style={{ gap: 16 }}>
          <div className="campo" style={{ marginBottom: 0 }}>
            <label htmlFor="h-busca">Pesquisar por usuário, ação, entidade ou descrição</label>
            <input id="h-busca" className="input" type="search" value={busca} onChange={e => setBusca(e.target.value)} />
          </div>
          <div className="campo" style={{ marginBottom: 0 }}>
            <label htmlFor="h-papel">Perfil responsável</label>
            <select id="h-papel" className="select" value={papel} onChange={e => setPapel(e.target.value)}>
              <option value="">Todos os perfis</option>
              {papeis.map(p => <option key={p}>{p}</option>)}
            </select>
          </div>
        </div>
      </div>

      <div className="card">
        <div className="tabela-wrap">
          <table className="tabela">
            <thead><tr><th>Data e horário</th><th>Usuário responsável</th><th>Perfil</th><th>Ação realizada</th><th>Entidade</th><th>Descrição da atividade</th></tr></thead>
            <tbody>
              {lista.map(a => (
                <tr key={a.id}>
                  <td className="small" style={{ whiteSpace: 'nowrap' }}>{a.data}</td>
                  <td style={{ fontWeight: 600 }}>{a.usuario}</td>
                  <td><span className="perfil-badge">{a.papel}</span></td>
                  <td>{a.acao}</td>
                  <td className="mono small">{a.entidade}</td>
                  <td className="small muted" style={{ maxWidth: 360 }}>{a.descricao}</td>
                </tr>
              ))}
              {!lista.length && <tr><td colSpan="6" className="vazio">Nenhuma atividade corresponde aos filtros.</td></tr>}
            </tbody>
          </table>
        </div>
      </div>
      <p className="muted small mt-2" role="status">{lista.length} registro(s) exibido(s).</p>
    </>
  )
}
