import { createContext, useContext, useMemo, useState, useCallback } from 'react'
import {
  SOLICITACOES_INICIAIS, AUDITORIAS_INICIAIS, NOTIFICACOES_INICIAIS, PERFIS
} from '../data/mockData'

const AppCtx = createContext(null)

const seed = (arr, extra = 0) => arr.map((o, i) => ({ ...o, _n: i + extra }))

export function AppProvider({ children }) {
  const carregar = (chave, padrao, extra = 0) => {
    try {
      const salvo = sessionStorage.getItem(chave)
      return salvo ? JSON.parse(salvo) : seed(padrao, extra)
    } catch { return seed(padrao, extra) }
  }
  const [perfil, setPerfil] = useState(() => sessionStorage.getItem('govlens-perfil') || null) // 'cidadao' | 'auditor' | 'admin'
  const [solicitacoes, setSolicitacoes] = useState(() => carregar('govlens-solicitacoes', SOLICITACOES_INICIAIS))
  const [auditorias, setAuditorias] = useState(() => carregar('govlens-auditorias', AUDITORIAS_INICIAIS, 100))

  const salvar = (chave, valor) => { try { sessionStorage.setItem(chave, JSON.stringify(valor)) } catch { /* protótipo */ } }

  const updSol = (fn) => setSolicitacoes(s => { const n = typeof fn === 'function' ? fn(s) : fn; salvar('govlens-solicitacoes', n); return n })
  const updAud = (fn) => setAuditorias(s => { const n = typeof fn === 'function' ? fn(s) : fn; salvar('govlens-auditorias', n); return n })
  const [notificacoes, setNotificacoes] = useState(NOTIFICACOES_INICIAIS)
  const [toasts, setToasts] = useState([])

  const toast = useCallback((texto, tipo = 'sucesso') => {
    const id = Date.now() + Math.random()
    setToasts(t => [...t, { id, texto, tipo }])
    setTimeout(() => setToasts(t => t.filter(x => x.id !== id)), 4200)
  }, [])

  const value = useMemo(() => {
    const usuario = perfil ? PERFIS[perfil] : null
    const notifNaoLidas = notificacoes.filter(n => !n.lida).length
    return {
      perfil, usuario,
      login: (p) => { setPerfil(p); sessionStorage.setItem('govlens-perfil', p); setNotificacoes(ns => ns.map(n => ({ ...n, lida: true }))) },
      logout: () => { setPerfil(null); sessionStorage.removeItem('govlens-perfil') },
      alternarPerfil: (p) => { setPerfil(p); sessionStorage.setItem('govlens-perfil', p); toast(`Perfil alterado para ${PERFIS[p].rotulo}.`) },
      solicitacoes, setSolicitacoes: updSol,
      auditorias, setAuditorias: updAud,
      notificacoes, notifNaoLidas,
      marcarNotificacoesLidas: () => setNotificacoes(ns => ns.map(n => ({ ...n, lida: true }))),
      toasts, toast
    }
  }, [perfil, solicitacoes, auditorias, notificacoes, toasts, toast])

  return <AppCtx.Provider value={value}>{children}</AppCtx.Provider>
}

export const useApp = () => useContext(AppCtx)
