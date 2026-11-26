import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { AppProvider, useApp } from './context/AppContext'
import LayoutAutenticado from './components/appShell'
import Home from './pages/public/Home'
import Sobre from './pages/public/Sobre'
import CatalogoSistemas from './pages/public/CatalogoSistemas'
import DetalheSistema from './pages/public/DetalheSistema'
import RelatoriosPublicos from './pages/public/RelatoriosPublicos'
import VisualizarRelatorio from './pages/public/VisualizarRelatorio'
import Login from './pages/public/Login'
import Cadastro from './pages/public/Cadastro'
import DashboardCidadao from './pages/cidadao/DashboardCidadao'
import SolicitarAuditoria from './pages/cidadao/SolicitarAuditoria'
import MinhasSolicitacoes from './pages/cidadao/MinhasSolicitacoes'
import AcompanharSolicitacao from './pages/cidadao/AcompanharSolicitacao'
import DashboardAuditor from './pages/auditor/DashboardAuditor'
import ListaAuditorias from './pages/auditor/ListaAuditorias'
import DetalhesAuditoria from './pages/auditor/DetalhesAuditoria'
import ImportacaoDados from './pages/auditor/ImportacaoDados'
import AnaliseIndicadores from './pages/auditor/AnaliseIndicadores'
import ElaborarRelatorio from './pages/auditor/ElaborarRelatorio'
import DashboardAdmin from './pages/admin/DashboardAdmin'
import GerenciarSolicitacoes from './pages/admin/GerenciarSolicitacoes'
import AutorizacaoPublicacao from './pages/admin/AutorizacaoPublicacao'
import UsuariosEOrgaos, { SistemasAdmin } from './pages/admin/UsuariosEOrgaos'
import HistoricoAtividades from './pages/HistoricoAtividades'

const ROTAS = { cidadao: '/cidadao', auditor: '/auditor', admin: '/admin' }

function Protegido({ perfis, children }) {
  const { perfil } = useApp()
  const location = useLocation()
  if (!perfil) return <Navigate to="/entrar" state={{ de: location.pathname }} replace />
  if (!perfis.includes(perfil)) return <Navigate to={ROTAS[perfil]} replace />
  return children
}

export default function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <Routes>
          {/* Portal público */}
          <Route path="/" element={<Home />} />
          <Route path="/sobre" element={<Sobre />} />
          <Route path="/sistemas" element={<CatalogoSistemas />} />
          <Route path="/sistemas/:id" element={<DetalheSistema />} />
          <Route path="/relatorios" element={<RelatoriosPublicos />} />
          <Route path="/relatorios/:id" element={<VisualizarRelatorio />} />
          <Route path="/entrar" element={<Login />} />
          <Route path="/cadastro" element={<Cadastro />} />

          {/* Ambiente autenticado — cidadão */}
          <Route element={<Protegido perfis={['cidadao']}><LayoutAutenticado /></Protegido>}>
            <Route path="/cidadao" element={<DashboardCidadao />} />
            <Route path="/cidadao/solicitar" element={<SolicitarAuditoria />} />
            <Route path="/cidadao/solicitacoes" element={<MinhasSolicitacoes />} />
            <Route path="/cidadao/solicitacoes/:id" element={<AcompanharSolicitacao />} />
          </Route>

          {/* Ambiente autenticado — auditor */}
          <Route element={<Protegido perfis={['auditor', 'admin']}><LayoutAutenticado /></Protegido>}>
            <Route path="/auditor" element={<DashboardAuditor />} />
            <Route path="/auditor/auditorias" element={<ListaAuditorias />} />
            <Route path="/auditor/auditorias/:id" element={<DetalhesAuditoria />} />
            <Route path="/auditor/importar" element={<ImportacaoDados />} />
            <Route path="/auditor/indicadores" element={<AnaliseIndicadores />} />
            <Route path="/auditor/relatorio" element={<ElaborarRelatorio />} />
          </Route>

          {/* Ambiente autenticado — administrador */}
          <Route element={<Protegido perfis={['admin']}><LayoutAutenticado /></Protegido>}>
            <Route path="/admin" element={<DashboardAdmin />} />
            <Route path="/admin/solicitacoes" element={<GerenciarSolicitacoes />} />
            <Route path="/admin/publicacao" element={<AutorizacaoPublicacao />} />
            <Route path="/admin/usuariaseorgaos" element={<UsuariosEOrgaos />} />
            <Route path="/admin/sistemas" element={<SistemasAdmin />} />
          </Route>

          {/* Histórico — auditor e admin */}
          <Route element={<Protegido perfis={['auditor', 'admin']}><LayoutAutenticado /></Protegido>}>
            <Route path="/historico" element={<HistoricoAtividades />} />
          </Route>

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AppProvider>
  )
}
