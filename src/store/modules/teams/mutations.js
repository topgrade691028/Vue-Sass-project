export default {
  SET_TEAMS(state, { teams }) {
    state.teams = teams
  },
  FOLLOW_TEAM(state, { id }) {
    const teamIndex = state.teams.findIndex(o => o.id === id)
    state.teams[teamIndex].is_following = true
  },
  UNFOLLOW_TEAM(state, { id }) {
    const teamIndex = state.teams.findIndex(o => o.id === id)
    state.teams[teamIndex].is_following = false
  }
}
