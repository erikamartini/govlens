# GovLens — Plataforma de Transparência e Auditoria Algorítmica Governamental

Protótipo visual de alta fidelidade (projeto acadêmico conceitual). **Não existe** integração real com órgãos públicos, banco de dados ou serviços externos: todos os dados, pessoas e interações são fictícios e demonstrativos.

## Como executar localmente

Requisitos: Node.js 18+.

```bash
npm install
npm run dev
```

Abra `http://localhost:5173` no navegador. Para build de produção: `npm run build` e `npm run preview`.

## Como explorar

1. **Portal público** (sem login): página inicial, catálogo de sistemas algorítmicos (com pesquisa e filtros funcionais), detalhamento de cada sistema, relatórios publicados e visualização completa de relatório.
2. **Entrar**: na tela de login use a opção **"Demonstração de perfis"** para acessar como Cidadã(o), Auditor(a) ou Administrador(a) — ou o botão **Entrar** com qualquer e-mail/senha (simulação).
3. **Cidadão**: dashboard de solicitações, envio de nova solicitação (com protocolo fictício), acompanhamento com histórico e cancelamento quando pendente.
4. **Auditor**: painel de auditorias, detalhes por etapas (9 abas), importação simulada de CSV/XLS/XLSX (com fluxo de 5 etapas, erros bloqueantes e avisos), análise de indicadores com gráficos e registro de interpretações/evidências, elaboração de relatório com pré-visualização e envio à validação.
5. **Administrador**: painel administrativo, gerenciamento de solicitações (aprovar/rejeitar com justificativa obrigatória) e autorização de publicação com as **três etapas obrigatórias** (elaboração → validação técnica por outro auditor → autorização administrativa).
6. **Alternância de perfis**: no menu lateral (bloco "Demonstração — alternar perfil").
7. **Histórico de atividades**: tabela com filtros, acessível aos perfis auditor e administrador.

## Avisos de interpretação

As diferenças entre grupos nos indicadores **não são apresentadas como comprovação automática de discriminação ou ilegalidade**; avisos explícitos reforçam que a interpretação depende de análise humana e contextual.

## Tecnologias

React 18 · JavaScript · React Router 6 · Lucide React · CSS puro (design system próprio). Sem back-end, banco de dados ou autenticação real.

## Acessibilidade

Referências WCAG 2.1 nível AA e eMAG: contraste adequado, navegação por teclado (skip link, foco visível), rótulos e `aria-label` nos campos e ícones, estados visíveis, linguagem acessível nas áreas públicas.

## Estrutura

```
src/
  components/    shell público, shell autenticado, componentes de UI reutilizáveis
  context/       estado global (perfil, solicitações, auditorias, notificações, toasts)
  data/          dados fictícios consistentes entre as telas
  pages/public/  telas 1–7
  pages/cidadao/ telas 8–10
  pages/auditor/ telas 11–16
  pages/admin/   telas 17–19
  styles/        design system (cores, tipografia, componentes)
```
