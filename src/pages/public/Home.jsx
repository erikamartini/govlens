import { Link } from 'react-router-dom'
import { Search, FileText, Compass, Megaphone, BookOpen, ShieldCheck, Lock, Users, ArrowRight } from 'lucide-react'
import { CabecalhoPublico, Rodape } from '../../components/publicShell'
import { Aviso } from '../../components/ui'

const ETAPAS = [
  { icone: Compass, titulo: '1. Conheça', texto: 'Consulte informações sobre sistemas algorítmicos utilizados pela administração pública: finalidade, critérios, dados utilizados e responsáveis.' },
  { icone: Megaphone, titulo: '2. Solicite ou acompanhe', texto: 'Participe do processo de fiscalização por meio de solicitações de auditoria e acompanhe o andamento da sua solicitação.' },
  { icone: BookOpen, titulo: '3. Consulte', texto: 'Acesse relatórios publicados somente após validação técnica independente e autorização administrativa.' }
]

const INDICADORES = [
  { rotulo: 'Sistemas cadastrados', valor: 6 },
  { rotulo: 'Órgãos registrados', valor: 6 },
  { rotulo: 'Auditorias concluídas', valor: 2 },
  { rotulo: 'Relatórios publicados', valor: 2 }
]

export default function Home() {
  return (
    <>
      <CabecalhoPublico />
      <a id="conteudo"></a>
      <section className="hero">
        <div className="container">
          <span className="selo-topo"><ShieldCheck size={15} aria-hidden="true" /> Plataforma de tecnologia cívica — protótipo acadêmico</span>
          <h1>Transparência para compreender. Auditoria para fiscalizar.</h1>
          <p>Consulte informações sobre sistemas algorítmicos utilizados pela administração pública e acompanhe os resultados de auditorias.</p>
          <div className="acoes">
            <Link to="/sistemas" className="btn btn-branco"><Search size={17} aria-hidden="true" /> Consultar sistemas</Link>
            <Link to="/relatorios" className="btn btn-contorno" style={{ color: '#fff', borderColor: 'rgba(255,255,255,.45)' }}><FileText size={17} aria-hidden="true" /> Ver relatórios publicados</Link>
          </div>
        </div>
      </section>

      <section className="secao">
        <div className="container">
          <div className="secao-cab">
            <div className="kicker">Como funciona</div>
            <h2>Três etapas de fiscalização</h2>
            <p>O GovLens organiza o ciclo entre informação pública, participação cidadã e resultados de auditoria.</p>
          </div>
          <div className="grid-3">
            {ETAPAS.map(e => (
              <div className="card card-pad" key={e.titulo}>
                <div style={{ width: 44, height: 44, borderRadius: 10, background: 'var(--azul-claro)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--institucional)', marginBottom: 14 }}>
                  <e.icone size={22} aria-hidden="true" />
                </div>
                <h3 style={{ fontSize: '1.1rem', marginBottom: 6 }}>{e.titulo}</h3>
                <p className="muted">{e.texto}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ background: '#fff', borderTop: '1px solid var(--borda)', borderBottom: '1px solid var(--borda)' }}>
        <div className="container secao">
          <div className="secao-cab">
            <div className="kicker">Panorama</div>
            <h2>Indicadores institucionais</h2>
          </div>
          <Aviso tipo="info" className="mb-2">Os valores abaixo são <strong>dados ilustrativos</strong> para fins de demonstração do protótipo acadêmico.</Aviso>
          <div className="stats-grid mt-2">
            {INDICADORES.map(i => (
              <div className="stat" key={i.rotulo}>
                <span className="rotulo">{i.rotulo}</span>
                <span className="valor">{i.valor}</span>
                <span className="nota">Dados ilustrativos</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="secao">
        <div className="container">
          <div className="secao-cab">
            <div className="kicker">Princípios</div>
            <h2>Transparência com responsabilidade</h2>
          </div>
          <div className="grid-3">
            {[
              { i: Users, t: 'Responsabilidade humana', p: 'Nenhuma decisão sobre pessoas é deixada exclusivamente a sistemas. As análises e conclusões são sempre atribuídas a pessoas responsáveis, identificadas nos relatórios.' },
              { i: Lock, t: 'Proteção de dados', p: 'Informações pessoais e credenciais não são divulgadas. Os conjuntos de dados utilizados em auditorias passam por anonimização antes de qualquer análise.' },
              { i: ShieldCheck, t: 'Validação independente', p: 'Todo relatório passa por três etapas obrigatórias: elaboração pelo auditor responsável, validação técnica por outro auditor e autorização administrativa.' }
            ].map(c => (
              <div className="card card-pad" key={c.t}>
                <c.i size={24} color="var(--institucional)" aria-hidden="true" />
                <h3 className="mt-2" style={{ fontSize: '1.08rem' }}>{c.t}</h3>
                <p className="muted mt-1">{c.p}</p>
              </div>
            ))}
          </div>
          <div className="flex mt-4">
            <Link to="/sistemas" className="btn btn-primario">Explorar o catálogo <ArrowRight size={16} aria-hidden="true" /></Link>
            <Link to="/sobre" className="btn btn-contorno">Sobre o GovLens</Link>
          </div>
        </div>
      </section>
      <Rodape />
    </>
  )
}
