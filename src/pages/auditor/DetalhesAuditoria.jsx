import { useParams, Link, useNavigate } from 'react-router-dom'
import { ArrowLeft, Users, Database, FileBarChart2, Plus } from 'lucide-react'
import { SeloStatus, Progresso, BlocoGrupos, AvisoInterpretacao, Aviso, Toasts } from '../../components/ui'
import { useApp } from '../../context/AppContext'
import { sistemaPorId, orgaoPorId } from '../../data/mockData'
import { useState } from 'react'

const ABAS = ['Visão geral', 'Metodologia', 'Participantes', 'Grupos analisados', 'Conjuntos de dados', 'Indicadores', 'Interpretações', 'Evidências', 'Relatório']

const METODO = 'Análise documental do sistema, construção de amostra anonimizada, cálculo de indicadores comparados entre grupos e registro de interpretações com base nas evidências. A auditoria não reprocessa o modelo: avalia os resultados do processo instituído.'
const DATASETS = [
  { nome: 'Amostra de encaminhamentos — 4º trimestre', linhas: 200, colunas: 9, status: 'validado', anonimizado: 'Sim — pseudonimização de identificadores' },
  { nome: 'Base de agendamentos efetivados', linhas: 1120, colunas: 6, status: 'validado', anonimizado: 'Sim — supressão de campos diretos' },
  { nome: 'Documentação de pontuação divulgada', linhas: 1, colunas: 3, status: 'referência', anonimizado: 'Não aplicável (documento público)' }
]
const EVIDENCIAS = [
  { t: 'Planilha de amostra anonimizada (200 registros)', a: 'Dra. Helena Vasconcelos', d: '16/11/2026' },
  { t: 'Ata simplificada de entrevista com a comissão de regulação', a: 'Dra. Helena Vasconcelos', d: '17/11/2026' },
  { t: 'Painel de indicadores exportado da plataforma', a: 'Dra. Helena Vasconcelos', d: '17/11/2026' }
]

export default function DetalhesAuditoria() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { auditorias, toast } = useApp()
  const a = auditorias.find(x => x.id === id)
  const [aba, setAba] = useState(0)
  const [observacoes, setObservacoes] = useState([
    { texto: 'A diferença entre grupos coincide com o período de menor oferta de agendas na região periférica; hipótese a investigar com o órgão.', autor: 'Dra. Helena Vasconcelos', data: '17/11/2026', indicador: 'Taxa de resultados positivos' }
  ])
  const [nova, setNova] = useState('')
  if (!a) return navigate('/auditor/auditorias', { replace: true })
  const s = sistemaPorId(a.sistemaId)
  const o = orgaoPorId(s.orgaoId)
  const taxas = a.grupos.map(g => Math.round((g.positivos / g.total) * 1000) / 10)

  const addObs = () => {
    if (nova.trim().length < 10) { toast('Descreva a observação com pelo menos 10 caracteres.', 'erro'); return }
    setObservacoes(o2 => [{ texto: nova, autor: 'Dra. Helena Vasconcelos', data: new Date().toLocaleDateString('pt-BR'), indicador: 'Taxa de resultados positivos' }, ...o2])
    setNova('')
    toast('Interpretação registrada e associada ao indicador.')
  }

  return (
    <>
      <Link to="/auditor/auditorias" className="voltar-link"><ArrowLeft size={15} aria-hidden="true" /> Voltar às auditorias</Link>
      <div className="flex between wrap mb-2">
        <div>
          <h1 style={{ fontSize: '1.55rem' }}>Auditoria <span className="mono" style={{ color: 'var(--institucional)' }}>{a.id}</span></h1>
          <p className="muted">{s.nome} · {o.nome} · Iniciada em {new Date(a.dataInicio + 'T12:00').toLocaleDateString('pt-BR')}</p>
        </div>
        <SeloStatus status={a.status} />
      </div>
      <div className="card card-pad mb-3"><Progresso atual={a.etapa} total={9} /></div>

      <div className="tabs" role="tablist" aria-label="Etapas da auditoria">
        {ABAS.map((t, i) => (
          <button key={t} role="tab" aria-selected={aba === i} className={`tab ${aba === i ? 'ativa' : ''}`} onClick={() => setAba(i)}>{t}</button>
        ))}
      </div>

      <div className="card card-pad">
        {aba === 0 && (
          <>
            <h2 style={{ fontSize: '1.15rem', marginBottom: 8 }}>Visão geral</h2>
            <table className="tabela">
              <tbody>
                <tr><td style={{ width: '38%', color: 'var(--texto)', fontWeight: 600 }}>Sistema auditado</td><td><Link to={`/sistemas/${s.id}`}>{s.nome}</Link></td></tr>
                <tr><td style={{ color: 'var(--texto)', fontWeight: 600 }}>Órgão</td><td>{o.nome}</td></tr>
                <tr><td style={{ color: 'var(--texto)', fontWeight: 600 }}>Origem</td><td>{a.origem}</td></tr>
                <tr><td style={{ color: 'var(--texto)', fontWeight: 600 }}>Responsável</td><td>{a.responsavel}</td></tr>
                <tr><td style={{ color: 'var(--texto)', fontWeight: 600 }}>Validador designado</td><td>{a.validador === '—' ? 'A designar (não pode ser a própria autora)' : a.validador}</td></tr>
                <tr><td style={{ color: 'var(--texto)', fontWeight: 600 }}>Participantes</td><td>{a.participanteCount} pessoas</td></tr>
              </tbody>
            </table>
          </>
        )}
        {aba === 1 && (<><h2 style={{ fontSize: '1.15rem', marginBottom: 8 }}>Metodologia</h2><p className="muted">{METODO}</p><div className="mt-3"><Aviso tipo="info">Os conjuntos de dados são anonimizados antes de qualquer análise. A auditoria não acessa dados identificáveis de pessoas.</Aviso></div></>)}
        {aba === 2 && (
          <>
            <h2 style={{ fontSize: '1.15rem', marginBottom: 10 }}><Users size={17} style={{ verticalAlign: -3 }} aria-hidden="true" /> Participantes</h2>
            <table className="tabela">
              <thead><tr><th>Nome</th><th>Papel</th><th>Atuação</th></tr></thead>
              <tbody>
                <tr><td>{a.responsavel}</td><td>Auditora responsável</td><td>Condução da auditoria e elaboração do relatório</td></tr>
                <tr><td>Aud. Marcos Tavares</td><td>Validador técnico</td><td>Revisão independente do relatório</td></tr>
                <tr><td>Equipe administrativa</td><td>Gestão</td><td>Instauração e autorização de publicação</td></tr>
                <tr><td>{a.participanteCount - 3} técnicas(os) de apoio</td><td>Apoio técnico</td><td>Preparação de dados e verificação</td></tr>
              </tbody>
            </table>
          </>
        )}
        {aba === 3 && (
          <>
            <h2 style={{ fontSize: '1.15rem', marginBottom: 4 }}>Grupos analisados</h2>
            <p className="muted small mb-2">Composição dos grupos definida pela auditoria a partir do critério territorial.</p>
            <BlocoGrupos grupos={a.grupos.map((g, i) => ({ ...g }))} />
            <div className="mt-3"><AvisoInterpretacao compacto /></div>
          </>
        )}
        {aba === 4 && (
          <>
            <h2 style={{ fontSize: '1.15rem', marginBottom: 10 }}><Database size={17} style={{ verticalAlign: -3 }} aria-hidden="true" /> Conjuntos de dados</h2>
            <table className="tabela">
              <thead><tr><th>Conjunto</th><th>Linhas</th><th>Colunas</th><th>Anonimização</th><th>Situação</th></tr></thead>
              <tbody>
                {DATASETS.map((d, i) => <tr key={i}><td>{d.nome}</td><td>{d.linhas}</td><td>{d.colunas}</td><td className="small">{d.anonimizado}</td><td><span className={`selo ${d.status === 'validado' ? 'selo-aprovada' : 'selo-neutro'}`}>{d.status}</span></td></tr>)}
              </tbody>
            </table>
            <Link to="/auditor/importar" className="btn btn-contorno btn-sm mt-2"><Plus size={14} aria-hidden="true" /> Importar novo conjunto</Link>
          </>
        )}
        {aba === 5 && (
          <>
            <h2 style={{ fontSize: '1.15rem', marginBottom: 4 }}>Indicadores</h2>
            <p className="muted small mb-2">Taxa de resultados positivos por grupo, com valores, denominadores e fórmula.</p>
            <table className="tabela mb-2">
              <thead><tr><th>Grupo</th><th>Total de casos</th><th>Resultados positivos</th><th>Taxa</th><th>Fórmula</th></tr></thead>
              <tbody>
                {a.grupos.map((g, i) => (
                  <tr key={i}><td style={{ fontWeight: 600 }}>{g.nome}<br /><span className="small muted">{g.criterio}</span></td><td>{g.total}</td><td>{g.positivos}</td><td><strong>{taxas[i]}%</strong></td><td className="small muted">positivos ÷ total × 100</td></tr>
                ))}
              </tbody>
            </table>
            <div className="stat mb-2" style={{ maxWidth: 420 }}>
              <span className="rotulo">Diferença entre taxas</span>
              <span className="valor">{Math.round((taxas[0] - taxas[1]) * 10) / 10} p.p.</span>
              <span className="nota">Sinalizada para exame dos auditores; não comprova, isoladamente, discriminação ou irregularidade.</span>
            </div>
            <Link to="/auditor/indicadores" className="btn btn-primario btn-sm"><FileBarChart2 size={15} aria-hidden="true" /> Abrir análise completa de indicadores</Link>
          </>
        )}
        {aba === 6 && (
          <>
            <h2 style={{ fontSize: '1.15rem', marginBottom: 8 }}>Interpretações e evidências</h2>
            <div className="campo">
              <label htmlFor="nova-obs">Registrar nova interpretação (associada ao indicador "Taxa de resultados positivos")</label>
              <textarea id="nova-obs" className="textarea" style={{ minHeight: 80 }} value={nova} onChange={e => setNova(e.target.value)} placeholder="Descreva sua leitura dos resultados, com base nas evidências disponíveis." />
            </div>
            <button className="btn btn-primario btn-sm mb-3" onClick={addObs}>Registrar interpretação</button>
            {observacoes.map((ob, i) => (
              <div key={i} className="card card-pad mb-2" style={{ boxShadow: 'none' }}>
                <p>{ob.texto}</p>
                <p className="small muted mt-1">Autor(a): {ob.autor} · {ob.data} · Associada a: <strong>{ob.indicador}</strong></p>
              </div>
            ))}
          </>
        )}
        {aba === 7 && (
          <>
            <h2 style={{ fontSize: '1.15rem', marginBottom: 10 }}>Evidências</h2>
            <table className="tabela">
              <thead><tr><th>Evidência</th><th>Registrada por</th><th>Data</th></tr></thead>
              <tbody>{EVIDENCIAS.map((e, i) => <tr key={i}><td>{e.t}</td><td>{e.a}</td><td>{e.d}</td></tr>)}</tbody>
            </table>
            <p className="small muted mt-2">As evidências ficam vinculadas à auditoria e fundamentam o relatório final.</p>
          </>
        )}
        {aba === 8 && (
          <>
            <h2 style={{ fontSize: '1.15rem', marginBottom: 8 }}>Relatório</h2>
            <p className="muted mb-2">Elabore ou revise o relatório desta auditoria. Após concluído, envie-o para validação técnica de outro auditor.</p>
            {a.status === 'aguardando_validacao' ? (
              <Aviso tipo="alerta">Este relatório já foi enviado para validação técnica por {a.validador}. A validação não pode ser realizada pela própria autora do relatório.</Aviso>
            ) : (
              <div className="flex wrap">
                <Link to="/auditor/relatorio" className="btn btn-primario">Elaborar relatório</Link>
                <button className="btn btn-contorno" onClick={() => toast('Pré-visualização do relatório disponível na tela de elaboração.')}>Pré-visualizar</button>
              </div>
            )}
          </>
        )}
      </div>
      <Toasts />
    </>
  )
}
