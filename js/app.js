// js/app.js — carrossel, lista/grade, detalhe e reviews (um único arquivo)

// =====================
// 1) DADOS
// =====================
const dados = {
  series: [
    {
      id: "black-sails",
      titulo: "Black Sails",
      ano: 2014,
      generos: ["Ação", "Aventura", "Drama"],
      nota: 8,
      descricao: "Pirataria e política nas Bahamas de 1715.",
      sinopse:
        "Uma prequela moderna de *A Ilha do Tesouro*, *Black Sails* mergulha no auge da era dourada da pirataria. O Capitão Flint e sua tripulação navegam em busca de sobrevivência e poder nas Bahamas do século XVIII, onde cada decisão é uma jogada política.\n\nA série vai além da aventura: mostra as engrenagens econômicas e morais por trás do mito dos piratas. Traições, alianças frágeis e disputas ideológicas tornam o mar tão perigoso quanto os homens que o cruzam.\n\nCom produção impecável e personagens complexos, *Black Sails* mistura realismo histórico e drama humano. É uma narrativa sobre liberdade, ganância e o preço de desafiar o império.",
      plataformas: ["StarzPlay", "Prime Video (canal)"],
      capa: "public/Imagens/Series/Black-Sails/Capa.jpg"
    },
    {
      id: "the-newsroom",
      titulo: "The Newsroom",
      ano: 2012,
      generos: ["Drama"],
      nota: 9,
      descricao: "Bastidores de um telejornal focado em ética.",
      sinopse:
        "No comando de um telejornal em declínio, o âncora Will McAvoy decide romper com o sensacionalismo e recuperar a ética no jornalismo. Essa escolha o coloca em confronto direto com a audiência, os executivos e até sua própria equipe.\n\nCriada por Aaron Sorkin (*The West Wing*), a série transforma redações em campos de batalha de ideias. Cada episódio revisita eventos reais, mostrando como o noticiário molda — e é moldado — pela sociedade.\n\n*The Newsroom* é uma reflexão sobre coragem, verdade e responsabilidade em tempos de ruído. Um retrato idealista, mas necessário, do que o jornalismo poderia ser.",
      plataformas: ["HBO Max"],
      capa: "public/Imagens/Series/The-Newsroom/Capa-The-Newsroom.jpg"
    },
    {
      id: "power",
      titulo: "Power",
      ano: 2014,
      generos: ["Drama", "Crime"],
      nota: 9,
      descricao: "A vida dupla de Ghost entre crime e negócios.",
      sinopse:
        "James “Ghost” St. Patrick é um empresário de sucesso que leva uma vida dupla: dono de uma boate luxuosa e chefe de uma rede de tráfico em Nova York. Sua tentativa de abandonar o crime o coloca entre a lei, o amor e o perigo.\n\nMais que uma história de ascensão e queda, *Power* é sobre identidade e escolhas. Ghost tenta equilibrar o homem que é com o homem que gostaria de ser — e descobre que o passado não se apaga.\n\nCom ritmo intenso e personagens marcantes, a série combina drama criminal e tragédia pessoal, explorando o custo real do poder.",
      plataformas: ["StarzPlay"],
      capa: "public/Imagens/Series/Power/Capa-Power.jpg"
    },
    {
      id: "billions",
      titulo: "Billions",
      ano: 2016,
      generos: ["Drama"],
      nota: 10,
      descricao: "Poder e ambição no mercado financeiro.",
      sinopse:
        "Na arena do mercado financeiro, o promotor Chuck Rhoades e o bilionário Bobby Axelrod duelam com inteligência e ego. O jogo é psicológico, legal e moral — e ninguém sai limpo.\n\nA série é um estudo de poder: de como ambição, lealdade e vingança se misturam nos bastidores de Wall Street. Cada temporada eleva a tensão com novos aliados, traições e golpes de mestre.\n\nCom diálogos afiados e atuações brilhantes, *Billions* é um thriller corporativo que mostra o capitalismo como ele é — movido por vaidade, estratégia e uma busca incessante por controle.",
      plataformas: ["Paramount+", "Globoplay (canais)"],
      capa: "public/Imagens/Series/Billions/Capa-Billions.jpg"
    },
    {
      id: "lioness",
      titulo: "Special Ops: Lioness",
      ano: 2023,
      generos: ["Suspense", "Ação"],
      nota: 9,
      descricao: "Agentes infiltradas e dilemas morais.",
      sinopse:
        "Inspirada em programas reais da CIA, *Lioness* acompanha agentes infiltradas que vivem entre a lealdade e a moralidade. Joe, a líder da operação, precisa treinar e proteger jovens mulheres enviadas para o coração do inimigo.\n\nA série explora a linha tênue entre sacrifício e obediência. Cada missão é um teste psicológico — e cada decisão tem consequências devastadoras.\n\nCom produção de Taylor Sheridan (*Yellowstone*), *Lioness* combina ação e introspecção, revelando o peso invisível de quem serve nas sombras.",
      plataformas: ["Paramount+"],
      capa: "public/Imagens/Series/Lioness/Capa-Lioness.jpg"
    }
  ]
};

// =====================
// 2) HELPERS
// =====================
const $  = (sel) => document.querySelector(sel);
const $$ = (sel) => document.querySelectorAll(sel);

const pill = (t) =>
  `<span class="badge bg-light text-dark border me-1 mb-1">${t}</span>`;

function getQuery(param) {
  const p = new URLSearchParams(location.search);
  return p.get(param);
}

// =====================
// 3) RENDER: CARROSSEL (TOPO)
//     - Suporta um <div id="carouselDestaqueWrap"></div> (injeta o carrossel completo)
//     - Ou um carrossel Bootstrap já existente com <div id="carouselDestaque"><div class="carousel-inner"></div></div>
// =====================
function renderCarrosselDestaque() {
  const wrap = $("#carouselDestaqueWrap");
  const bootstrapInner = $("#carouselDestaque .carousel-inner");
  const itens = dados.series || [];

  if (!itens.length) {
    if (wrap) wrap.innerHTML = `<div class="alert alert-secondary">Sem itens para exibir.</div>`;
    if (bootstrapInner) bootstrapInner.innerHTML = "";
    return;
  }

  // (A) Injeta carrossel completo no wrap
  if (wrap) {
    const id = "carouselDestaques";
    const indicators = itens
      .map(
        (_, i) =>
          `<button type="button" data-bs-target="#${id}" data-bs-slide-to="${i}" ${
            i === 0 ? 'class="active" aria-current="true"' : ""
          } aria-label="Slide ${i + 1}"></button>`
      )
      .join("");

    const slides = itens
      .map(
        (s, i) => `
        <div class="carousel-item ${i === 0 ? "active" : ""}" data-bs-interval="5000">
          <a href="detalhe.html?id=${encodeURIComponent(s.id)}" class="d-block" aria-label="Ver detalhes de ${s.titulo}">
            <img src="${s.capa}" class="d-block w-100" alt="Capa de ${s.titulo}" loading="lazy" style="object-fit:cover;aspect-ratio:16/9;">
            <span class="visually-hidden">Ver detalhes de ${s.titulo}</span>
          </a>
        </div>`
      )
      .join("");

    wrap.innerHTML = `
      <div id="${id}" class="carousel slide shadow rounded-4 overflow-hidden" data-bs-ride="carousel" aria-label="Destaques">
        <div class="carousel-indicators">${indicators}</div>
        <div class="carousel-inner">${slides}</div>
        <button class="carousel-control-prev" type="button" data-bs-target="#${id}" data-bs-slide="prev" aria-label="Anterior">
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        </button>
        <button class="carousel-control-next" type="button" data-bs-target="#${id}" data-bs-slide="next" aria-label="Próximo">
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
        </button>
      </div>
    `;
  }

  // (B) Preenche somente a .carousel-inner de um carrossel já existente no HTML
  if (bootstrapInner) {
    bootstrapInner.innerHTML = itens
      .map(
        (s, i) => `
        <div class="carousel-item ${i === 0 ? "active" : ""}">
          <a href="detalhe.html?id=${encodeURIComponent(s.id)}">
            <img src="${s.capa}" class="d-block w-100" alt="Capa de ${s.titulo}">
          </a>
        </div>`
      )
      .join("");
  }
}

// =====================
// 4) RENDER: “DE OLHO NA CENA” (LISTA OU CARDS)
//     - Lista: <div id="listSeries"></div>
//     - Grid antigo/fallback: <div id="listaSeries"></div>
// =====================
function renderListOuCards() {
  const list = $("#listSeries");
  const grid = $("#listaSeries");
  const series = dados.series || [];

  if (!series.length) {
    if (list) list.innerHTML = `<p class="text-center text-muted">Nenhuma série cadastrada.</p>`;
    if (grid) grid.innerHTML = `<div class="col-12 text-center text-muted">Nenhuma série cadastrada.</div>`;
    return;
  }

  // Lista vertical (novo)
  if (list) {
    list.innerHTML = series
      .map((s) => {
        const meta = `${(s.generos || []).slice(0, 2).join(" • ")}${s.ano ? ` • ${s.ano}` : ""}`;
        const desc = s.sinopse || s.descricao || "";
        const plataformas = (s.plataformas || []).slice(0, 3).map((p) => pill(p)).join("");

        return `
          <a class="series-item" href="detalhe.html?id=${encodeURIComponent(s.id)}" aria-label="Ver detalhes de ${s.titulo}">
            <div class="series-thumb">
              <img src="${s.capa}" alt="Capa de ${s.titulo}">
            </div>
            <div class="series-info">
              <h3>${s.titulo}</h3>
              <div class="series-meta">${meta}</div>
              <p class="series-desc line-clamp-2">${desc}</p>
              <div class="series-tags">
                ${s.nota ? pill(`Nota ${s.nota}`) : ""}
                ${plataformas}
              </div>
            </div>
            <i class="bi bi-chevron-right series-chevron" aria-hidden="true"></i>
          </a>
        `;
      })
      .join("");
  }

  // Grid de cards (antigo / fallback)
  if (grid) {
    grid.innerHTML = series
      .map(
        (s) => `
        <div class="col-md-6 col-lg-4 mb-4">
          <div class="card shadow-sm border-0 h-100">
            <a href="detalhe.html?id=${encodeURIComponent(s.id)}">
              <img src="${s.capa}" class="card-img-top" alt="Capa da série ${s.titulo}">
            </a>
            <div class="card-body">
              <h5 class="card-title">${s.titulo}</h5>
              <p class="card-text small text-muted">${(s.generos || []).join(", ")} • ${s.ano || ""}</p>
              <div class="progress" style="height: 6px;">
                <div class="progress-bar bg-brand" role="progressbar" style="width: ${(s.nota || 0) * 10}%"
                     aria-valuenow="${s.nota || 0}" aria-valuemin="0" aria-valuemax="10"></div>
              </div>
              <p class="small mt-2 mb-0">Nota ${s.nota ?? "-"}</p>
            </div>
          </div>
        </div>
      `
      )
      .join("");
  }
}

// =====================
// 5) RENDER: DETALHE
//     - Espera #infoItem e opcionalmente #fotosGrid
// =====================
function renderDetalhe() {
  const info = $("#infoItem");
  const fotosGrid = $("#fotosGrid");
  if (!info && !fotosGrid) return;

  const id = getQuery("id");
  const serieTitulo = getQuery("serie"); // suporte legacy (?serie=Titulo)

  let item = null;
  if (id) {
    item = dados.series.find((s) => String(s.id) === String(id));
  } else if (serieTitulo) {
    item = dados.series.find(
      (s) => (s.titulo || "").toLowerCase() === decodeURIComponent(serieTitulo).toLowerCase()
    );
  }

  if (!item) {
    if (info) info.innerHTML = `<div class="col-12"><div class="alert alert-danger">Série não encontrada.</div></div>`;
    return;
  }

  if (info) {
    const colImg = document.createElement("div");
    colImg.className = "col-12 col-lg-5";
    colImg.innerHTML = `
      <div class="card shadow-sm border-0">
        <div class="ratio ratio-16x9">
          <img src="${item.capa}" alt="Capa de ${item.titulo}">
        </div>
      </div>
    `;

    const colInfo = document.createElement("div");
    colInfo.className = "col-12 col-lg-7";
    colInfo.innerHTML = `
      <h2 class="h4 mb-2">
        ${item.titulo} ${item.ano ? `<span class="text-muted">(${item.ano})</span>` : ""}
      </h2>
      <div class="mb-2">${(item.generos || []).map((g) => pill(g)).join("")}</div>
      ${item.nota ? `<div class="mb-2">${pill(`Nota ${item.nota}`)}</div>` : ""}
      <div class="lead hero-copy" style="white-space:pre-line">${item.sinopse || item.descricao || ""}</div>
      <div class="mt-3">
        <h3 class="h6 mb-1">Onde assistir</h3>
        <p class="mb-0">${(item.plataformas || []).join(" • ") || "—"}</p>
      </div>
      <div class="mt-4">
        <a href="index.html#novidades" class="btn btn-outline-primary">Voltar</a>
      </div>
    `;

    info.replaceChildren(colImg, colInfo);
    document.title = `CenaB — ${item.titulo}`;
  }

  if (fotosGrid) {
    fotosGrid.innerHTML = `<div class="col-12"><div class="alert alert-secondary">Sem fotos adicionais.</div></div>`;
  }
}

// =====================
// 6) RENDER: REVIEWS (YouTube)
//     - Espera #reviewsGrid
// =====================
function renderReviews() {
  const grid = $("#reviewsGrid");
  if (!grid) return;

  const reviews = [
    {
      titulo: "Black Sails — Review",
      genero: "Ação",
      thumb: "https://i.ytimg.com/vi/P5op0PYBlI0/hqdefault.jpg",
      link: "https://youtu.be/P5op0PYBlI0",
      descricao: "Ambientação histórica, pirataria e personagens intensos."
    },
    {
      titulo: "The Newsroom — Review",
      genero: "Drama",
      thumb: "https://i.ytimg.com/vi/QHy-Jg9Y6nM/hqdefault.jpg",
      link: "https://www.youtube.com/watch?v=QHy-Jg9Y6nM",
      descricao: "Jornalismo, ética profissional e bastidores da TV."
    },
    {
      titulo: "Power — Review",
      genero: "Drama",
      thumb: "https://i.ytimg.com/vi/QrwASuv1UrQ/hqdefault.jpg",
      link: "https://www.youtube.com/watch?v=QrwASuv1UrQ",
      descricao: "A vida dupla de James “Ghost” e seus conflitos."
    },
    {
      titulo: "Billions — Review",
      genero: "Drama",
      thumb: "https://i.ytimg.com/vi/fHwP9rU2ke4/hqdefault.jpg",
      link: "https://www.youtube.com/watch?v=fHwP9rU2ke4",
      descricao: "Poder, ambição e ética no mundo financeiro."
    },
    {
      titulo: "Lioness — Review",
      genero: "Suspense",
      thumb: "https://i.ytimg.com/vi/qILXIACAS58/hqdefault.jpg",
      link: "https://www.youtube.com/watch?v=qILXIACAS58",
      descricao: "Espionagem, operações secretas e dilemas morais."
    }
  ];

  grid.innerHTML = reviews
    .map(
      (r) => `
      <div class="col-12 col-sm-6 col-lg-4">
        <article class="review-card card h-100 shadow-sm border-0">
          <div class="ratio ratio-16x9 review-thumb">
            <img src="${r.thumb}" alt="${r.titulo}">
          </div>
          <div class="card-body d-flex flex-column">
            <h3 class="h5 card-title mb-1">${r.titulo}</h3>
            <p class="card-text text-muted flex-grow-1">${r.descricao}</p>
            <div class="d-flex justify-content-between align-items-center pt-2">
              <span class="badge bg-light text-dark border">${r.genero}</span>
              <a class="btn btn-outline-primary btn-sm" href="${r.link}" target="_blank" rel="noopener">
                <i class="bi bi-play-circle me-1"></i>Assistir
              </a>
            </div>
          </div>
        </article>
      </div>
    `
    )
    .join("");
}

// =====================
// 7) INIT
// =====================
function init() {
  renderCarrosselDestaque();
  renderListOuCards();
  renderDetalhe();
  renderReviews();
}
document.addEventListener("DOMContentLoaded", init);
