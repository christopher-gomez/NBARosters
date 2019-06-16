import Api from '@/services/Api';

export default {
  getTeams() {
    return Api().get('/nba/teams');
  },
  getTeamPlayers(team) {
    return Api().get(`/nba/teams/${team}/players`);
  },
  getAllPlayers() {
    return Api().get('/nba/players');
  },
  checkPlayersExist() {
    return Api().get('/nba/players/check');
  },
  downloadPlayers(page) {
    return Api().get(`/nba/players/download/${page}`);
  },
};
