import Api from '@/services/Api';

export default {
  getTeams() {
    return Api().get('/nba/teams');
  },
  getTeam(id) {
    return Api().get(`/nba/teams/${id}`);
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
  createPlayer(player) {
    return Api().post('/nba/players', { player });
  },
  deletePlayer(id) {
    return Api().delete(`/nba/players/${id}`);
  },
};
