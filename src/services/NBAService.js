import Api from '@/services/Api';

export default {
  getTeams() {
    return Api().get('/nba/teams');
  },
  getAllPlayers() {
    return Api().get('/nba/players');
  },
  getPlayers(team) {
    return Api().get(`/nba/players/${team}`);
  },
  checkPlayersExist() {
    return Api().get('/nba/players/check');
  },
  downloadPlayers(page) {
    return Api().get(`/nba/players/download/${page}`);
  },
};
