import { defineStore } from "pinia";

export const useGamesStore = defineStore("games", {
  state: () => {
    return {
      allGames: [],
      game: []
    };
  }
});
