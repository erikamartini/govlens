import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { Search, Building2, Globe2, Layers, ArrowRight, SearchX } from 'lucide-react'
import { CabecalhoPublico, Rodape } from '../../components/publicShell'
import { SITUACAO_SISTEMA } from '../../components/ui'
import { SISTEMAS, orgaoPorId } from '../../data/mockData'

export default function CatalogoSistemas() {
  const [busca, setBusca] = useState('')
  const [orgao, setOrgao] = useState('')
  const [esfera, setEsfera] = useState('')
  const [area, setArea] = useState('')

  const orgaos = useMemo(() => {
    const ids = [...new Set(SISTEMAS.map(s => s.orgaoId))]
    return ids.map(orgaoPorId)
  }, [])
  const areas = useMemo(() => [...new Set(SISTEMAS.map(s => s.area))], [])
  const esferas = useMemo(() => [...new Set(SISTEMAS.map(s => orgaoPorId(s.orgaoId).esfera))], [])

  const lista = useMemo(() => SISTEMAS.filter(s => {
    const o = orgaoPorId(s.orgaoId)
    const t = busca.toLowerCase()
    return (!t || s.nome.toLowerCase().includes(t) || s.finalidade.toLowerCase().includes(t) || o.nome.toLowerCase().includes(t)) &&
      (!orgao || s.orgaoId === orgao) && (!esfera || o.esfera === esfera) && (!area || s.area === area)
  }), [busca, orgao, esfera, area])

  return (
    <>
      <CabecalhoPublico />
      <div className="cabecalho-pagina">
        <div className="container">
          <h1>Sistemas algorítmicos</h1>
          <p>Catálogo público de sistemas utilizados pela administração pública. Consulte finalidade, critérios e dados antes de solicitar auditoria.</p>
        </div>
      </div>
      <div className="container" style={{ paddingBottom: 56 }}>
        <div className="card card-pad mb-3">
          <div className="grid-2" style={{ gap: 16 }}>
            <div className="campo" style={{ marginBottom: 0 }}>
              <label htmlFor="busca"><Search size={14} style={{ verticalAlign: -2 }} aria-hidden="true" /> Pesquisar por nome, órgão ou finalidade</label>
              <input id="busca" className="input" type="search" placeholder="Ex.: priorização de atendimento" value={busca} onChange={e => setBusca(e.target.value)} />
            </div>
            <div className="campo" style={{ marginBottom: 0 }}>
              <label htmlFor="f-orgao"><Building2 size={14} style={{ verticalAlign: -2 }} aria-hidden="true" /> Órgão público</label>
              <select id="f-orgao" className="select" value={orgao} onChange={e => setOrgao(e.target.value)}>
                <option value="">Todos os órgãos</option>
                {orgaos.map(o => <option key={o.id} value={o.id}>{o.nome}</option>)}
              </select>
            </div>
            <div className="campo" style={{ marginBottom: 0 }}>
              <label htmlFor="f-esfera"><Globe2 size={14} style={{ verticalAlign: -2 }} aria-hidden="true" /> Esfera governamental</label>
              <select id="f-esfera" className="select" value={esfera} onChange={e => setEsfera(e.target.value)}>
                <option value="">Todas as esferas</option>
                {esferas.map(e => <option key={e} value={e}>{e}</option>)}
              </select>
            </div>
            <div className="campo" style={{ marginBottom: 0 }}>
              <label htmlFor="f-area"><Layers size={14} style={{ verticalAlign: -2 }} aria-hidden="true" /> Área de aplicação</label>
              <select id="f-area" className="select" value={area} onChange={e => setArea(e.target.value)}>
                <option value="">Todas as áreas</option>
                {areas.map(a => <option key={a} value={a}>{a}</option>)}
              </select>
            </div>
          </div>
        </div>

        <p className="muted mb-2" role="status">{lista.length} sistema(s) encontrado(s).</p>

        {lista.length === 0 ? (
          <div className="vazio card card-pad"><SearchX size={36} aria-hidden="true" /><p>Nenhum sistema corresponde aos filtros escolhidos. Ajuste a pesquisa ou limpe os filtros.</p></div>
        ) : (
          <div className="grid-2">
            {lista.map(s => {
              const o = orgaoPorId(s.orgaoId)
              return (
                <article className="card card-pad" key={s.id}>
                  <div className="flex between wrap mb-1">
                    <span className="selo" style={{ background: 'var(--azul-claro)', color: 'var(--institucional)' }}>{s.area}</span>
                    <span className={`selo ${SITUACAO_SISTEMA[s.situacao]}`}>{s.situacao}</span>
                  </div>
                  <h2 style={{ fontSize: '1.15rem' }}><Link to={`/sistemas/${s.id}`} style={{ color: 'var(--marinho)', textDecoration: 'none' }}>{s.nome}</Link></h2>
                  <p className="muted small mt-1"><strong>Órgão:</strong> {o.nome} · <strong>Esfera:</strong> {o.esfera}</p>
                  <p className="muted mt-1 small">{s.finalidade}</p>
                  <Link to={`/sistemas/${s.id}`} className="btn btn-contorno btn-sm mt-2">Ver detalhamento <ArrowRight size={14} aria-hidden="true" /></Link>
                </article>
              )
            })}
          </div>
        )}
      </div>
      <Rodape />
    </>
  )
}
