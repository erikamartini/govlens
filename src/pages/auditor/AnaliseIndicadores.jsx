import { Link } from 'react-router-dom'
import { BarChart3, TrendingUp, Users, CheckCircle2 } from 'lucide-react'
import { GraficoBarras, AvisoInterpretacao, Aviso } from '../../components/ui'

const GRUPOS = [
  { nome: 'Grupo A — Territórios centrais', total: 100, positivos: 80 },
  { nome: 'Grupo B — Territórios periféricos', total: 100, positivos: 40 }
]
const taxas = GRUPOS.map(g => (g.positivos / g.total) * 100)
const dif = taxas[0] - taxas[1]
const razao = taxas[0] / taxas[1]

export default function AnaliseIndicadores() {
  return (
    <>
      <h1 style={{ fontSize: '1.5rem' }}>Análise de indicadores</h1>
      <p className="muted mb-3">Exemplo demonstrativo referente à auditoria <Link to="/auditor/auditorias/AUD-2026-0014">AUD-2026-0014</Link> — amostra de 200 solicitações de procedimentos.</p>

      <div className="grid-2">
        {GRUPOS.map((g, i) => (
          <div className="card card-pad" key={g.nome}>
            <h2 style={{ fontSize: '1.08rem', marginBottom: 10 }}>{g.nome}</h2>
            <GraficoBarras dados={[
              { rotulo: 'Total de casos', valor: g.total },
              { rotulo: 'Resultados positivos', valor: g.positivos },
              { rotulo: 'Taxa de resultados positivos', valor: taxas[i], sufixo: '%' }
            ]} max={100} alertaAcima={null} />
            <div className="small muted mt-2">
              <strong>Fórmula:</strong> resultados positivos ÷ total de casos do grupo × 100 · <strong>Denominador:</strong> {g.total} casos.
            </div>
          </div>
        ))}
      </div>

      <div className="stats-grid mt-3">
        <div className="stat"><span className="rotulo"><BarChart3 size={14} aria-hidden="true" /> Taxa — Grupo A</span><span className="valor">80%</span><span className="nota">80 de 100 casos</span></div>
        <div className="stat"><span className="rotulo"><BarChart3 size={14} aria-hidden="true" /> Taxa — Grupo B</span><span className="valor">40%</span><span className="nota">40 de 100 casos</span></div>
        <div className="stat"><span className="rotulo"><TrendingUp size={14} aria-hidden="true" /> Diferença entre taxas</span><span className="valor">40 <span style={{ fontSize: '1rem' }}>p.p.</span></span><span className="nota">Sinalizada como diferença relevante</span></div>
        <div className="stat"><span className="rotulo">Razão entre taxas</span><span className="valor">{razao.toFixed(1).replace('.', ',')}</span><span className="nota">Calculável: denominadores não nulos</span></div>
      </div>

      <div className="card card-pad mt-3">
        <h2 style={{ fontSize: '1.1rem', marginBottom: 12 }}><Users size={17} style={{ verticalAlign: -3 }} aria-hidden="true" /> Síntese por grupo</h2>
        <div className="tabela-wrap">
          <table className="tabela">
            <thead><tr><th>Grupo</th><th>Total de casos</th><th>Resultados positivos</th><th>Taxa</th><th>Diferença (p.p.)</th><th>Sinalização</th></tr></thead>
            <tbody>
              {GRUPOS.map((g, i) => (
                <tr key={g.nome}>
                  <td style={{ fontWeight: 600 }}>{g.nome}</td>
                  <td>{g.total}</td><td>{g.positivos}</td><td><strong>{taxas[i]}%</strong></td>
                  <td>{i === 0 ? `+${dif}` : `−${dif}`}</td>
                  <td><span className="selo selo-pendente">Diferença relevante</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="mt-3">
        <Aviso tipo="alerta">
          <strong>Limitações estatísticas:</strong> a amostra analisada não é censitária e parte dos registros apresenta campos clínicos incompletos. As comparações descrevem o período e os casos analisados, sem generalização automática para toda a operação do sistema.
        </Aviso>
      </div>
      <div className="mt-2">
        <AvisoInterpretacao />
      </div>
      <div className="mt-2"><Aviso tipo="info">Diferenças de 20 pontos percentuais ou mais recebem sinalização visual para exame das pessoas auditoras.</Aviso></div>
    </>
  )
}
