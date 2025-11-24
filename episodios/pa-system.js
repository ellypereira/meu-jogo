// ========================
// CONFIGURAÇÃO DO SISTEMA
// ========================
const DAILY_PA = 15;   // PA que o jogador ganha todo dia
const AD_PA = 10;      // PA ganho por anúncio assistido
const STORAGE_KEY = "bs_pa_data_v1";

// Estado em memória
let paState = {
  pa: DAILY_PA,
  lastDate: null
};

// ========================
// FUNÇÕES DE PERSISTÊNCIA
// ========================
function getTodayString() {
  const hoje = new Date();
  return hoje.toISOString().slice(0, 10); // "YYYY-MM-DD"
}

function loadPAState() {
  const saved = localStorage.getItem(STORAGE_KEY);
  const today = getTodayString();

  if (saved) {
    try {
      const data = JSON.parse(saved);

      // Se for um dia novo, reseta os PA para o valor diário
      if (data.lastDate !== today) {
        paState = {
          pa: DAILY_PA,
          lastDate: today
        };
      } else {
        // Mesmo dia, continua de onde parou
        paState = {
          pa: typeof data.pa === "number" ? data.pa : DAILY_PA,
          lastDate: data.lastDate || today
        };
      }
    } catch (e) {
      // Se der erro ao ler, começa do zero nesse dia
      paState = {
        pa: DAILY_PA,
        lastDate: today
      };
    }
  } else {
    // Primeira vez jogando
    paState = {
      pa: DAILY_PA,
      lastDate: today
    };
  }

  updatePAHUD();
  savePAState();
}

function savePAState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(paState));
}

// ========================
// ATUALIZAÇÃO DA HUD
// ========================
function updatePAHUD() {
  const spanPA = document.getElementById("pa-valor");
  if (spanPA) {
    spanPA.textContent = paState.pa;
  }
}

// ========================
// GASTAR E GANHAR PA
// ========================
function tentarGastarPA(qtd) {
  if (paState.pa >= qtd) {
    paState.pa -= qtd;
    savePAState();
    updatePAHUD();
    return true;
  } else {
    alert("Você ficou sem PA por hoje! Volte amanhã ou assista um anúncio para ganhar mais.");
    return false;
  }
}

// Chame isso quando o anúncio terminar com sucesso
function ganharPAComAnuncio() {
  paState.pa += AD_PA;
  savePAState();
  updatePAHUD();
  alert(`Você ganhou +${AD_PA} PA!`);
}

// ========================
// INICIALIZAÇÃO
// ========================
window.addEventListener("load", () => {
  loadPAState();

  const btnAnuncio = document.getElementById("btn-anuncio");
  if (btnAnuncio) {
    btnAnuncio.addEventListener("click", () => {
      // Aqui, no futuro, você integra com a plataforma de anúncios.
      // Quando o anúncio terminar, chama ganharPAComAnuncio().
      // Por enquanto vamos simular:
      const confirmar = confirm("Simular anúncio assistido?\n(Aqui entraria o vídeo de anúncio de verdade)");
      if (confirmar) {
        ganharPAComAnuncio();
      }
    });
  }
});
