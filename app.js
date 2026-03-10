const missions = [
  {
    empresa: "empresa-finpay",
    setor: "FinTech / Pagamentos",
    contexto:
      "A documentação da API ficou incompleta após expansão para novos meios de pagamento, causando dúvidas de integração.",
    missao:
      "Estruturar uma documentação de API clara, com contratos, autenticação, erros e versionamento.",
    entregaveis: ["docs/api.md", "Estrutura baseada em docs/api-template.md"],
    repositorio: "https://github.com/software-documentation-lab/empresa-finpay",
  },
  {
    empresa: "empresa-logitrack",
    setor: "Logística e Transporte",
    contexto:
      "A empresa opera vários sistemas integrados, mas sem documentação arquitetural consolidada para análise de impacto.",
    missao:
      "Mapear componentes, integrações, fluxos críticos e riscos em uma documentação de arquitetura.",
    entregaveis: ["docs/architecture.md", "Estrutura baseada em docs/architecture-template.md"],
    repositorio: "https://github.com/software-documentation-lab/empresa-logitrack",
  },
  {
    empresa: "empresa-shopeasy",
    setor: "E-commerce",
    contexto:
      "O pipeline de CI/CD evoluiu sem padrão único, gerando incerteza sobre aprovações, gates e rollback.",
    missao:
      "Documentar o fluxo de entrega contínua com etapas, critérios de qualidade e governança.",
    entregaveis: ["docs/pipeline.md", "Estrutura baseada em docs/pipeline-template.md"],
    repositorio: "https://github.com/software-documentation-lab/empresa-shopeasy",
  },
  {
    empresa: "empresa-cloudhealth",
    setor: "HealthTech",
    contexto:
      "Ambientes críticos em nuvem cresceram sem documentação de infraestrutura suficiente para operação e conformidade.",
    missao:
      "Documentar topologia, segurança, observabilidade e continuidade da infraestrutura.",
    entregaveis: ["docs/infrastructure.md", "Estrutura baseada em docs/infrastructure-template.md"],
    repositorio: "https://github.com/software-documentation-lab/empresa-cloudhealth",
  },
  {
    empresa: "empresa-datainsight",
    setor: "Analytics / BI",
    contexto:
      "A modelagem do banco se tornou difícil de entender, afetando governança, consistência e consumo analítico.",
    missao:
      "Organizar a documentação de entidades, relacionamentos, regras e dicionário de dados.",
    entregaveis: ["docs/database-model.md", "Estrutura baseada em docs/database-model-template.md"],
    repositorio: "https://github.com/software-documentation-lab/empresa-datainsight",
  },
  {
    empresa: "empresa-streamflow",
    setor: "Streaming",
    contexto:
      "Incidentes operacionais são tratados de forma inconsistente por ausência de runbook oficial.",
    missao:
      "Criar um runbook operacional com severidade, diagnóstico, mitigação e pós-incidente.",
    entregaveis: ["docs/runbook.md", "Estrutura baseada em docs/runbook-template.md"],
    repositorio: "https://github.com/software-documentation-lab/empresa-streamflow",
  },
  {
    empresa: "empresa-devtoolspro",
    setor: "Ferramentas para Desenvolvedores",
    contexto:
      "O README técnico principal não acompanha a evolução do produto e prejudica onboarding e suporte.",
    missao:
      "Produzir um README técnico completo para uso por engenharia, QA e operações.",
    entregaveis: ["docs/readme.md", "Estrutura baseada em docs/readme-template.md"],
    repositorio: "https://github.com/software-documentation-lab/empresa-devtoolspro",
  },
  {
    empresa: "empresa-greenenergy",
    setor: "Energia Renovável",
    contexto:
      "Decisões arquiteturais relevantes foram tomadas sem registro formal, reduzindo rastreabilidade.",
    missao:
      "Registrar decisão técnica no formato ADR com contexto, alternativas, decisão e consequências.",
    entregaveis: ["docs/adr-001.md", "Estrutura baseada em docs/adr-template.md"],
    repositorio: "https://github.com/software-documentation-lab/empresa-greenenergy",
  },
];

const container = document.getElementById("missions-grid");

const cards = missions
  .map((mission, index) => {
    const items = mission.entregaveis.map((item) => `<li>${item}</li>`).join("");

    return `
      <article class="mission-card" style="--delay: ${index * 70}ms">
        <header class="card-head">
          <h3 class="company">${mission.empresa}</h3>
          <p class="sector">${mission.setor}</p>
        </header>

        <p class="card-text"><strong>Contexto:</strong> ${mission.contexto}</p>
        <p class="card-text"><strong>Missão do grupo:</strong> ${mission.missao}</p>

        <p class="topic"><strong>Entregáveis</strong></p>
        <ul class="deliverables">${items}</ul>

        <a class="card-link" href="${mission.repositorio}" target="_blank" rel="noopener noreferrer">
          Acessar repositório
        </a>
      </article>
    `;
  })
  .join("");

container.innerHTML = cards;
