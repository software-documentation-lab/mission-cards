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

const MAX_TEAMS = missions.length;
const missionContainer = document.getElementById("missions-grid");
const teamsInput = document.getElementById("teams-input");
const generateBtn = document.getElementById("generate-btn");
const reshuffleBtn = document.getElementById("reshuffle-btn");
const copyBtn = document.getElementById("copy-btn");
const clearBtn = document.getElementById("clear-btn");
const assignmentStatus = document.getElementById("assignment-status");
const assignmentResult = document.getElementById("assignment-result");

let cachedTeams = [];
let lastDistributionText = "";

renderMissionCards();
setupDistributionGenerator();
initVisualEffects();

function renderMissionCards() {
  if (!missionContainer) return;

  const cards = missions
    .map((mission, index) => {
      const items = mission.entregaveis.map((item) => `<li>${item}</li>`).join("");

      return `
        <article class="mission-card reveal tilt-card" data-delay="${220 + index * 40}">
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

  missionContainer.innerHTML = cards;
}

function setupDistributionGenerator() {
  if (!teamsInput || !generateBtn || !reshuffleBtn || !copyBtn || !clearBtn) return;

  generateBtn.addEventListener("click", () => {
    const parsed = parseTeamsInput(teamsInput.value);

    if (parsed.rawTeams.length === 0) {
      setStatus("Informe pelo menos 1 equipe para gerar a distribuição.", "error");
      resetDistributionResult();
      return;
    }

    if (parsed.uniqueTeams.length > MAX_TEAMS) {
      setStatus(`Limite excedido: informe no máximo ${MAX_TEAMS} equipes.`, "error");
      resetDistributionResult();
      return;
    }

    const distribution = distributeTeams(parsed.uniqueTeams);
    renderDistribution(distribution.assignments, distribution.unassigned);

    cachedTeams = [...parsed.uniqueTeams];
    lastDistributionText = formatDistributionText(distribution.assignments, distribution.unassigned);
    reshuffleBtn.disabled = false;
    copyBtn.disabled = false;

    if (parsed.duplicates.length > 0) {
      setStatus(
        `Distribuição gerada com ${parsed.uniqueTeams.length} equipe(s). ${parsed.duplicates.length} nome(s) duplicado(s) foi(ram) ignorado(s).`,
        "warning"
      );
      return;
    }

    setStatus(`Distribuição gerada com sucesso para ${parsed.uniqueTeams.length} equipe(s).`, "success");
  });

  reshuffleBtn.addEventListener("click", () => {
    if (cachedTeams.length === 0) {
      setStatus("Gere uma distribuição inicial antes de usar 'Gerar novamente'.", "error");
      return;
    }

    const distribution = distributeTeams(cachedTeams);
    renderDistribution(distribution.assignments, distribution.unassigned);
    lastDistributionText = formatDistributionText(distribution.assignments, distribution.unassigned);
    setStatus("Nova distribuição gerada com a mesma lista de equipes.", "success");
  });

  clearBtn.addEventListener("click", () => {
    teamsInput.value = "";
    cachedTeams = [];
    lastDistributionText = "";
    reshuffleBtn.disabled = true;
    copyBtn.disabled = true;
    resetDistributionResult();
    setStatus('Preencha os nomes e clique em "Gerar distribuição".', "info");
  });

  copyBtn.addEventListener("click", async () => {
    if (!lastDistributionText) {
      setStatus("Gere uma distribuição antes de copiar o resultado.", "error");
      return;
    }

    try {
      await copyToClipboard(lastDistributionText);
      setStatus("Resultado copiado para a área de transferência.", "success");
    } catch (error) {
      setStatus("Não foi possível copiar automaticamente. Tente novamente.", "error");
    }
  });
}

function parseTeamsInput(rawValue) {
  const rawTeams = rawValue
    .split(/\r?\n/)
    .map((line) => line.trim().replace(/\s+/g, " "))
    .filter(Boolean);

  const uniqueTeams = [];
  const duplicates = [];
  const seen = new Set();

  rawTeams.forEach((team) => {
    const normalized = team.toLocaleLowerCase("pt-BR");
    if (seen.has(normalized)) {
      duplicates.push(team);
      return;
    }

    seen.add(normalized);
    uniqueTeams.push(team);
  });

  return { rawTeams, uniqueTeams, duplicates };
}

function distributeTeams(teams) {
  const shuffledTeams = shuffle([...teams]);
  const shuffledMissions = shuffle([...missions]);

  const assignments = shuffledTeams.map((team, index) => ({
    team,
    mission: shuffledMissions[index],
  }));

  const unassigned = shuffledMissions.slice(shuffledTeams.length);
  return { assignments, unassigned };
}

function renderDistribution(assignments, unassigned) {
  if (!assignmentResult) return;

  assignmentResult.classList.remove("is-empty");

  const assignmentCards = assignments
    .map((entry, index) => {
      const teamName = escapeHtml(entry.team);

      return `
        <article class="assignment-item">
          <h4>${index + 1}. ${teamName}</h4>
          <p class="assignment-meta"><strong>Desafio:</strong> ${entry.mission.empresa}</p>
          <p class="assignment-meta"><strong>Setor:</strong> ${entry.mission.setor}</p>
          <p class="assignment-meta"><strong>Entregável principal:</strong> ${entry.mission.entregaveis[0]}</p>
          <a class="assignment-link" href="${entry.mission.repositorio}" target="_blank" rel="noopener noreferrer">
            Acessar repositório
          </a>
        </article>
      `;
    })
    .join("");

  const unassignedHtml =
    unassigned.length === 0
      ? ""
      : `
        <div class="assignment-unassigned">
          <h4>Desafios sem equipe nesta rodada</h4>
          <ul>
            ${unassigned.map((mission) => `<li>${mission.empresa}</li>`).join("")}
          </ul>
        </div>
      `;

  assignmentResult.innerHTML = `
    <p class="result-summary">
      <strong>${assignments.length}</strong> equipe(s) distribuída(s) em <strong>${missions.length}</strong> desafios.
    </p>
    <div class="assignment-result-grid">${assignmentCards}</div>
    ${unassignedHtml}
  `;
}

function resetDistributionResult() {
  if (!assignmentResult) return;

  assignmentResult.classList.add("is-empty");
  assignmentResult.innerHTML = `
    <p class="empty-result">
      O resultado aparecerá aqui com equipe, desafio e link do repositório.
    </p>
  `;
  copyBtn.disabled = true;
  reshuffleBtn.disabled = true;
}

function formatDistributionText(assignments, unassigned) {
  const lines = [];
  lines.push("Distribuição de equipes - Desafio de Consultoria");
  lines.push(`Gerado em: ${new Date().toLocaleString("pt-BR")}`);
  lines.push("");

  assignments.forEach((entry, index) => {
    lines.push(
      `${index + 1}. ${entry.team} -> ${entry.mission.empresa} (${entry.mission.repositorio})`
    );
  });

  if (unassigned.length > 0) {
    lines.push("");
    lines.push("Desafios sem equipe nesta rodada:");
    unassigned.forEach((mission) => lines.push(`- ${mission.empresa}`));
  }

  return lines.join("\n");
}

function setStatus(message, type = "info") {
  if (!assignmentStatus) return;
  assignmentStatus.textContent = message;
  assignmentStatus.dataset.type = type;
}

async function copyToClipboard(text) {
  if (navigator.clipboard && window.isSecureContext) {
    await navigator.clipboard.writeText(text);
    return;
  }

  const textArea = document.createElement("textarea");
  textArea.value = text;
  textArea.style.position = "fixed";
  textArea.style.left = "-9999px";
  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();

  const copied = document.execCommand("copy");
  document.body.removeChild(textArea);

  if (!copied) {
    throw new Error("Falha ao copiar texto");
  }
}

function shuffle(items) {
  for (let i = items.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [items[i], items[j]] = [items[j], items[i]];
  }

  return items;
}

function escapeHtml(value) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function initVisualEffects() {
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (!reducedMotion) {
    initRevealAnimation();
    initTiltEffect();
  } else {
    document.querySelectorAll(".reveal").forEach((element) => element.classList.add("is-visible"));
  }
}

function initRevealAnimation() {
  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        const delay = Number(entry.target.dataset.delay || 0);
        setTimeout(() => {
          entry.target.classList.add("is-visible");
        }, delay);

        obs.unobserve(entry.target);
      });
    },
    { threshold: 0.15 }
  );

  document.querySelectorAll(".reveal").forEach((element) => observer.observe(element));
}

function initTiltEffect() {
  const tiltTargets = document.querySelectorAll(".tilt-card");

  tiltTargets.forEach((card) => {
    card.addEventListener("mousemove", (event) => {
      const rect = card.getBoundingClientRect();
      const relativeX = (event.clientX - rect.left) / rect.width;
      const relativeY = (event.clientY - rect.top) / rect.height;
      const rotateY = (relativeX - 0.5) * 8;
      const rotateX = (0.5 - relativeY) * 8;

      card.style.transform = `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });

    card.addEventListener("mouseleave", () => {
      card.style.transform = "perspective(900px) rotateX(0deg) rotateY(0deg)";
    });
  });
}
