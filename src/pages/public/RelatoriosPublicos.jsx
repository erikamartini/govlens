import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { Search, ArrowRight, FileSearch } from 'lucide-react'
import { CabecalhoPublico, Rodape } from '../../components/publicShell'
import { RELATORIOS, orgaoPorId, sistemaPorId } from '../../data/mockData'

export default function RelatoriosPublicos() {
  const [busca, setBusca] = useState('')
  const [area, setArea] = useState('')
  const [periodo, setPeriodo] = useState('')

  const areas = [...new Set(RELATORIOS.map(r => r.area))]
  const lista = useMemo(() => RELATORIOS.filter(r => {
    const o = orgaoPorId(r.orgaoId).nome.toLowerCase()
    const s = sistemaPorId(r.sistemaId).nome.toLowerCase()
    const t = busca.toLowerCase()
    const okBusca = !t || o.includes(t) || s.includes(t) || r.titulo.toLowerCase().includes(t)
    const okArea = !area || r.area === area
    const okPer = !periodo ||
      (periodo === '90d' ? new Date(r.dataPublicacao) >= new Date('2026-08-28') :
        periodo === '1a' ? new Date(r.dataPublicacao) >= new Date('2025-11-26') : true)
    return okBusca && okArea && okPer
  }), [busca, area, periodo])

  return (
    <>
      <CabecalhoPublico />
      <div className="cabecalho-pagina">
        <div className="container">
          <h1>Relatórios de auditoria</h1>
          <p>Relatórios publicados após validação técnica independente e autorização administrativa.</p>
        </div>
      </div>
      <div className="container" style={{ paddingBottom: 56 }}>
        <div className="card card-pad mb-3">
          <div className="grid-2" style={{ gap: 16 }}>
            <div className="campo" style={{ marginBottom: 0 }}>
              <label htmlFor="r-busca"><Search size={14} style={{ verticalAlign: -2 }} aria-hidden="true" /> Pesquisar por sistema ou órgão</label>
              <input id="r-busca" className="input" type="search" placeholder="Ex.: vagas escolares" value={busca} onChange={e => setBusca(e.target.value)} />
            </div>
            <div className="campo" style={{ marginBottom: 0 }}>
              <label htmlFor="r-area">Área de aplicação</label>
              <select id="r-area" className="select" value={area} onChange={e => setArea(e.target.value)}>
                <option value="">Todas as áreas</option>
                {areas.map(a => <option key={a} value={a}>{a}</option>)}
              </select>
            </div>
            <div className="campo" style={{ marginBottom: 0 }}>
              <label htmlFor="r-per">Período de publicação</label>
              <select id="r-per" className="select" value={periodo} onChange={e => setPeriodo(e.target.value)}>
                <option value="">Qualquer período</option>
                <option value="90d">Últimos 90 dias</option>
                <option value="1a">Último ano</option>
              </select>
            </div>
          </div>
        </div>

        <p className="muted mb-2" role="status">{lista.length} relatório(s) publicado(s).</p>

        {lista.length === 0 ? (
          <div className="vazio card card-pad"><FileSearch size={36} aria-hidden="true" /><p>Nenhum relatório corresponde aos filtros. Relatórios só aparecem aqui após as três etapas de validação e autorização.</p></div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {lista.map(r => (
              <article className="card card-pad" key={r.id}>
                <div className="flex between wrap mb-1">
                  <span className="selo" style={{ background: 'var(--azul-claro)', color: 'var(--institucional)' }}>{r.area}</span>
                  <span className="selo selo-aprovada">{r.versao}</span>
                </div>
                <h2 style={{ fontSize: '1.2rem' }}>{r.titulo}</h2>
                <p className="muted small mt-1">
                  <strong>Sistema auditado:</strong> {sistemaPorId(r.sistemaId).nome} · <strong>Órgão:</strong> {orgaoPorId(r.orgaoId).nome} · <strong>Publicado em:</strong> {new Date(r.dataPublicacao + 'T12:00').toLocaleDateString('pt-BR')}
                </p>
                <p className="muted mt-1">{r.resumo}</p>
                <Link to={`/relatorios/${r.id}`} className="btn btn-contorno btn-sm mt-2">Visualizar relatório <ArrowRight size={14} aria-hidden="true" /></Link>
              </article>
            ))}
          </div>
        )}
      </div>
      <Rodape />
    </>
  )
}
