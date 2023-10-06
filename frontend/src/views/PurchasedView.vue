<script>
import FooterView from "../components/Footer.vue";
import HeaderView from "../components/Header.vue";
import NotWorkingView from "../components/NotWorking.vue";
import { useGamesStore } from "../stores/games";
export default {
  components: {
    FooterView,
    HeaderView,
    NotWorkingView,
  },
  data() {
    return {
      logradouro: "",
      bairro: "",
      numero: "",
      cep: "",
      tipoPagamento: "",
      email: "",
      appid: 0,
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
    this.logradouro = localStorage.getItem("street");
    this.bairro = localStorage.getItem("neighborhood");
    this.numero = localStorage.getItem("number");
    this.cep = localStorage.getItem("cep");
    this.tipoPagamento = localStorage.getItem("typePayment");
    this.email = localStorage.getItem("email");
    this.appid = localStorage.getItem("appid");
    console.log("Email: " + this.email);
  },
  methods: {
    typePayment(type) {
      if (type == 1) {
        return "Cartão";
      } else if (type == 2) {
        return "Pix";
      } else if (type == 3) {
        return "Boleto";
      } else {
        return "Tranferência Bancária";
      }
    },
  },
};
</script>

<template>
  <HeaderView />
  <div class="container">
    <div class="alert alert-success text-center" role="alert">
      <h1>Compra Realizada</h1>
    </div>
    <ul class="list-group">
      <li class="list-group-item">
        <strong>Logradouro</strong>: {{ logradouro }}
      </li>
      <li class="list-group-item"><strong>Bairro</strong>: {{ bairro }}</li>
      <li class="list-group-item"><strong>Número</strong>: {{ numero }}</li>
      <li class="list-group-item"><strong>CEP</strong>: {{ cep }}</li>
      <li class="list-group-item">
        <strong>Forma de pagamento</strong>: {{ typePayment(tipoPagamento) }}
      </li>
      <li class="list-group-item"><strong>Email</strong>: {{ email }}</li>
      <li class="list-group-item">
        <strong>Jogo</strong>: {{ storeGames.game.name }}
      </li>
    </ul>
  </div>
  <FooterView />
</template>

<script></script>
