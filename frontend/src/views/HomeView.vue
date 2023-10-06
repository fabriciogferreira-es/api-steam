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
  data() {
    return {
      lastIndex: 0,
      pageGames: [],
      numberPage: 0,
    };
  },
  async created() {
    this.storeGames.allGames = await api.steam.games.getAllGames();
    this.nextPage(this.numberPage);
  },
  methods: {
    async nextPage(numberPage) {
      this.numberPage = numberPage;
      this.pageGames = [];
      /* 
      while (this.pageGames.length < 5 && this.pageGames.length <= this.storeGames.allGames.length) {
        let game = await api.steam.games.getGame(
          this.storeGames.allGames[this.lastIndex].appid
        );
        if (game != undefined) {
          this.pageGames.push(game);
        }
        this.lastIndex++;
      }
      this.lastIndex--;
      console.log(this.lastIndex);
      this.numberPage++;
      */
      for (let i = numberPage * 20; i < (numberPage + 1) * 20; i++) {
        let game = await api.steam.games.getGame(
          this.storeGames.allGames[i].appid
        );
        if (game != undefined) {
          this.pageGames.push(game);
        }
        
      }
    },
    async viewGame(appid) {
      this.storeGames.game = await api.steam.games.getGame(appid);
      this.$router.push("/Game");
    },
    async viewTester(appid) {
      this.storeGames.game = await api.steam.games.getGame(appid);
      this.$router.push('/Tester');
    }
  },
};
</script>

<template>
  <HeaderView />
  <div v-if="this.pageGames.length != 0" class="album bg-body-tertiary pt-2">
    <div class="container">
      <div class="row row-cols-1 row-cols-sm-1 row-cols-md-2">
        <div
          v-for="game in this.pageGames"
          :key="game.steam_appid"
          class="col py-2"
        >
          <div class="card shadow-sm h-100">
            <img class="contain" :src="game.header_image" alt="Thumb" />
            <div class="card-body d-flex flex-column justify-content-between">
              <div>
                <h5>{{ game.name }}</h5>
                <p class="card-text">
                  {{ game.short_description.substring(0, 100) }}...
                </p>
              </div>
              <div class="d-flex justify-content-between align-items-center">
                <div class="btn-group">
                  <button
                    type="button"
                    class="btn btn-sm btn-outline-secondary bg-warning text-white"
                    v-on:click="viewGame(game.steam_appid)"
                  >
                    <i class="fa-solid fa-eye"></i>
                    Ver
                  </button>
                  <button
                    type="button"
                    class="btn btn-sm btn-outline-secondary bg-success text-white"
                    v-on:click="viewTester(game.steam_appid)"
                  >
                    <i class="fa-solid fa-dollar-sign"></i>
                    Comprar
                  </button>
                </div>
                <small class="text-body-secondary"
                  ><strong>id</strong>: {{ game.steam_appid }}</small
                >
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <NotWorkingView v-else message="Desculpe, algo nesta página não está funcionando, tente a próxima!"
  />
  <nav class="py-3" aria-label="Page navigation example">
    <ul class="pagination justify-content-center m-0">
      <li class="page-item" v-on:click="nextPage(numberPage - 1)">
        <div class="page-link" role="button">
          <span aria-hidden="true">&laquo;</span>
        </div>
      </li>
      <li class="page-item active">
        <a class="page-link" href="#">{{ numberPage + 1 }}</a>
      </li>
      <li class="page-item">
        <a class="page-link" href="#">{{ numberPage + 2 }}</a>
      </li>
      <li class="page-item">
        <a class="page-link" href="#">{{ numberPage + 3 }}</a>
      </li>
      <li class="page-item" v-on:click="nextPage(numberPage + 1)">
        <div class="page-link" role="button">
          <span aria-hidden="true">&raquo;</span>
        </div>
      </li>
    </ul>
  </nav>
  <FooterView />
</template>

<style></style>
