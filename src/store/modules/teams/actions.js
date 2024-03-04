import httpService from '@/services/httpService'

export default {
  async getTeams({ commit, state }) {
    try {
      const response = await httpService.get('/v3/92a45382-798e-4899-866c-152bd888424a')
      const formatted = response.replace(/,\s*([\]}])/g, '$1')
      const data = JSON.parse(formatted)
      const payload = {
        teams: data.football_teams
      }
      commit('SET_TEAMS', payload)
      return state.teams
    } catch (error) {
      throw error
    }
  },
  followTeam({ commit, state }, payload) {
    commit('FOLLOW_TEAM', { id: payload })
    return payload
  },
  unfollowTeam({ commit, state }, payload) {
    commit('UNFOLLOW_TEAM', { id: payload })
    return payload
  }
}
