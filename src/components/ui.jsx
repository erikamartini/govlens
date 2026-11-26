import { ShieldCheck, Scale, FileSearch, Lock, BarChart3, Info, AlertTriangle, CheckCircle2, XCircle } from 'lucide-react'
import { useApp } from '../context/AppContext'

// ---------- Logotipo ----------
export function Logo({ invertido = false, tamanho = 34 }) {
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 10 }}>
      <svg width={tamanho} height={tamanho} viewBox="0 0 40 40" role="img" aria-label="Símbolo do GovLens: uma lente de análise dentro de um escudo">
        <path d="M20 2 L35 8 V20 C35 29 28.5 35.5 20 38 C11.5 35.5 5 29 5 20 V8 Z" fill={invertido ? '#245B82' : '#142B45'} />
        <circle cx="19" cy="18.5" r="7.5" fill="none" stroke="#FFFFFF" strokeWidth="2.4" />
        <line x1="24.6" y1="24.2" x2="29" y2="28.8" stroke="#FFFFFF" strokeWidth="2.6" strokeLinecap="round" />
        <line x1="15.5" y1="18.5" x2="22.5" y2="18.5" stroke="#8FB3CE" strokeWidth="2" strokeLinecap="round" />
      </svg>
      <span style={{ display: 'flex', flexDirection: 'column', lineHeight: 1 }}>
        <span className="serif" style={{ fontWeight: 700, fontSize: tamanho * 0.55, color: invertido ? '#fff' : '#142B45' }}>GovLens</span>
        <span style={{ fontSize: tamanho * 0.24, letterSpacing: '.12em', textTransform: 'uppercase', color: invertido ? '#8FB3CE' : '#596579', fontWeight: 600 }}>
          Transparência algorítmica
        </span>
      </span>
    </span>
  )
}

// ---------- Status ----------
export const STATUS = {
  pendente: { selo: 'selo-pendente', texto: 'Pendente' },
  aprovada: { selo: 'selo-aprovada', texto: 'Aprovada' },
  rejeitada: { selo: 'selo-rejeitada', texto: 'Rejeitada' },
  em_andamento: { selo: 'selo-andamento', texto: 'Em andamento' },
  aguardando_validacao: { selo: 'selo-pendente', texto: 'Aguardando validação' },
  validado: { selo: 'selo-validado', texto: 'Validado' }
}
export function SeloStatus({ status }) {
  const s = STATUS[status] || { selo: 'selo-neutro', texto: status }
  return <span className={`selo ${s.selo}`}>{s.texto}</span>
}

export const SITUACAO_SISTEMA = { 'Publicado': 'selo-aprovada', 'Publicação parcial': 'selo-pendente', 'Em revisão': 'selo-neutro' }

// ---------- Avisos ----------
export function Aviso({ tipo = 'info', children, icone }) {
  const Icon = tipo === 'erro' ? AlertTriangle : tipo === 'sucesso' ? CheckCircle2 : tipo === 'alerta' ? AlertTriangle : Info
  return (
    <div className={`aviso aviso-${tipo}`} role={tipo === 'erro' ? 'alert' : 'note'}>
      {icone || <Icon size={18} aria-hidden="true" />}
      <div>{children}</div>
    </div>
  )
}

export function AvisoInterpretacao({ compacto = false }) {
  return (
    <div className="aviso aviso-alerta" role="note">
      <Scale size={18} aria-hidden="true" />
      <div className={compacto ? 'small' : ''}>
        Os indicadores apresentados são instrumentos de apoio à auditoria. Diferenças entre grupos <strong>não comprovam, isoladamente, discriminação ou irregularidade</strong>. A interpretação dos resultados é responsabilidade dos auditores.
      </div>
    </div>
  )
}

// ---------- Toasts ----------
export function Toasts() {
  const { toasts } = useApp()
  return (
    <div className="toasts" aria-live="polite">
      {toasts.map(t => (
        <div key={t.id} className={`toast ${t.tipo}`}>
          {t.tipo === 'erro' ? <XCircle size={18} aria-hidden="true" /> : <CheckCircle2 size={18} aria-hidden="true" />}
          <span>{t.texto}</span>
        </div>
      ))}
    </div>
  )
}

// ---------- Gráfico de barras (CSS puro) ----------
export function GraficoBarras({ dados, alertaAcima = null, max = null }) {
  const maximo = max || Math.max(...dados.map(d => d.valor), 100)
  return (
    <div className="grafico-barras" role="img" aria-label={`Gráfico de barras: ${dados.map(d => `${d.rotulo}: ${d.valor}${d.sufixo || ''}`).join('; ')}`}>
      {dados.map((d, i) => {
        const alerta = alertaAcima != null && d.valor >= alertaAcima
        return (
          <div className="grafico-linha" key={i}>
            <div className="rotulos"><span>{d.rotulo}</span><span>{d.valor}{d.sufixo || ''}</span></div>
            <div className="trilho">
              <div className={`barra ${i % 2 ? 'secundaria' : ''} ${alerta ? 'alerta' : ''}`} style={{ width: `${Math.min(100, (d.valor / maximo) * 100)}%` }} />
            </div>
          </div>
        )
      })}
    </div>
  )
}

// ---------- Grupos comparados (indicadores com fórmula) ----------
export function BlocoGrupos({ grupos, mostrarFormula = true }) {
  const taxas = grupos.map(g => (g.positivos / g.total) * 100)
  const dif = Math.round(Math.abs(taxas[0] - taxas[1]) * 10) / 10
  const relevante = dif >= 20
  return (
    <>
      <div className="grid-2 mt-2">
        {grupos.map((g, i) => {
          const taxa = Math.round(taxas[i] * 10) / 10
          return (
            <div className="card card-pad" key={i}>
              <div className="flex between mb-1"><h3 style={{ fontSize: '1.05rem' }}>{g.nome}</h3>
                <span className={`selo ${taxa >= 60 ? 'selo-aprovada' : taxa >= 40 ? 'selo-pendente' : 'selo-rejeitada'}`}>{taxa}%</span>
              </div>
              <p className="small muted mb-2">{g.criterio}</p>
              <GraficoBarras dados={[
                { rotulo: 'Total de casos', valor: g.total },
                { rotulo: 'Resultados positivos', valor: g.positivos },
                { rotulo: 'Taxa de resultados positivos', valor: taxa, sufixo: '%' }
              ]} max={Math.max(g.total, 100)} />
              {mostrarFormula && (
                <div className="mt-2 small muted">
                  <strong>Fórmula:</strong> resultados positivos ÷ total de casos do grupo × 100.<br />
                  <strong>Denominador:</strong> {g.total} casos analisados do grupo.
                </div>
              )}
            </div>
          )
        })}
      </div>
      <div className="card card-pad mt-3">
        <div className="flex between wrap">
          <div>
            <div className="stat"><span className="rotulo"><BarChart3 size={14} aria-hidden="true" /> Diferença entre taxas</span>
              <span className="valor">{dif} <span style={{ fontSize: '1rem' }}>pontos percentuais</span></span></div>
          </div>
          <div className="flex gap">
            {grupos[0] && grupos[1] && (
              <div className="stat"><span className="rotulo">Razão entre taxas</span>
                <span className="valor">{Math.round((taxas[0] / taxas[1]) * 100) / 100}</span>
                <div className="nota">taxa grupo A ÷ taxa grupo B</div></div>
            )}
            <div className="stat"><span className="rotulo">Sinalização</span>
              <span className={`selo ${relevante ? 'selo-pendente' : 'selo-neutro'}`}>{relevante ? 'Diferença relevante' : 'Sem sinalização relevante'}</span>
              <div className="nota">Diferenças ≥ 20 p.p. são destacadas para exame dos auditores.</div></div>
          </div>
        </div>
      </div>
    </>
  )
}

// ---------- Indicador de progresso ----------
export function Progresso({ atual, total }) {
  return (
    <div>
      <div className="flex between small mb-1">
        <span>Etapa {atual} de {total}</span><span>{Math.round((atual / total) * 100)}%</span>
      </div>
      <div className="trilho" style={{ height: 10, background: '#EDF1F6', borderRadius: 6, overflow: 'hidden' }}>
        <div style={{ width: `${(atual / total) * 100}%`, height: '100%', background: 'var(--institucional)', borderRadius: 6, transition: 'width .5s' }} />
      </div>
    </div>
  )
}

export const ICONES = { ShieldCheck, Scale, FileSearch, Lock }
