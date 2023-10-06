<script>
import FooterView from "../components/Footer.vue";
import HeaderView from "../components/Header.vue";
import NotWorkingView from "../components/NotWorking.vue";
import api from "../services/api/index";
import { useGamesStore } from "../stores/games";

export default {
  components: {
    FooterView,
    HeaderView,
    NotWorkingView,
  },
  setup() {
    const storeGames = useGamesStore();
    return {
      storeGames,
    };
  },
  methods: {
    colorClassification(age) {
      if (age < 10) {
        return "bg-success text-white";
      } else if (age < 12) {
        return "bg-primary text-white";
      } else if (age < 14) {
        return "bg-warning";
      } else if (age < 16) {
        return "bg-danger-subtle text-white";
      } else if (age < 18) {
        return "bg-danger text-white";
      } else {
        return "bg-black text-white";
      }

    },
    async viewTester(appid) {
      this.storeGames.game = await api.steam.games.getGame(appid);
      this.$router.push("/Tester");
    },
    
  },
};
</script>

<template>
  <HeaderView />
  <h1 v-if="storeGames.game.length != 0" class="text-center m-3">
    {{ storeGames.game.name }}
  </h1>
  <main v-if="storeGames.game.length != 0">
    <div
      id="carouselExampleIndicators"
      class="carousel slide"
      data-bs-ride="carousel"
    >
      <div class="carousel-indicators">
        <button
          type="button"
          data-bs-target="#carouselExampleIndicators"
          data-bs-slide-to="0"
          class="active"
          aria-current="true"
          aria-label="Slide 1"
        ></button>
        <button
          v-for="screenshot in storeGames.game.screenshots"
          type="button"
          data-bs-target="#carouselExampleIndicators"
          :data-bs-slide-to="screenshot.id + 1"
          :aria-label="'Slide ' + (screenshot.id + 2)"
        ></button>
      </div>
      <div class="carousel-inner bg-dark">
        <div
          class="carousel-item active"
          :style="
            'background-image: url(' + storeGames.game.header_image + ');'
          "
        ></div>
        <div
          v-for="screenshot in storeGames.game.screenshots"
          :key="screenshot.id"
          class="carousel-item"
          :style="'background-image: url(' + screenshot.path_full + ');'"
        ></div>
      </div>
      <button
        class="carousel-control-prev"
        type="button"
        data-bs-target="#carouselExampleIndicators"
        data-bs-slide="prev"
      >
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Previous</span>
      </button>
      <button
        class="carousel-control-next"
        type="button"
        data-bs-target="#carouselExampleIndicators"
        data-bs-slide="next"
      >
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Next</span>
      </button>
    </div>

    <div class="container px-4 py-3" id="icon-grid">
      <h2 class="pb-2 border-bottom bg-sucess">
        Sobre o jogo
        <span
          :class="
            'badge ' + (storeGames.game.is_free ? 'bg-success' : 'bg-danger')
          "
        >
          {{ storeGames.game.is_free ? "Gratuito" : "Pago" }}
        </span>
      </h2>

      <p v-html="storeGames.game.about_the_game"></p>
      <p class="center">
        <span
          class="badge bg-secondary m-1"
          v-for="category in storeGames.game.categories"
          :key="category.id"
          >{{ category.description }}</span
        >
      </p>
    </div>

    <div class="container px-4" id="icon-grid">
      <h2 class="pb-2 border-bottom bg-sucess">
        Informações
        <span
          :class="'badge ' + colorClassification(storeGames.game.required_age)"
        >
          {{
            storeGames.game.required_age < 10
              ? "Livre"
              : "+" + storeGames.game.required_age
          }}
        </span>
      </h2>

      <div class="d-flex flex-wrap justify-content-around">
        <div class="mx-2 col d-flex">
          <div>
            <h3 class="fw-bold mb-0 fs-4 text-body-emphasis">Idiomas</h3>
            <p v-html="storeGames.game.supported_languages"></p>
          </div>
        </div>
        <div class="mx-2 col d-flex align-items-start">
          <div>
            <h3 class="fw-bold mb-0 fs-4 text-body-emphasis">Genêros</h3>
            <ul>
              <li v-for="genre in storeGames.game.genres">
                {{ genre.description }}
              </li>
            </ul>
          </div>
        </div>
        <div class="mx-2 col d-flex align-items-start">
          <div>
            <h3 class="fw-bold mb-0 fs-4 text-body-emphasis">Plataformas</h3>
            <ul>
              <li>
                <strong>Windows</strong>:
                <i
                  :class="
                    'fa-solid fa-circle-' +
                    (storeGames.game.platforms.windows ? 'check' : 'xmark')
                  "
                  :style="
                    'color: #' +
                    (storeGames.game.platforms.windows ? '00bd0d' : 'ff0000')
                  "
                ></i>
              </li>
              <li>
                <strong>Mac</strong>:
                <i
                  :class="
                    'fa-solid fa-circle-' +
                    (storeGames.game.platforms.mac ? 'check' : 'xmark')
                  "
                  :style="
                    'color: #' +
                    (storeGames.game.platforms.mac ? '00bd0d' : 'ff0000')
                  "
                ></i>
              </li>
              <li>
                <strong>Linux</strong>:
                <i
                  :class="
                    'fa-solid fa-circle-' +
                    (storeGames.game.platforms.linux ? 'check' : 'xmark')
                  "
                  :style="
                    'color: #' +
                    (storeGames.game.platforms.linux ? '00bd0d' : 'ff0000')
                  "
                ></i>
              </li>
            </ul>
          </div>
        </div>
        <div class="mx-2 col d-flex align-items-start">
          <div>
            <h3 class="fw-bold mb-0 fs-4 text-body-emphasis">Outros</h3>
            <ul>
              <li>
                <strong>Desenvolvedores</strong>:
                <ul>
                  <li v-for="developer in storeGames.game.developers">
                    {{ developer }}
                  </li>
                </ul>
              </li>
              <li>
                <strong>Data de lançamento</strong>:
                {{ storeGames.game.release_date.date }}
              </li>
              <li>
                <strong>Suporte</strong>:
                {{ storeGames.game.support_info.email }}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>

    <div class="container px-4" id="custom-cards">
      <h2 class="pb-2 border-bottom">Requisitos de Sistemas Operacionais</h2>
      <div class="row row-cols-1 row-cols-lg-3 align-items-stretch g-4 p-2">
        <div class="col">
          <div
            class="card card-cover h-100 overflow-hidden text-bg-dark rounded-4 shadow-lg"
            style="
              background-image: url('src/assets/image/operation_system/windows.png');
            "
          >
            <div
              class="d-flex flex-column h-100 p-4 pb-3 text-shadow-1 bg-dark bg-opacity-75"
            >
              <h3 class="lh-1 fw-bold">Requisitos do Windows</h3>
              <p v-html="storeGames.game.pc_requirements.minimum"></p>
            </div>
          </div>
        </div>
        <div v-if="storeGames.game.mac_requirements.lenght != undefined" class="col">
          <div
            class="card card-cover h-100 overflow-hidden text-bg-dark rounded-4 shadow-lg img-fluid object-fit-cover"
            style="
              background-image: url('src/assets/image/operation_system/apple.svg');
            "
          >
            <div
              class="d-flex flex-column h-100 p-4 pb-3 text-shadow-1 bg-dark bg-opacity-50"
            >
              <h3 class="lh-1 fw-bold">Requisitos do Mac</h3>
              <ul>
                <li></li>
              </ul>
            </div>
          </div>
        </div>

        <div v-if="storeGames.game.linux_requirements.lenght != null" class="col">
          <div
            class="card card-cover h-100 overflow-hidden text-bg-dark rounded-4 shadow-lg"
            style="
              background-image: url('src/assets/image/operation_system/linux.png');
            "
          >
            <div
              class="d-flex flex-column h-100 p-4 pb-3 text-shadow-1 bg-dark bg-opacity-50"
            >
              <h3 class="lh-1 fw-bold">Requisitos do Linux</h3>
              <ul>
                <li></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
  <NotWorkingView
    v-else
    message="Desculpe, por algum motivo não encontramos esse jogo!"
  />
  <div class="text-center">
    <button
      type="button"
      class="btn btn-sm btn-outline-secondary bg-success text-white"
      v-on:click="viewTester(storeGames.game.steam_appid)"
    >
      <i class="fa-solid fa-dollar-sign"></i>
      Comprar
    </button>
  </div>
  <FooterView />
</template>

<style>
.card,
.carousel-item {
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
}

.carousel-item {
  height: 500px;
}
</style>
