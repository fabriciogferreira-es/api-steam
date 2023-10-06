<script>
import FooterView from "../components/Footer.vue";
import HeaderView from "../components/Header.vue";
import NotWorkingView from "../components/NotWorking.vue";
import { vMaska } from "maska";

import { useGamesStore } from "../stores/games";

import api from "../services/api";
export default {
  components: {
    FooterView,
    HeaderView,
    NotWorkingView,
  },
  directives: {
    maska: vMaska,
  },
  data() {
    return {
      logradouro: "",
      bairro: "",
      numero: "",
      cep: "",
      tipoPagamento: "",
      email: "",
      dataCep: [],
    };
  },
  setup() {
    const storeGames = useGamesStore();
    return {
      storeGames,
    };
  },
  created() {
    this.appid = this.storeGames.game.appid;
  },
  methods: {
    createBuy() {
      localStorage.setItem("street", this.logradouro);
      localStorage.setItem("neighborhood", this.bairro);
      localStorage.setItem("number", this.numero);
      localStorage.setItem("cep", this.cep);
      localStorage.setItem("typePayment", this.tipoPagamento);
      localStorage.setItem("email", this.email);
      localStorage.setItem("appid", this.appid);
      this.$router.push("/Purchased");
    },
  },
  watch: {
    async cep(newCep) {
      newCep = newCep.replace(/\D/gim, "");
      if (newCep.length == 8) {
        this.dataCep = await api.viacep.cep.getDataByCep(this.cep);
      }
    },
  },
};
</script>

<template>
  <HeaderView />
  <div v-if="storeGames.game.length != 0" class="container">
    <form class="text-center m-auto p-4" @submit.prevent="createBuy" novalidate>
      <h1 class="border-bottom">Jogo</h1>
      <div class="row featurette">
        <div class="col-md-7 order-md-2">
          <h2 class="featurette-heading fw-normal lh-1">
            <router-link to="/Game">
              {{ storeGames.game.name }}
            </router-link>
          </h2>
          <p class="lead p-2">
            {{ storeGames.game.short_description.substring(0, 200) }}...
          </p>
        </div>
        <div
          class="col-md-5 order-md-1 thumb-game"
          :style="
            'background-image: url(' + storeGames.game.header_image + ');'
          "
        ></div>
      </div>
      <div class="row campos">
        <div class="mb-3 col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 col-xxl-4">
          <label class="form-label">Logradouro</label>
          <input
            type="email"
            class="form-control"
            placeholder="Digite aqui o Logradouro"
            v-model="logradouro"
          />
        </div>
        <div class="mb-3 col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 col-xxl-4">
          <label class="form-label">Bairro</label>
          <input
            type="email"
            class="form-control"
            placeholder="Digite aqui o Bairro"
            v-model="bairro"
          />
        </div>
        <div class="mb-3 col-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-4">
          <label class="form-label">Número</label>
          <input
            type="email"
            class="form-control"
            placeholder="Digite aqui o Número"
            v-model="numero"
          />
        </div>
        <div class="mb-3 col-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-4">
          <label class="form-label">CEP</label>
          <input
            placeholder="Digite aqui o CEP"
            type="text"
            class="form-control"
            v-model="cep"
            v-maska
            data-maska="#####-###"
          />
        </div>
        <div class="mb-3 col-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-4">
          <label class="form-label">Cidade</label>
          <input
            type="email"
            class="form-control"
            :value="dataCep.localidade"
            disabled
          />
        </div>
        <div class="mb-3 col-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-4">
          <label for="exampleFormControlInput1" class="form-label"
            >Estado</label
          >
          <input
            type="email"
            class="form-control"
            :value="dataCep.uf"
            disabled
          />
        </div>
        <div
          class="form-check col-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-4 text-start"
        >
          <div>
            <input
              class="form-check-input"
              type="radio"
              name="tipoPagamento"
              v-model="tipoPagamento"
              value="1"
              id="1"
            />
            <label class="form-check-label" for="1"> Cartão </label>
          </div>
          <div>
            <input
              class="form-check-input"
              type="radio"
              v-model="tipoPagamento"
              name="tipoPagamento"
              value="2"
              id="2"
              checked
            />
            <label class="form-check-label" for="2"> PIX </label>
          </div>
          <div>
            <input
              class="form-check-input"
              type="radio"
              v-model="tipoPagamento"
              name="tipoPagamento"
              value="3"
              id="3"
              checked
            />
            <label class="form-check-label" for="2"> Boleto </label>
          </div>
          <div>
            <input
              class="form-check-input"
              type="radio"
              v-model="tipoPagamento"
              value="4"
              name="tipoPagamento"
              id="4"
              checked
            />
            <label class="form-check-label" for="2">
              Tranferência Bancária
            </label>
          </div>
        </div>
        <div class="col-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-4">
          <div class="mb-3">
            <label for="email" class="form-label">Email:</label>
            <input
              type="email"
              class="form-control"
              id="email"
              placeholder="name@example.com"
              v-model="email"
            />
          </div>
        </div>
      </div>
      <div>
        <table class="table">
          <thead>
            <tr>
              <th colspan="4">Carrinho</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Nome</td>
              <td>Preço</td>
            </tr>
            <tr>
              <td>{{ storeGames.game.name }}</td>
              <td>
                {{
                  storeGames.game.price_overview
                    ? storeGames.game.price_overview.final_formatted
                    : "Gratuito"
                }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <button class="btn btn-primary">Comprar</button>
    </form>
  </div>
  <NotWorkingView
    v-else
    message="Desculpe, por algum motivo não econtramos esse jogo, ou você não selecionou um jogo!"
  />
  <FooterView />
</template>

<style>
.thumb-game {
  background-color: dimgrey;
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
}

.campos > div {
  padding: 5px;
}
</style>
