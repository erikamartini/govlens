// ============================================================
// GovLens — Dados fictícios para demonstração (protótipo acadêmico)
// ============================================================

export const ORGAOS = [
  { id: 'sec-saude', nome: 'Secretaria Municipal de Saúde', esfera: 'Municipal', sigla: 'SMS' },
  { id: 'sec-edu', nome: 'Secretaria Estadual de Educação', esfera: 'Estadual', sigla: 'SEE' },
  { id: 'sec-des-social', nome: 'Secretaria de Desenvolvimento Social', esfera: 'Municipal', sigla: 'SDS' },
  { id: 'sec-trans', nome: 'Secretaria de Transportes', esfera: 'Estadual', sigla: 'SET' },
  { id: 'sec-fin', nome: 'Secretaria da Fazenda', esfera: 'Estadual', sigla: 'SEF' },
  { id: 'min-just', nome: 'Ministério da Justiça e Segurança Pública', esfera: 'Federal', sigla: 'MJSP' }
]

export const ESFERAS = ['Municipal', 'Estadual', 'Federal']

export const AREAS = [
  'Saúde', 'Educação', 'Assistência Social', 'Mobilidade Urbana',
  'Tributário', 'Segurança Pública'
]

export const SITUACOES_SISTEMA = ['Publicado', 'Publicação parcial', 'Em revisão']

export const SISTEMAS = [
  {
    id: 'saude-priorizacao',
    nome: 'Sistema de Priorização de Atendimento em Saúde',
    orgaoId: 'sec-saude',
    area: 'Saúde',
    situacao: 'Publicado',
    finalidade: 'Ordenar a fila de encaminhamento de pacientes para exames e consultas especializadas com base em gravidade clínica e tempo de espera.',
    descricao: 'O sistema recebe diariamente as solicitações de procedimentos registradas pelas unidades básicas de saúde. Cada solicitação recebe uma pontuação calculada a partir de variáveis clínicas informadas pelo profissional responsável (gravidade do quadro, risco de agravamento e tempo desde a solicitação). Os casos com maior pontuação são priorizados no agendamento. A pontuação é revisada semanalmente por comissão médica.',
    criterios: [
      'Gravidade clínica do quadro (classificada em 4 níveis).',
      'Tempo decorrido desde a solicitação do procedimento.',
      'Risco de agravamento identificado pelo profissional solicitante.',
      'Existência de programas de atenção prioritária aplicáveis ao paciente.'
    ],
    dadosUtilizados: [
      'Solicitações de procedimentos registradas pelas unidades de saúde.',
      'Classificação de risco clínico informada pelo profissional responsável.',
      'Histórico de agendamentos e comparecimentos.',
      'Dados demográficos básicos (idade e unidade territorial de residência).'
    ],
    responsavel: {
      cargo: 'Coordenação de Regulação, Assistência Ambulatorial e Hospitalar',
      orgao: 'Secretaria Municipal de Saúde',
      contato: 'Canal oficial de regulação da Secretaria Municipal de Saúde.'
    },
    infosInstitucionais: [
      { rotulo: 'Esfera governamental', valor: 'Municipal' },
      { rotulo: 'Data de entrada em operação', valor: 'Março de 2023' },
      { rotulo: 'Última revisão documentada', valor: 'Novembro de 2025' },
      { rotulo: 'Supervisão humana', valor: 'Comissão médica revisa pontuações semanalmente' },
      { rotulo: 'Base legal de referência', valor: 'Processo administrativo de regulação assistencial (dados ilustrativos)' }
    ]
  },
  {
    id: 'edu-vagas',
    nome: 'Sistema de Apoio à Distribuição de Vagas Escolares',
    orgaoId: 'sec-edu',
    area: 'Educação',
    situacao: 'Publicado',
    finalidade: 'Apoiar a alocação de estudantes em vagas da rede estadual de ensino, considerando distância residencial, capacidade das unidades e critérios socioeducacionais.',
    descricao: 'Durante o período de matrícula, o sistema processa os pedidos de vaga e propõe uma distribuição que equilibra a capacidade de cada escola com os critérios de proximidade e prioridade definidos pela rede. A proposta é apresentada à equipe pedagógica, que pode ajustar casos individuais antes da confirmação da matrícula.',
    criterios: [
      'Distância entre a residência do estudante e a unidade escolar.',
      'Capacidade remanescente de vagas por série e turno.',
      'Critérios de prioridade definidos em resolução educacional.',
      'Presença de irmãos matriculados na mesma unidade.'
    ],
    dadosUtilizados: [
      'Pedidos de matrícula registrados no período de rematrícula.',
      'Endereço residencial informado no cadastro escolar.',
      'Capacidade e oferta de turmas por unidade escolar.',
      'Composição do núcleo familiar, quando autorizada.'
    ],
    responsavel: {
      cargo: 'Diretoria de Planejamento e Gestão Escolar',
      orgao: 'Secretaria Estadual de Educação',
      contato: 'Ouvidoria educacional da Secretaria Estadual de Educação.'
    },
    infosInstitucionais: [
      { rotulo: 'Esfera governamental', valor: 'Estadual' },
      { rotulo: 'Data de entrada em operação', valor: 'Janeiro de 2024' },
      { rotulo: 'Última revisão documentada', valor: 'Setembro de 2025' },
      { rotulo: 'Supervisão humana', valor: 'Equipe pedagógica valida propostas antes da confirmação' },
      { rotulo: 'Base legal de referência', valor: 'Normativas de matrícula da rede estadual (dados ilustrativos)' }
    ]
  },
  {
    id: 'social-beneficios',
    nome: 'Sistema de Análise de Solicitações de Benefícios',
    orgaoId: 'sec-des-social',
    area: 'Assistência Social',
    situacao: 'Publicação parcial',
    finalidade: 'Triar e classificar solicitações de benefícios eventuais e auxílios, indicando casos para análise documental completa ou para atendimento presencial.',
    descricao: 'O sistema avalia as solicitações registradas nos centros de referência de assistência social e sugere uma classificação de prioridade para a análise documental. Casos classificados como de baixa complexidade seguem para aprovação simplificada; os demais são encaminhados a equipe técnica.',
    criterios: [
      'Renda per capita declarada do grupo familiar.',
      'Presença de pessoas em situação de vulnerabilidade no domicílio.',
      'Histórico de benefícios anteriores concedidos ao grupo familiar.',
      'Situação de emergência ou calamidade declarada no território.'
    ],
    dadosUtilizados: [
      'Formulários de solicitação registrados pelos centros de referência.',
      'Renda declarada e composição familiar.',
      'Base de benefícios concedidos pela pasta.',
      'Decretos de situação de emergência aplicáveis.'
    ],
    responsavel: {
      cargo: 'Departamento de Benefícios Socioassistenciais',
      orgao: 'Secretaria de Desenvolvimento Social',
      contato: 'Canal de atendimento socioassistencial do município.'
    },
    infosInstitucionais: [
      { rotulo: 'Esfera governamental', valor: 'Municipal' },
      { rotulo: 'Data de entrada em operação', valor: 'Agosto de 2023' },
      { rotulo: 'Última revisão documentada', valor: 'Outubro de 2025' },
      { rotulo: 'Supervisão humana', valor: 'Equipe técnica analisa os casos triados pelo sistema' },
      { rotulo: 'Documentação disponível', valor: 'Publicação parcial: alguns critérios de pontuação ainda não divulgados' }
    ]
  },
  {
    id: 'trans-rotas',
    nome: 'Sistema de Otimização de Rotas de Transporte Público',
    orgaoId: 'sec-trans',
    area: 'Mobilidade Urbana',
    situacao: 'Publicado',
    finalidade: 'Sugerir ajustes em itinerários e frequências de linhas de ônibus com base em dados de demanda e desempenho operacional.',
    descricao: 'O sistema cruza registros de validação de bilhetagem, gps das frotas e pesquisas de origem-destino para identificar linhas com sobrecarga ou ociosidade. As sugestões de redesenho de itinerário são submetidas a audiência pública antes de eventual implantação.',
    criterios: [
      'Demanda medida por validações de bilhetagem eletrônica.',
      'Tempo de percurso e regularidade das viagens.',
      'Ocupação média por período do dia.',
      'Sobreposição de itinerários entre linhas.'
    ],
    dadosUtilizados: [
      'Registros anonimizados de validação no transporte público.',
      'Dados de posição e tempo de viagem da frota.',
      'Pesquisas de origem e destino mais recentes.',
      'Cadastros de itinerários e paradas.'
    ],
    responsavel: {
      cargo: 'Superintendência de Planejamento de Transportes',
      orgao: 'Secretaria de Transportes',
      contato: 'Ouvidoria de mobilidade da Secretaria de Transportes.'
    },
    infosInstitucionais: [
      { rotulo: 'Esfera governamental', valor: 'Estadual' },
      { rotulo: 'Data de entrada em operação', valor: 'Fevereiro de 2022' },
      { rotulo: 'Última revisão documentada', valor: 'Agosto de 2025' },
      { rotulo: 'Supervisão humana', valor: 'Ajustes dependem de audiência pública e aprovação técnica' },
      { rotulo: 'Base legal de referência', valor: 'Contratos de concessão do transporte coletivo (dados ilustrativos)' }
    ]
  },
  {
    id: 'faz-risco',
    nome: 'Sistema de Seleção de Contribuintes para Fiscalização',
    orgaoId: 'sec-fin',
    area: 'Tributário',
    situacao: 'Em revisão',
    finalidade: 'Ordenar os casos aptos a fiscalização tributária a partir de indicadores de inconsistência entre declarações e movimentos econômicos declarados.',
    descricao: 'O sistema calcula, para cada contribuinte, indicadores de divergência entre dados declarados e referências setoriais. A lista resultante é ordenada e distribuída entre as unidades de fiscalização, que decidem quais casos efetivamente serão fiscalizados.',
    criterios: [
      'Divergência entre faturamento declarado e referências setoriais.',
      'Incompatibilidade entre movimentações e capacidade declarada.',
      'Histórico de autuações anteriores.',
      'Setor econômico e porte do contribuinte.'
    ],
    dadosUtilizados: [
      'Declarações fiscais apresentadas pelos contribuintes.',
      'Registros econômico-fiscais administrados pela pasta.',
      'Referências setoriais agregadas e anonimizadas.'
    ],
    responsavel: {
      cargo: 'Coordenação Especial de Fiscalização',
      orgao: 'Secretaria da Fazenda',
      contato: 'Canal de atendimento ao contribuinte da Secretaria da Fazenda.'
    },
    infosInstitucionais: [
      { rotulo: 'Esfera governamental', valor: 'Estadual' },
      { rotulo: 'Data de entrada em operação', valor: 'Junho de 2024' },
      { rotulo: 'Última revisão documentada', valor: 'Documentação em processo de revisão' },
      { rotulo: 'Supervisão humana', valor: 'Unidades de fiscalização definem quais casos serão tratados' },
      { rotulo: 'Observação', valor: 'Sistema em revisão: detalhamento completo será publicado após validação' }
    ]
  },
  {
    id: 'seg-analise',
    nome: 'Sistema de Análise de Ocorrências de Segurança Pública',
    orgaoId: 'min-just',
    area: 'Segurança Pública',
    situacao: 'Publicação parcial',
    finalidade: 'Identificar padrões espaciais e temporais em ocorrências criminais para orientar o dimensionamento de policiamento e ações preventivas.',
    descricao: 'O sistema agrega registros de ocorrências por território e período, destacando áreas com variações relevantes de incidência. As informações subsidiam o planejamento operacional, sem qualquer decisão automatizada sobre pessoas individuais.',
    criterios: [
      'Variação de incidência por território e período.',
      'Tipo de ocorrência e sazonalidade histórica.',
      'Disponibilidade de equipes na região.'
    ],
    dadosUtilizados: [
      'Registros agregados e anonimizados de ocorrências criminais.',
      'Dados territoriais do censo estatístico.',
      'Dimensionamento histórico de efetivos.'
    ],
    responsavel: {
      cargo: 'Departamento de Análise Estatística de Segurança Pública',
      orgao: 'Ministério da Justiça e Segurança Pública',
      contato: 'Ouvidoria nacional de segurança pública.'
    },
    infosInstitucionais: [
      { rotulo: 'Esfera governamental', valor: 'Federal' },
      { rotulo: 'Data de entrada em operação', valor: 'Outubro de 2023' },
      { rotulo: 'Última revisão documentada', valor: 'Dezembro de 2025' },
      { rotulo: 'Supervisão humana', valor: 'Planejamento operacional definido por comando de segurança pública' },
      { rotulo: 'Documentação disponível', valor: 'Publicação parcial: metodologia completa em elaboração' }
    ]
  }
]

export const sistemaPorId = (id) => SISTEMAS.find(s => s.id === id)
export const orgaoPorId = (id) => ORGAOS.find(o => o.id === id)

// ------------------------------------------------------------
// Solicitações de auditoria
// ------------------------------------------------------------
export const SOLICITACOES_INICIAIS = [
  {
    id: 'SOL-2026-0031',
    sistemaId: 'saude-priorizacao',
    cidadao: 'Mariana Ribeiro',
    email: 'mariana.ribeiro@email.com',
    justificativa: 'Solicito auditoria porque moradores do bairro São Jorge relatam esperas muito maiores que as de bairros centrais para exames, mesmo com quadros clínicos semelhantes.',
    descricaoProblema: 'Entre julho e outubro, seis familiares e vizinhos com prioridade clínica agendada aguardaram acima de 90 dias, enquanto casos menos graves de outras regiões foram agendados em menos de 30 dias.',
    data: '2026-11-12',
    status: 'aprovada',
    historico: [
      { data: '2026-11-12 09:40', acao: 'Solicitação registrada pelo cidadão.', usuario: 'Mariana Ribeiro' },
      { data: '2026-11-14 15:10', acao: 'Solicitação aprovada pela equipe administrativa. Auditoria instaurada (AUD-2026-0014).', usuario: 'Equipe administrativa' }
    ],
    decisao: {
      tipo: 'aprovada',
      justificativa: 'O relato apresenta indícios consistentes de possível diferença de tratamento por território. A solicitação cumpre os requisitos e foi encaminhada para auditoria institucional.'
    }
  },
  {
    id: 'SOL-2026-0034',
    sistemaId: 'edu-vagas',
    cidadao: 'Mariana Ribeiro',
    email: 'mariana.ribeiro@email.com',
    justificativa: 'A distribuição de vagas parece ignorar o critério de proximidade para estudantes do distrito de Penha, alocando a maioria em unidades a mais de 6 km.',
    descricaoProblema: 'Doze famílias do distrito relataram alocação em escolas distantes apesar de haver vagas em unidades próximas no mesmo período.',
    data: '2026-11-18',
    status: 'pendente',
    historico: [
      { data: '2026-11-18 08:05', acao: 'Solicitação registrada pelo cidadão.', usuario: 'Mariana Ribeiro' },
      { data: '2026-11-19 10:22', acao: 'Solicitação em análise pela equipe administrativa.', usuario: 'Sistema' }
    ],
    decisao: null
  },
  {
    id: 'SOL-2026-0028',
    sistemaId: 'social-beneficios',
    cidadao: 'Mariana Ribeiro',
    email: 'mariana.ribeiro@email.com',
    justificativa: 'Gostaria de compreender por que solicitações de auxílio eventual do meu território são classificadas como de baixa complexidade sem vistoria social.',
    descricaoProblema: 'Solicitações semelhantes recebem classificações distintas sem explicação pública dos critérios aplicados.',
    data: '2026-11-05',
    status: 'rejeitada',
    historico: [
      { data: '2026-11-05 14:30', acao: 'Solicitação registrada pelo cidadão.', usuario: 'Mariana Ribeiro' },
      { data: '2026-11-08 11:15', acao: 'Solicitação rejeitada pela equipe administrativa.', usuario: 'Equipe administrativa' }
    ],
    decisao: {
      tipo: 'rejeitada',
      justificativa: 'O sistema já possui auditoria institucional em andamento (AUD-2026-0011) sobre os mesmos critérios. Recomenda-se acompanhar o relatório resultante, que será publicado quando autorizado.'
    }
  }
]

// ------------------------------------------------------------
// Auditorias
// ------------------------------------------------------------
export const AUDITORIAS_INICIAIS = [
  {
    id: 'AUD-2026-0014',
    sistemaId: 'saude-priorizacao',
    origem: 'Solicitação cidadã (SOL-2026-0031)',
    responsavel: 'Dra. Helena Vasconcelos',
    validador: '—',
    status: 'em_andamento',
    etapa: 4,
    dataInicio: '2026-11-15',
    grupos: [
      { nome: 'Grupo A', criterio: 'Territórios centrais', total: 100, positivos: 80 },
      { nome: 'Grupo B', criterio: 'Territórios periféricos', total: 100, positivos: 40 }
    ],
    participanteCount: 5
  },
  {
    id: 'AUD-2026-0011',
    sistemaId: 'social-beneficios',
    origem: 'Institucional (planejamento 2026)',
    responsavel: 'Dra. Helena Vasconcelos',
    validador: '—',
    status: 'em_andamento',
    etapa: 2,
    dataInicio: '2026-10-20',
    grupos: [
      { nome: 'Grupo A', criterio: 'Domicílios com vistoria social', total: 120, positivos: 86 },
      { nome: 'Grupo B', criterio: 'Domicílios sem vistoria social', total: 90, positivos: 61 }
    ],
    participanteCount: 4
  },
  {
    id: 'AUD-2026-0009',
    sistemaId: 'edu-vagas',
    origem: 'Institucional (auditoria anual)',
    responsavel: 'Aud. Marcos Tavares',
    validador: '—',
    status: 'em_andamento',
    etapa: 6,
    dataInicio: '2026-10-02',
    grupos: [
      { nome: 'Grupo A', criterio: 'Zona urbana consolidada', total: 150, positivos: 112 },
      { nome: 'Grupo B', criterio: 'Distritos periféricos', total: 110, positivos: 71 }
    ],
    participanteCount: 6
  },
  {
    id: 'AUD-2026-0006',
    sistemaId: 'trans-rotas',
    origem: 'Institucional (audiência pública)',
    responsavel: 'Aud. Marcos Tavares',
    validador: 'Dra. Helena Vasconcelos',
    status: 'aguardando_validacao',
    etapa: 8,
    dataInicio: '2026-09-14',
    grupos: [
      { nome: 'Grupo A', criterio: 'Bairros atendidos por corredores', total: 200, positivos: 158 },
      { nome: 'Grupo B', criterio: 'Bairros atendidos apenas por linhas troncais', total: 160, positivos: 98 }
    ],
    participanteCount: 5
  },
  {
    id: 'AUD-2026-0002',
    sistemaId: 'seg-analise',
    origem: 'Institucional (planejamento 2025)',
    responsavel: 'Aud. Marcos Tavares',
    validador: 'Dra. Helena Vasconcelos',
    status: 'validado',
    etapa: 9,
    dataInicio: '2026-08-01',
    grupos: [
      { nome: 'Grupo A', criterio: 'Regiões com maior densidade', total: 180, positivos: 132 },
      { nome: 'Grupo B', criterio: 'Regiões de menor densidade', total: 180, positivos: 121 }
    ],
    participanteCount: 7
  }
]

// ------------------------------------------------------------
// Relatórios publicados
// ------------------------------------------------------------
export const RELATORIOS = [
  {
    id: 'REL-2026-003',
    titulo: 'Auditoria do Sistema de Otimização de Rotas de Transporte Público',
    sistemaId: 'trans-rotas',
    orgaoId: 'sec-trans',
    area: 'Mobilidade Urbana',
    dataPublicacao: '2026-10-30',
    versao: 'v1.2 (vigente)',
    auditor: 'Aud. Marcos Tavares',
    validador: 'Dra. Helena Vasconcelos',
    resumo: 'A auditoria identificou variações relevantes de cobertura entre bairros atendidos por corredores e bairros atendidos apenas por linhas troncais. Não há evidência de intencionalidade, mas recomenda-se transparência sobre os critérios de redesenho e acompanhamento das áreas com menor cobertura.'
  },
  {
    id: 'REL-2026-002',
    titulo: 'Auditoria do Sistema de Apoio à Distribuição de Vagas Escolares',
    sistemaId: 'edu-vagas',
    orgaoId: 'sec-edu',
    area: 'Educação',
    dataPublicacao: '2026-09-12',
    versao: 'v2.0 (vigente)',
    auditor: 'Aud. Marcos Tavares',
    validador: 'Dra. Helena Vasconcelos',
    resumo: 'O relatório indica que o critério de proximidade apresentou desempenho desigual entre zonas da rede. A diferença observada não comprova irregularidade, porém motivou recomendações de ajuste na documentação pública dos critérios e no acompanhamento dos distritos periféricos.'
  }
]

// ------------------------------------------------------------
// Histórico de atividades
// ------------------------------------------------------------
export const ATIVIDADES = [
  { id: 41, usuario: 'Equipe administrativa', papel: 'Administrador', acao: 'Aprovou solicitação de auditoria', entidade: 'SOL-2026-0031', data: '2026-11-14 15:10', descricao: 'Solicitação do cidadão sobre o Sistema de Priorização de Atendimento em Saúde aprovada; auditoria AUD-2026-0014 instaurada.' },
  { id: 40, usuario: 'Dra. Helena Vasconcelos', papel: 'Auditora responsável', acao: 'Importou conjunto de dados', entidade: 'AUD-2026-0014', data: '2026-11-16 10:03', descricao: 'Conjunto de dados "Amostra de encaminhamentos — 4º trimestre" importado com verificação concluída (12 avisos, sem erros bloqueantes).' },
  { id: 39, usuario: 'Dra. Helena Vasconcelos', papel: 'Auditora responsável', acao: 'Calculou indicadores', entidade: 'AUD-2026-0014', data: '2026-11-17 16:48', descricao: 'Indicadores de taxa de resultados positivos calculados para dois grupos territoriais (diferença de 40 pontos percentuais).' },
  { id: 38, usuario: 'Aud. Marcos Tavares', papel: 'Auditor responsável', acao: 'Registrou interpretação', entidade: 'AUD-2026-0009', data: '2026-11-18 09:27', descricao: 'Interpretação registrada associando a diferença entre grupos à análise contextual de oferta de vagas por região.' },
  { id: 37, usuario: 'Dra. Helena Vasconcelos', papel: 'Auditora validadora', acao: 'Aprovou validação técnica', entidade: 'REL-2026-002', data: '2026-11-19 14:11', descricao: 'Relatório do Sistema de Apoio à Distribuição de Vagas Escolares validado tecnicamente e enviado para autorização administrativa.' },
  { id: 36, usuario: 'Equipe administrativa', papel: 'Administrador', acao: 'Autorizou publicação', entidade: 'REL-2026-002', data: '2026-11-20 09:05', descricao: 'Publicação do relatório REL-2026-002 autorizada após validação técnica e cumprimento das três etapas obrigatórias.' },
  { id: 35, usuario: 'Equipe administrativa', papel: 'Administrador', acao: 'Rejeitou solicitação de auditoria', entidade: 'SOL-2026-0028', data: '2026-11-08 11:15', descricao: 'Solicitação rejeitada por existir auditoria institucional em andamento sobre os mesmos critérios.' }
]

export const RELATORIO_TEXTO = {
  identificacao: {
    titulo: 'Auditoria do Sistema de Priorização de Atendimento em Saúde',
    sistema: 'Sistema de Priorização de Atendimento em Saúde',
    orgao: 'Secretaria Municipal de Saúde',
    auditoria: 'AUD-2026-0014',
    solicitacao: 'SOL-2026-0031',
    origem: 'Solicitação de cidadã (SOL-2026-0031)',
    responsavel: 'Dra. Helena Vasconcelos',
    validador: 'Aud. Marcos Tavares',
    periodo: '1º de julho a 31 de outubro de 2026',
    versao: 'v1.0'
  },
  objetivos: 'Verificar, por meio de amostra de solicitações de exames e consultas especializadas, se o processo de priorização produz resultados distintos entre territórios centrais e periféricos do município, e documentar as condições em que eventuais diferenças se manifestam.',
  metodologia: 'A auditoria analisou amostra de 200 solicitações do período de referência, divididas em dois grupos territoriais. Para cada grupo foi calculada a taxa de resultados positivos (solicitações encaminhadas a agendamento em até 30 dias). Os indicadores foram confrontados com a documentação oficial do sistema e com entrevistas com a comissão de regulação. A auditoria não reprocessou o modelo do sistema: avaliou os resultados do processo instituído.',
  dadosUtilizados: [
    'Amostra anonimizada de 200 solicitações de procedimentos (exportação da regulação).',
    'Classificação de risco registrada pelos profissionais solicitantes.',
    'Relação de agendamentos efetivados no período.',
    'Documentação técnica divulgada sobre o sistema.'
  ],
  indicadores: [
    { grupo: 'Territórios centrais (Grupo A)', total: 100, positivos: 80, taxa: 80, formula: 'Resultados positivos ÷ Total de casos do grupo × 100', denominador: '100 solicitações da amostra do grupo A' },
    { grupo: 'Territórios periféricos (Grupo B)', total: 100, positivos: 40, taxa: 40, formula: 'Resultados positivos ÷ Total de casos do grupo × 100', denominador: '100 solicitações da amostra do grupo B' }
  ],
  comparacoes: {
    diferenca: 40,
    razao: '2,0',
    descricao: 'A diferença entre as taxas dos dois grupos foi de 40 pontos percentuais; a taxa do grupo A equivale a 2,0 vezes a taxa do grupo B.'
  },
  limitacoes: [
    'A amostra não é censitária: os resultados descrevem o período e os casos analisados.',
    'Parte das solicitações continha campos clínicos incompletos, limitando o controle de gravidade.',
    'Variáveis de contexto territorial (distância às unidades, oferta de serviços) não integraram a análise.',
    'A auditoria não avaliou o código do sistema, apenas os resultados do processo.'
  ],
  evidencias: [
    'Planilha de amostra anonimizada (200 registros).',
    'Registro de entrevista com a comissão de regulação (ata simplificada).',
    'Documento de pontuação divulgado pelo órgão.',
    'Painel de indicadores gerado na plataforma durante a auditoria.'
  ],
  interpretacao: 'A diferença de 40 pontos percentuais entre os grupos é relevante e merece atenção. Contudo, diferenças entre grupos não comprovam, isoladamente, discriminação ou ilegalidade. Os resultados podem refletir múltiplos fatores: distribuição da oferta de serviços entre territórios, qualidade dos registros clínicos e critérios operacionais de agenda. A interpretação definitiva é responsabilidade dos auditores e, neste relatório, foi construída com base nas evidências disponíveis e no contexto institucional.',
  conclusoes: 'O processo de priorização produziu, no período analisado, resultados quantitativamente distintos entre os grupos territoriais examinados. As causas não foram determinadas nesta auditoria, que recomenda aprofundamento e medidas de transparência.',
  recomendacoes: [
    'Publicar com mais detalhe a pontuação aplicada e os exemplos de cálculo.',
    'Acompanhar durante 6 meses os territórios com menor taxa de encaminhamento.',
    'Padronizar o registro dos campos clínicos usados na priorização.',
    'Submeter os resultados a deliberação da comissão de regulação.'
  ],
  versoes: [
    { versao: 'v1.0', data: '2026-11-25', descricao: 'Primeira versão concluída pela auditoria responsável.', autor: 'Dra. Helena Vasconcelos' }
  ],
  aviso: 'As diferenças observadas entre grupos não constituem, por si sós, comprovação de discriminação ou ilegalidade. A leitura dos resultados depende de análise humana e contextual, conduzida pelas pessoas responsáveis pela auditoria.'
}

// ------------------------------------------------------------
// Usuários e perfis
// ------------------------------------------------------------
export const PERFIS = {
  cidadao: { rotulo: 'Cidadã(o)', nome: 'Mariana Ribeiro', email: 'mariana.ribeiro@email.com', cargo: 'Participante cidadã' },
  auditor: { rotulo: 'Auditor(a)', nome: 'Dra. Helena Vasconcelos', email: 'helena.vasconcelos@govlens.org', cargo: 'Auditora responsável e validadora' },
  admin: { rotulo: 'Administrador(a)', nome: 'Equipe administrativa GovLens', email: 'admin@govlens.org', cargo: 'Gestão da plataforma' }
}

export const NOTIFICACOES_INICIAIS = [
  { id: 1, texto: 'Sua solicitação SOL-2026-0031 foi aprovada e originou a auditoria AUD-2026-0014.', data: '2026-11-14', lida: false },
  { id: 2, texto: 'Novo relatório publicado: REL-2026-003 — Auditoria do Sistema de Otimização de Rotas.', data: '2026-10-30', lida: false },
  { id: 3, texto: 'A auditoria AUD-2026-0006 está aguardando validação técnica.', data: '2026-11-10', lida: true }
]
