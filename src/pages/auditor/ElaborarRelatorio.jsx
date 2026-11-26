import { useState } from 'react'
import { Send, Eye } from 'lucide-react'
import { Aviso, Toasts } from '../../components/ui'
import { useApp } from '../../context/AppContext'

const CAMPOS = [
  ['objetivos', 'Objetivos'],
  ['metodologia', 'Metodologia'],
  ['dados', 'Dados utilizados'],
  ['resultados', 'Resultados'],
  ['indicadores', 'Indicadores'],
  ['limitacoes', 'Limitações'],
  ['evidencias', 'Evidências'],
  ['conclusoes', 'Conclusões'],
  ['recomendacoes', 'Recomendações']
]
const PRE = {
  objetivos: 'Verificar se o processo de priorização produz resultados distintos entre territórios centrais e periféricos, documentando as condições em que eventuais diferenças se manifestam.',
  metodologia: 'Análise de amostra anonimizada de 200 solicitações, cálculo de indicadores comparados entre dois grupos territoriais e confronto com a documentação oficial e entrevistas.',
  dados: 'Amostra de 200 solicitações anonimizadas; classificações de risco; relação de agendamentos efetivados; documentação técnica divulgada.',
  resultados: 'As taxas de encaminhamento em até 30 dias foram de 80% no grupo A e 40% no grupo B, com diferença de 40 pontos percentuais.',
  indicadores: 'Taxa de resultados positivos por grupo (fórmula: positivos ÷ total × 100); diferença entre taxas (40 p.p.); razão entre taxas (2,0).',
  limitacoes: 'Amostra não censitária; campos clínicos incompletos em parte dos registros; variáveis de contexto territorial não integradas; o código do sistema não foi avaliado.',
  evidencias: 'Planilha anonimizada; ata de entrevista com a comissão de regulação; documento de pontuação; painel de indicadores da plataforma.',
  conclusoes: 'O processo produziu resultados quantitativamente distintos entre os grupos no período analisado. As causas não foram determinadas nesta auditoria.',
  recomendacoes: 'Publicar detalhes da pontuação; acompanhar por 6 meses os territórios com menor taxa; padronizar registros clínicos; submeter os resultados à comissão.'
}

export default function ElaborarRelatorio() {
  const [texto, setTexto] = useState(PRE)
  const [preView, setPreView] = useState(false)
  const [enviado, setEnviado] = useState(false)
  const { toast } = useApp()
  const set = (k) => (e) => setTexto(t => ({ ...t, [k]: e.target.value }))
  const faltando = CAMPOS.filter(([k]) => !texto[k] || texto[k].trim().length < 10)

  const enviar = () => {
    if (faltando.length) { toast('Preencha todos os campos do relatório antes de enviar à validação.', 'erro'); return }
    setEnviado(true)
    toast('Relatório enviado à validação técnica. O validador designado não pode ser o próprio autor.')
  }

  return (
    <>
      <div className="flex between wrap mb-2">
        <div>
          <h1 style={{ fontSize: '1.5rem' }}>Elaboração de relatório</h1>
          <p className="muted">Auditoria <strong>AUD-2026-0014</strong> · Sistema de Priorização de Atendimento em Saúde</p>
        </div>
        <div className="flex wrap">
          <button className="btn btn-contorno" onClick={() => setPreView(p => !p)}><Eye size={16} aria-hidden="true" /> {preView ? 'Editar campos' : 'Pré-visualizar relatório'}</button>
          <button className="btn btn-primario" onClick={enviar} disabled={enviado}><Send size={16} aria-hidden="true" /> {enviado ? 'Enviado à validação' : 'Enviar à validação técnica'}</button>
        </div>
      </div>

      {enviado && <div className="mb-3"><Aviso tipo="sucesso">Relatório encaminhado. Próxima etapa: <strong>validação técnica por outro auditor</strong> (a própria autora não pode validar). Depois, autorização administrativa para publicação.</Aviso></div>}

      {preView ? (
        <article className="card card-pad">
          <h2 className="serif" style={{ fontSize: '1.35rem', borderBottom: '3px solid var(--marinho)', paddingBottom: 12, marginBottom: 18 }}>
            Auditoria do Sistema de Priorização de Atendimento em Saúde — relatório v1.0
          </h2>
          {CAMPOS.map(([k, t]) => (
            <section key={k} style={{ marginBottom: 18 }}>
              <h3 style={{ fontSize: '1rem', marginBottom: 4 }}>{t}</h3>
              <p className="muted small" style={{ whiteSpace: 'pre-wrap' }}>{texto[k]}</p>
            </section>
          ))}
          <Aviso tipo="alerta" compacto>Diferenças entre grupos não comprovam, isoladamente, discriminação ou irregularidade. A interpretação é responsabilidade dos auditores.</Aviso>
        </article>
      ) : (
        <div className="card card-pad" style={{ maxWidth: 860 }}>
          <Aviso tipo="info" className="mb-3">O relatório deve registrar objetivos, metodologia, dados, resultados, indicadores, limitações, evidências, conclusões e recomendações. Todos os campos são obrigatórios.</Aviso>
          {CAMPOS.map(([k, t]) => (
            <div className="campo" key={k}>
              <label htmlFor={`rel-${k}`} className="req">{t}</label>
              <textarea id={`rel-${k}`} className="textarea" value={texto[k]} onChange={set(k)} />
            </div>
          ))}
          {faltando.length > 0 && <p role="alert" className="small" style={{ color: 'var(--vermelho)' }}>{faltando.length} campo(s) precisam de conteúdo com pelo menos 10 caracteres.</p>}
        </div>
      )}
      <Toasts />
    </>
  )
}
