import { CabecalhoPublico, Rodape } from '../../components/publicShell'
import { ShieldCheck, Scale, Lock, Users, FileSearch, Workflow } from 'lucide-react'

export default function Sobre() {
  return (
    <>
      <CabecalhoPublico />
      <div className="cabecalho-pagina">
        <div className="container">
          <h1>Sobre o GovLens</h1>
          <p>Plataforma de transparência e auditoria algorítmica governamental. Proposta acadêmica conceitual, sem vínculo com órgãos públicos reais.</p>
        </div>
      </div>
      <div className="container secao" style={{ paddingTop: 8 }}>
        <div className="grid-2">
          <div className="card card-pad">
            <h2 style={{ fontSize: '1.25rem', marginBottom: 12 }}><FileSearch size={20} style={{ verticalAlign: -4, color: 'var(--institucional)' }} aria-hidden="true" /> O que é</h2>
            <p className="muted">O GovLens é uma plataforma web acadêmica que disponibiliza informações sobre sistemas algorítmicos utilizados pela administração pública, permite que cidadãs e cidadãos solicitem auditorias, organiza processos de auditoria institucional e cidadã e publica relatórios somente após validação técnica independente e autorização administrativa.</p>
          </div>
          <div className="card card-pad">
            <h2 style={{ fontSize: '1.25rem', marginBottom: 12 }}><Workflow size={20} style={{ verticalAlign: -4, color: 'var(--institucional)' }} aria-hidden="true" /> Fluxo de um relatório</h2>
            <ol style={{ paddingLeft: 20, color: 'var(--texto)' }}>
              <li className="mb-1"><strong>Elaboração</strong> pelo auditor responsável.</li>
              <li className="mb-1"><strong>Validação técnica</strong> por outro auditor — nunca pelo próprio autor.</li>
              <li><strong>Autorização administrativa</strong> para publicação no portal.</li>
            </ol>
          </div>
        </div>

        <div className="grid-3 mt-3">
          {[
            { i: ShieldCheck, t: 'Transparência', p: 'Informações sobre finalidade, critérios e dados dos sistemas algorítmicos ficam disponíveis publicamente.' },
            { i: Users, t: 'Participação', p: 'Qualquer pessoa pode solicitar auditoria de um sistema, com justificativa, e acompanhar o andamento.' },
            { i: Scale, t: 'Imparcialidade', p: 'Diferenças entre grupos nunca são apresentadas como prova automática de discriminação; a interpretação é humana e contextual.' },
            { i: Lock, t: 'Proteção de dados', p: 'Não são exibidas informações pessoais, credenciais ou confidenciais. Dados de auditoria são anonimizados.' },
            { i: Users, t: 'Responsabilidade humana', p: 'Cada análise, interpretação e decisão tem autora ou autor identificado, com data registrada.' },
            { i: FileSearch, t: 'Clareza técnica', p: 'Indicadores apresentam valores, denominadores e fórmulas, com linguagem acessível nas áreas públicas.' }
          ].map(c => (
            <div className="card card-pad" key={c.t}>
              <c.i size={22} color="var(--institucional)" aria-hidden="true" />
              <h3 className="mt-1" style={{ fontSize: '1.05rem' }}>{c.t}</h3>
              <p className="muted small mt-1">{c.p}</p>
            </div>
          ))}
        </div>

        <div className="card card-pad mt-3" style={{ background: 'var(--azul-claro)', border: 'none' }}>
          <h3 style={{ fontSize: '1.05rem' }}>Aviso sobre o protótipo</h3>
          <p className="muted mt-1">Este é um protótipo visual acadêmico. Órgãos, sistemas, pessoas, números e interações são fictícios e servem apenas para demonstrar o funcionamento proposto da plataforma. Nenhuma integração real é realizada.</p>
        </div>
      </div>
      <Rodape />
    </>
  )
}
