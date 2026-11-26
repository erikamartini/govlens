import { useState } from 'react'
import { UploadCloud, FileSpreadsheet, CheckCircle2, AlertTriangle, XCircle, Eye } from 'lucide-react'
import { Aviso, Toasts } from '../../components/ui'
import { useApp } from '../../context/AppContext'

const ETAPAS = ['Seleção do arquivo', 'Verificação', 'Validação', 'Pré-visualização', 'Confirmação']
const TIPOS = [
  'Solicitações de procedimentos (casos)',
  'Base de agendamentos efetivados',
  'Documentação de referência do sistema',
  'Outro conjunto de apoio à auditoria'
]
const AMOSTRA = [
  ['CASO-1042', 'Território central', 'Gravidade 2', '28 dias', 'Encaminhado'],
  ['CASO-1043', 'Território periférico', 'Gravidade 2', '73 dias', 'Aguardando'],
  ['CASO-1044', 'Território central', 'Gravidade 1', '12 dias', 'Encaminhado'],
  ['CASO-1045', 'Território periférico', 'Gravidade 3', '95 dias', 'Encaminhado'],
  ['CASO-1046', 'Território periférico', 'Gravidade 2', '61 dias', 'Aguardando']
]

export default function ImportacaoDados() {
  const [arquivo, setArquivo] = useState(null)
  const [etapa, setEtapa] = useState(0)
  const [tipo, setTipo] = useState('')
  const [origem, setOrigem] = useState('')
  const [descricao, setDescricao] = useState('')
  const [anon, setAnon] = useState('pseudonimizacao')
  const [erroSim, setErroSim] = useState(false)
  const { toast } = useApp()

  const selecionar = (nome) => { setArquivo(nome); setEtapa(1); setErroSim(nome.includes('bloqueio')) }

  const avancar = () => {
    if (etapa === 1 && (!tipo || !origem)) { toast('Informe o tipo de conjunto de dados e a origem antes de continuar.', 'erro'); return }
    setEtapa(e => Math.min(e + 1, 4))
  }
  const confirmar = () => {
    if (erroSim) { toast('Confirmação indisponível: existem erros bloqueantes no arquivo.', 'erro'); return }
    toast('Importação confirmada (simulação). O conjunto foi vinculado à auditoria.')
    setArquivo(null); setEtapa(0); setTipo(''); setOrigem(''); setDescricao('')
  }

  const temBloqueio = erroSim && etapa >= 3

  return (
    <>
      <h1 style={{ fontSize: '1.5rem' }}>Importação de dados</h1>
      <p className="mb-1 muted">Vincule conjuntos de dados à auditoria. Nenhum processamento real é executado — os resultados são simulados com dados demonstrativos.</p>
      <div className="mb-3"><Aviso tipo="info">Formatos aceitos: CSV, XLS e XLSX. Os dados devem estar anonimizados ou serão tratados pelo método selecionado abaixo.</Aviso></div>

      <div className="steps mb-3">
        {ETAPAS.map((e, i) => (
          <span key={e} className={`step ${i + 1 === etapa ? 'atual' : i + 1 < etapa ? 'ok' : ''}`}>
            <span className="num">{i + 1 < etapa ? '✓' : i + 1}</span> {e}
          </span>
        ))}
      </div>

      <div className="grid-2" style={{ alignItems: 'start' }}>
        <div className="card card-pad">
          <h2 style={{ fontSize: '1.1rem', marginBottom: 12 }}>1. Seleção do arquivo</h2>
          <div
            role="button" tabIndex={0}
            onClick={() => selecionar('amostra-encaminhamentos-t4.csv')}
            onKeyDown={e => e.key === 'Enter' && selecionar('amostra-encaminhamentos-t4.csv')}
            style={{ border: '2px dashed #B7C4D2', borderRadius: 10, padding: '36px 20px', textAlign: 'center', background: 'var(--azul-claro)', cursor: 'pointer' }}
            aria-label="Área de arrastar e soltar arquivos. Ative para simular a seleção de um arquivo."
          >
            <UploadCloud size={36} style={{ color: 'var(--institucional)' }} aria-hidden="true" />
            <p style={{ fontWeight: 600, color: 'var(--marinho)', marginTop: 8 }}>Arraste e solte o arquivo aqui</p>
            <p className="small muted">ou clique para simular a seleção (protótipo)</p>
          </div>
          <div className="flex mt-2 wrap" style={{ gap: 8 }}>
            <button className="btn btn-contorno btn-sm" onClick={() => selecionar('amostra-encaminhamentos-t4.csv')}><FileSpreadsheet size={15} aria-hidden="true" /> Selecionar arquivo válido</button>
            <button className="btn btn-contorno btn-sm" onClick={() => selecionar('base-bloqueio.csv')}><FileSpreadsheet size={15} aria-hidden="true" /> Selecionar arquivo com erro bloqueante</button>
          </div>
          {arquivo && <p className="small mt-2"><strong>Arquivo selecionado:</strong> {arquivo}</p>}

          <h2 style={{ fontSize: '1.1rem', margin: '20px 0 10px' }}>2. Informações do conjunto</h2>
          <div className="campo">
            <label htmlFor="i-tipo" className="req">Tipo de conjunto de dados</label>
            <select id="i-tipo" className="select" value={tipo} onChange={e => setTipo(e.target.value)}>
              <option value="">Selecione…</option>
              {TIPOS.map(t => <option key={t}>{t}</option>)}
            </select>
          </div>
          <div className="campo">
            <label htmlFor="i-origem" className="req">Origem dos dados</label>
            <input id="i-origem" className="input" value={origem} onChange={e => setOrigem(e.target.value)} placeholder="Ex.: exportação da regulação municipal" />
          </div>
          <div className="campo">
            <label htmlFor="i-desc">Descrição</label>
            <textarea id="i-desc" className="textarea" style={{ minHeight: 70 }} value={descricao} onChange={e => setDescricao(e.target.value)} placeholder="Descreva o conteúdo e o período do conjunto." />
          </div>
          <div className="campo">
            <label htmlFor="i-anon">Método de anonimização</label>
            <select id="i-anon" className="select" value={anon} onChange={e => setAnon(e.target.value)}>
              <option value="pseudonimizacao">Pseudonimização de identificadores diretos</option>
              <option value="supressao">Supressão de campos identificáveis</option>
              <option value="agregacao">Agregação estatística</option>
              <option value="nao">Não aplicável (dados já anonimizados)</option>
            </select>
          </div>
          <button className="btn btn-primario" disabled={!arquivo} onClick={avancar}>Iniciar verificação</button>
        </div>

        <div className="card card-pad">
          <h2 style={{ fontSize: '1.1rem', marginBottom: 12 }}><Eye size={17} style={{ verticalAlign: -3 }} aria-hidden="true" /> Fluxo de importação</h2>
          {etapa === 0 && <p className="muted small">Selecione um arquivo para iniciar o fluxo de verificação, validação, pré-visualização e confirmação.</p>}

          {etapa >= 1 && (
            <>
              <p className="small mb-2"><CheckCircle2 size={15} style={{ verticalAlign: -3, color: 'var(--verde)' }} aria-hidden="true" /> <strong>Verificação:</strong> estrutura do arquivo reconhecida (CSV, separador ";" e codificação UTF-8).</p>
            </>
          )}
          {etapa >= 2 && (
            <p className="small mb-2">
              {erroSim
                ? <><XCircle size={15} style={{ verticalAlign: -3, color: 'var(--vermelho)' }} aria-hidden="true" /> <strong>Validação:</strong> 2 erros bloqueantes identificados.</>
                : <><AlertTriangle size={15} style={{ verticalAlign: -3, color: 'var(--amarelo)' }} aria-hidden="true" /> <strong>Validação:</strong> concluída com 12 avisos e nenhum erro bloqueante.</>}
            </p>
          )}
          {etapa >= 3 && (
            <>
              <h3 style={{ fontSize: '.98rem', margin: '14px 0 8px' }}>Pré-visualização</h3>
              <table className="tabela mb-2">
                <tbody>
                  <tr><td style={{ color: 'var(--texto)', fontWeight: 600, width: '45%' }}>Arquivo</td><td>{arquivo}</td></tr>
                  <tr><td style={{ color: 'var(--texto)', fontWeight: 600 }}>Quantidade de linhas</td><td>{erroSim ? '18 (2 inválidas)' : '200'}</td></tr>
                  <tr><td style={{ color: 'var(--texto)', fontWeight: 600 }}>Quantidade de colunas</td><td>9</td></tr>
                  <tr><td style={{ color: 'var(--texto)', fontWeight: 600 }}>Problemas identificados</td><td>{erroSim ? '2 erros bloqueantes' : '0 erros · 12 avisos'}</td></tr>
                </tbody>
              </table>
              {erroSim ? (
                <div className="aviso aviso-erro mb-2" role="alert">
                  <XCircle size={18} aria-hidden="true" />
                  <div><strong>Erros bloqueantes:</strong> linha 7 com campo de grupo vazio; linha 13 com data fora do período autorizado. A confirmação fica indisponível até a correção.</div>
                </div>
              ) : (
                <div className="aviso aviso-alerta mb-2" role="note">
                  <AlertTriangle size={18} aria-hidden="true" />
                  <div><strong>Avisos (não bloqueantes):</strong> 12 registros com campos clínicos incompletos serão mantidos e sinalizados na análise.</div>
                </div>
              )}
              <h3 style={{ fontSize: '.95rem', margin: '10px 0 6px' }}>Amostra das primeiras linhas</h3>
              <div className="tabela-wrap">
                <table className="tabela">
                  <thead><tr><th>Caso</th><th>Grupo</th><th>Gravidade</th><th>Espera</th><th>Resultado</th></tr></thead>
                  <tbody>{AMOSTRA.map((r, i) => <tr key={i}>{r.map((c, j) => <td key={j}>{c}</td>)}</tr>)}</tbody>
                </table>
              </div>
            </>
          )}
          {etapa === 4 && (
            <div className="mt-3">
              <button className="btn btn-verde" disabled={temBloqueio} onClick={confirmar}>Confirmar importação</button>
              {temBloqueio && <p className="small mt-1" style={{ color: 'var(--vermelho)' }}>A confirmação está indisponível enquanto existirem erros bloqueantes.</p>}
            </div>
          )}
          {etapa > 0 && etapa < 4 && <button className="btn btn-contorno btn-sm mt-3" onClick={avancar}>Avançar etapa</button>}
        </div>
      </div>
      <Toasts />
    </>
  )
}
