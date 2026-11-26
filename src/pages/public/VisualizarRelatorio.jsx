import { Link, useNavigate, useParams } from 'react-router-dom'
import { ArrowLeft, Printer } from 'lucide-react'
import { CabecalhoPublico, Rodape } from '../../components/publicShell'
import { GraficoBarras, AvisoInterpretacao, Aviso } from '../../components/ui'
import { RELATORIOS, RELATORIO_TEXTO, sistemaPorId, orgaoPorId } from '../../data/mockData'

// Relatório demo completo (REL-DEMO) para o sistema em auditoria + relatórios publicados reais do mock
export default function VisualizarRelatorio() {
  const { id } = useParams()
  const navigate = useNavigate()
  const publicados = RELATORIOS.find(r => r.id === id)
  const isDemo = id === 'REL-DEMO'
  if (!publicados && !isDemo) return navigate('/relatorios', { replace: true })

  const T = RELATORIO_TEXTO
  const titulo = isDemo ? T.identificacao.titulo : publicados.titulo
  const sistema = isDemo ? T.identificacao.sistema : sistemaPorId(publicados.sistemaId).nome
  const orgao = isDemo ? T.identificacao.orgao : orgaoPorId(publicados.orgaoId).nome
  const identificacao = isDemo ? T.identificacao : {
    titulo: publicados.titulo, sistema, orgao, auditoria: isDemo ? '—' : 'AUD-2026-0006',
    solicitacao: '—', origem: isDemo ? '—' : 'Institucional (audiência pública)',
    responsavel: publicados.auditor, validador: publicados.validador,
    periodo: 'Período de referência da auditoria', versao: publicados.versao
  }
  const indicadores = isDemo ? T.indicadores : [
    { grupo: 'Bairros atendidos por corredores (Grupo A)', total: 200, positivos: 158, taxa: 79, formula: 'Resultados positivos ÷ Total de casos do grupo × 100', denominador: '200 casos analisados do grupo A' },
    { grupo: 'Bairros atendidos apenas por linhas troncais (Grupo B)', total: 160, positivos: 98, taxa: 61.3, formula: 'Resultados positivos ÷ Total de casos do grupo × 100', denominador: '160 casos analisados do grupo B' }
  ]
  const versoes = isDemo ? T.versoes : [
    { versao: 'v1.0', data: '2026-09-05', descricao: 'Primeira versão elaborada pela auditoria responsável.', autor: publicados.auditor },
    { versao: 'v1.1', data: '2026-09-20', descricao: 'Ajustes após validação técnica.', autor: publicados.validador },
    { versao: 'v2.0', data: publicados.dataPublicacao, descricao: 'Versão vigente, autorizada para publicação.', autor: publicados.validador }
  ]
  const resumo = isDemo ? T.conclusoes : publicados.resumo

  return (
    <>
      <CabecalhoPublico />
      <div className="container" style={{ padding: '24px 24px 56px', maxWidth: 920 }}>
        <Link className="voltar-link" to="/relatorios"><ArrowLeft size={15} aria-hidden="true" /> Voltar aos relatórios</Link>
        <article className="card card-pad" style={{ padding: 40 }}>
          <header style={{ borderBottom: '3px solid var(--marinho)', paddingBottom: 20, marginBottom: 28 }}>
            <div className="flex between wrap">
              <span className="selo selo-aprovada">Documento público · {identificacao.versao}</span>
              <button className="btn btn-contorno btn-sm" onClick={() => window.print()}><Printer size={15} aria-hidden="true" /> Imprimir</button>
            </div>
            <h1 className="serif" style={{ fontSize: '1.7rem', marginTop: 10 }}>{titulo}</h1>
            <p className="muted">GovLens · Relatório de auditoria algorítmica</p>
          </header>

          <Secao n="1" titulo="Identificação da auditoria">
            <table className="tabela">
              <tbody>
                {[['Sistema auditado', sistema], ['Órgão vinculado', orgao], ['Auditoria', identificacao.auditoria], ['Origem da auditoria', identificacao.origem], ['Solicitação de origem', identificacao.solicitacao], ['Auditor responsável (elaboração)', identificacao.responsavel], ['Auditor validador (validação técnica)', identificacao.validador], ['Período analisado', identificacao.periodo], ['Versão vigente', identificacao.versao]].map(([k, v], i) => (
                  <tr key={i}><td style={{ width: '42%', color: 'var(--texto)', fontWeight: 600 }}>{k}</td><td>{v}</td></tr>
                ))}
              </tbody>
            </table>
          </Secao>

          <Secao n="2" titulo="Objetivos"><p className="muted">{isDemo ? T.objetivos : 'Avaliar a distribuição de cobertura do sistema de rotas entre grupos territoriais, documentando os critérios aplicados e as condições em que diferenças se manifestam.'}</p></Secao>

          <Secao n="3" titulo="Metodologia"><p className="muted">{isDemo ? T.metodologia : 'A auditoria analisou amostra de 360 pontos de verificação de cobertura, divididos em dois grupos territoriais, confrontando os resultados com a documentação oficial e com registros de audiência pública.'}</p></Secao>

          <Secao n="4" titulo="Dados utilizados">
            <ul style={{ paddingLeft: 20, color: 'var(--texto)' }}>{T.dadosUtilizados.map((d, i) => <li key={i} className="mb-1">{d}</li>)}</ul>
          </Secao>

          <Secao n="5" titulo="Indicadores calculados">
            <table className="tabela mb-2">
              <thead><tr><th>Grupo</th><th>Total de casos</th><th>Resultados positivos</th><th>Taxa</th><th>Denominador</th><th>Fórmula</th></tr></thead>
              <tbody>
                {indicadores.map((ind, i) => (
                  <tr key={i}>
                    <td style={{ fontWeight: 600 }}>{ind.grupo}</td>
                    <td>{ind.total}</td><td>{ind.positivos}</td>
                    <td><strong>{ind.taxa}%</strong></td>
                    <td className="small">{ind.denominador}</td>
                    <td className="small muted">{ind.formula}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div style={{ maxWidth: 520 }}>
              <GraficoBarras dados={indicadores.map(ind => ({ rotulo: ind.grupo, valor: ind.taxa, sufixo: '%' }))} max={100} />
            </div>
          </Secao>

          <Secao n="6" titulo="Comparações entre grupos">
            <div className="grid-2">
              <div className="stat"><span className="rotulo">Diferença entre taxas</span><span className="valor">{isDemo ? T.comparacoes.diferenca : 17.7}<span style={{ fontSize: '1rem' }}> p.p.</span></span></div>
              <div className="stat"><span className="rotulo">Razão entre taxas</span><span className="valor">{isDemo ? T.comparacoes.razao : '1,29'}</span><span className="nota">taxa grupo A ÷ taxa grupo B</span></div>
            </div>
            <p className="muted mt-2">{isDemo ? T.comparacoes.descricao : 'A taxa do grupo A equivale a aproximadamente 1,29 vez a taxa do grupo B.'}</p>
            <div className="mt-2"><AvisoInterpretacao /></div>
          </Secao>

          <Secao n="7" titulo="Limitações identificadas">
            <ul style={{ paddingLeft: 20, color: 'var(--texto)' }}>{T.limitacoes.map((l, i) => <li key={i} className="mb-1">{l}</li>)}</ul>
          </Secao>

          <Secao n="8" titulo="Evidências">
            <ul style={{ paddingLeft: 20, color: 'var(--texto)' }}>{T.evidencias.map((e, i) => <li key={i} className="mb-1">{e}</li>)}</ul>
          </Secao>

          <Secao n="9" titulo="Interpretação dos resultados">
            <p className="muted">{isDemo ? T.interpretacao : 'A diferença observada entre os grupos é relevante e merece atenção, mas não constitui comprovação automática de discriminação ou ilegalidade. Os resultados podem refletir fatores operacionais e históricos da rede de transporte. A leitura foi conduzida pelas pessoas responsáveis pela auditoria, com base nas evidências e no contexto institucional.'}</p>
          </Secao>

          <Secao n="10" titulo="Conclusões e recomendações">
            <p className="muted mb-2">{resumo}</p>
            <h3 style={{ fontSize: '1rem', margin: '14px 0 8px' }}>Recomendações</h3>
            <ul style={{ paddingLeft: 20, color: 'var(--texto)' }}>{T.recomendacoes.map((r, i) => <li key={i} className="mb-1">{r}</li>)}</ul>
          </Secao>

          <Secao n="11" titulo="Histórico de versões">
            <table className="tabela">
              <thead><tr><th>Versão</th><th>Data</th><th>Descrição</th><th>Autor</th></tr></thead>
              <tbody>{versoes.map((v, i) => <tr key={i}><td className="mono">{v.versao}</td><td>{new Date(v.data + 'T12:00').toLocaleDateString('pt-BR')}</td><td>{v.descricao}</td><td>{v.autor}</td></tr>)}</tbody>
            </table>
          </Secao>

          <div className="mt-3"><Aviso tipo="info">Este documento é parte de um protótipo acadêmico. Órgãos, sistemas e valores são ilustrativos. {T.aviso}</Aviso></div>
        </article>
      </div>
      <Rodape />
      <style>{`@media print { header, footer, .voltar-link { display: none !important; } }`}</style>
    </>
  )
}

function Secao({ n, titulo, children }) {
  return (
    <section style={{ marginBottom: 34 }}>
      <h2 style={{ fontSize: '1.2rem', marginBottom: 10 }}>
        <span style={{ color: 'var(--institucional)', fontFamily: 'var(--fonte-titulo)', marginRight: 8 }}>{n}.</span>{titulo}
      </h2>
      {children}
    </section>
  )
}
