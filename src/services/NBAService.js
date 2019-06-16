import Api from '@/services/Api';

export default {
  getTeams() {
    return Api().get('/nba/teams');
  },
  getPlayers(page) {
    return Api().get(`/nba/players/${page}`);
  },
};
