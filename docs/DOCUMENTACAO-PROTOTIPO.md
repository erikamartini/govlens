# GovLens — Documentação do Protótipo

**Versão:** 1.0 · **Data:** novembro de 2026 · **Repositório:** https://github.com/erikamartini/govlens

---

## 1. Identificação

| Item       | Descrição                                                                                                                                                                                            |
| ---------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Produto    | GovLens — Plataforma de Transparência e Auditoria Algorítmica Governamental                                                                                                                          |
| Natureza   | Protótipo visual de alta fidelidade, navegável (projeto acadêmico conceitual)                                                                                                                        |
| Finalidade | Demonstrar a experiência proposta da plataforma: consulta pública de sistemas algorítmicos, participação cidadã em auditorias, condução de auditorias técnicas e publicação controlada de relatórios |
| Limitações | Não existe integração real com órgãos públicos, banco de dados ou serviços externos. Todos os dados, órgãos, sistemas e pessoas são fictícios e demonstrativos. Não há autenticação real             |

## 2. Objetivos do protótipo

1. Representar visualmente o ciclo completo previsto na documentação técnica: **informação pública → participação cidadã → auditoria técnica → validação independente → autorização administrativa → publicação**.
2. Transmitir os valores institucionais definidos: transparência, credibilidade, imparcialidade, responsabilidade humana, proteção de dados e clareza técnica.
3. Servir de instrumento de apresentação acadêmica, permitindo percorrer os fluxos de todos os perfis sem cadastro real.

## 3. Tecnologias e arquitetura

- **React 18** com **JavaScript** (sem TypeScript), criado com **Vite**.
- **React Router 6** para navegação, com guarda de rotas por perfil.
- **Lucide React** para iconografia consistente.
- **CSS puro** com design system próprio (sem frameworks de UI).
- **Estado global** em React Context, com persistência de sessão e dados demonstrativos em `sessionStorage` (protótipo reinicia ao fechar o navegador).
- Sem back-end, banco de dados, autenticação real ou processamento de arquivos.

```
src/
├── components/       shells (público e autenticado) e biblioteca de UI reutilizável
│   ├── publicShell.jsx    cabeçalho e rodapé do portal público
│   ├── appShell.jsx       menu lateral, cabeçalho com perfil, notificações
│   └── ui.jsx             logotipo, selos de status, avisos, gráficos, toasts
├── context/
│   └── AppContext.jsx     perfil ativo, solicitações, auditorias, notificações, toasts
├── data/
│   └── mockData.js        base fictícia única e consistente entre todas as telas
├── pages/
│   ├── public/            telas 1–7 (portal público e autenticação)
│   ├── cidadao/           telas 8–10 (ambiente do cidadão)
│   ├── auditor/           telas 11–16 (ambiente do auditor)
│   ├── admin/             telas 17–19 (ambiente do administrador)
│   └── HistoricoAtividades.jsx   tela de histórico (auditor e administrador)
├── styles/
│   └── global.css         design system: cores, tipografia, componentes, responsividade
├── App.jsx                rotas e guarda de acesso
└── main.jsx               entrada da aplicação
```

## 4. Identidade visual

| Papel                                          | Cor                   |
| ---------------------------------------------- | --------------------- |
| Azul-marinho profundo (estrutura, texto forte) | `#142B45`             |
| Azul institucional (ações, links, gráficos)    | `#245B82`             |
| Azul claro (fundos suaves, badges)             | `#EAF2F8`             |
| Cinza de fundo / texto                         | `#F5F7FA` / `#596579` |
| Verde (estados positivos)                      | `#27835B`             |
| Amarelo (alertas e pendências)                 | `#D69B32`             |
| Vermelho (erros e rejeições)                   | `#C34B4B`             |

- Tipografia: **Inter** (interface) e **Source Serif 4** (títulos institucionais).
- Logotipo: escudo (fiscalização) contendo uma lente de análise, acompanhado do nome GovLens.
- Estética: minimalismo institucional contemporâneo, sem gradientes exagerados, excesso de sombras ou elementos decorativos.

## 5. Perfis e ambientes

| Perfil           | Ambiente                                                           | Acesso             |
| ---------------- | ------------------------------------------------------------------ | ------------------ |
| Visitante        | Portal público                                                     | Livre              |
| Cidadã(o)        | Dashboard, solicitações, acompanhamento                            | Simulação de login |
| Auditor(a)       | Painel de auditorias, dados, indicadores, relatórios               | Simulação de login |
| Administrador(a) | Gestão de solicitações, usuários/órgãos, autorização de publicação | Simulação de login |

A **alternância de perfis** está disponível no menu lateral do ambiente autenticado ("Demonstração — alternar perfil"), permitindo percorrer todos os ambientes sem novo cadastro.

## 6. Mapa de telas

### Portal público (telas 1–5)

1. **Página inicial** — hero institucional, três etapas de funcionamento, indicadores ilustrativos, princípios e rodapé.
2. **Consulta de sistemas algorítmicos** — catálogo com pesquisa textual e filtros por órgão, esfera e área.
3. **Detalhamento do sistema** — finalidade, funcionamento, critérios, dados, responsável divulgável e informações institucionais; botão "Solicitar auditoria deste sistema" que direciona ao login quando desautenticado.
4. **Relatórios públicos** — busca por sistema/órgão, filtros por área e período.
5. **Visualização de relatório** — documento com 11 seções, indicadores com valores, denominadores e fórmulas, gráficos de comparação e aviso de interpretação.

### Autenticação (telas 6–7)

6. **Login** — campos e-mail/senha (qualquer valor é aceito) e demonstração dos três perfis.
7. **Cadastro de cidadão** — validação de campos e aviso de privacidade com aceite obrigatório.

### Ambiente do cidadão (telas 8–10)

8. **Dashboard** — resumo de solicitações (pendentes, aprovadas, rejeitadas) e auditorias em andamento.
9. **Solicitar auditoria** — seleção de sistema, justificativa, descrição e anexos demonstrativos; confirmação com número de protocolo fictício.
10. **Acompanhar solicitação** — identificação, histórico de movimentações, decisão com justificativa e cancelamento (somente quando pendente).

### Ambiente do auditor (telas 11–16)

11. **Dashboard do auditor** — contadores, tabela de auditorias e progresso das atribuídas.
12. **Detalhes da auditoria** — 9 abas: visão geral, metodologia, participantes, grupos analisados, conjuntos de dados, indicadores, interpretações, evidências e relatório.
13. **Importação de dados** — fluxo de 5 etapas (seleção, verificação, validação, pré-visualização, confirmação); distingue erros bloqueantes de avisos; confirmação indisponível quando há erros bloqueantes.
14. **Análise de indicadores** — taxas por grupo (exemplo: 80% × 40%), diferença de 40 p.p. sinalizada, razão entre taxas, fórmulas e limitações estatísticas.
15. **Registro de interpretações e evidências** — observações associadas a indicadores, com autor e data.
16. **Elaboração de relatório** — 9 campos obrigatórios, pré-visualização formatada e envio à validação técnica.

### Ambiente do administrador (telas 17–19)

17. **Dashboard administrativo** — métricas institucionais e menu administrativo completo.
18. **Gerenciamento de solicitações** — visualização do conteúdo e decisões de aprovar/rejeitar, ambas com justificativa obrigatória; aprovação instaura auditoria automaticamente.
19. **Autorização de publicação** — lista de relatórios validados tecnicamente, com as **três etapas obrigatórias** representadas: elaboração → validação técnica por outro auditor → autorização administrativa. A rejeição exige justificativa.

### Transversal

- **Histórico de atividades** — tabela com usuário, perfil, ação, entidade, data/horário e descrição, com filtros.

## 7. Regras de negócio respeitadas

- Diferenças entre grupos **não são apresentadas como comprovação automática** de discriminação ou ilegalidade; avisos explícitos indicam que a interpretação é responsabilidade das pessoas auditoras.
- A validação técnica **nunca é realizada pelo próprio autor** do relatório; a regra está declarada na interface.
- A publicação somente ocorre após as três etapas: elaboração, validação técnica independente e autorização administrativa.
- Nenhuma informação pessoal, credencial ou confidencial é exibida; responsáveis são divulgados apenas em nível institucional.
- Ações administrativas (aprovação, rejeição, autorização) exigem justificativa registrada no histórico da solicitação/relatório.

## 8. Interações implementadas

Navegação entre páginas · pesquisa e filtros funcionais sobre dados fictícios · login simulado · alternância de perfis · abertura de detalhes · formulários com validação · envio de solicitações com protocolo · atualização visual de status · simulação de importação com pré-visualização · navegação por etapas de auditoria · gráficos comparativos · validação e autorização simuladas de relatórios · notificações, toasts e mensagens de confirmação/alerta.

## 9. Acessibilidade

Referência: **WCAG 2.1 nível AA** e **eMAG**.

- Contraste adequado entre texto e fundo.
- Navegação por teclado com link "Ir para o conteúdo principal" e foco visível.
- Rótulos explícitos e `aria-label` em campos, ícones e gráficos.
- Estados de interação visíveis (hover, foco, disabled).
- Linguagem acessível nas áreas públicas, evitando jargão excessivo.
- Responsividade para desktop, notebook, tablet e smartphone.

## 10. Execução local

Requisitos: Node.js 18+.

```bash
git clone https://github.com/erikamartini/govlens.git
cd govlens
npm install
npm run dev        # http://localhost:5173
```

Build de produção:

```bash
npm run build
npm run preview    # http://localhost:4173
```

## 11. Controle de versão

O código está versionado no GitHub (`erikamartini/govlens`, branch `main`). O `.gitignore` exclui `node_modules/`, `dist/` e arquivos locais; o repositório contém exclusivamente o código-fonte e a documentação.

| Commit    | Conteúdo                                                                                                                           |
| --------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| `29c0840` | Protótipo completo: portal público, ambientes de cidadão, auditor e administrador, histórico, design system e dados demonstrativos |

## 12. Verificação realizada

O protótipo foi validado com navegador automatizado: build de produção sem erros; fluxos de login por perfil, envio e aprovação de solicitação, análise de indicadores, abas da auditoria, importação com erro bloqueante, visualização de relatório publicado, autorização de publicação e histórico de atividades confirmados funcionalmente e visualmente por captura de tela.
