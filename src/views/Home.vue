<template>
  <PageLayout @press-arrow="handlePressArrow">
    <section class="home-page">
      <div class="user">
        <div class="user-info">
          <div class="avatar">
            <img src="@/assets/images/avatar.png" alt="avatar" class="avatar" />
          </div>
          <div class="level">Level 5</div>
        </div>
        <div class="user-name">RichyRich</div>
      </div>
      <div class="tab">
        <button class="tablinks" @click="openTab('MY_TEAMS')">MY TEAMS</button>
        <button class="tablinks" @click="openTab('ABOUT')">ABOUT</button>
      </div>
      <div id="MY_TEAMS" class="tabcontent">
        <div class="search">
          <div class="search-title">
            SEARCH TEAMS
          </div>
          <div class="search-input">
            <img src="@/assets/images/search.png" alt="search" class="search-icon" />
            <input v-model="searchKey" class="input" placeholder="Search for a team" />
            <div v-if="!!searchKey">
              <img src="@/assets/images/close.png" alt="close" class="close" @click="clearSearch" />
            </div>
          </div>
          <div class="search-result">
            <div v-if="searchKey && filteredTeams.length === 0" class="no-results">
              <img src="@/assets/images/no-results.svg" alt="no-results" />
              <p>No Teams Found</p>
            </div>
            <div v-else>
              <div v-for="(team, index) in filteredTeams" :key="team.id" :class="{ focused: index === localIndex }">
                <TeamItem :team="team" :search-key="searchKey" :is-focused="index === localIndex" />
              </div>
            </div>
          </div>
        </div>
        <div class="my-team">
          <div class="search-title">
            MY TEAMS
          </div>
          <div v-if="!myTeams.length" class="no-follow-team">
            <p class="description">You aren't following any teams yet.</p>
          </div>
          <div v-else>
            <div v-for="team in myTeams" :key="team.id">
              <div class="my-team-item">
                <div class="team-mark">
                  <img src="@/assets/images/team-placeholder.png" alt="team-placeholder" class="team-placeholder" />
                </div>
                <p>{{ team.name }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div id="ABOUT" class="tabcontent"></div>
    </section>
  </PageLayout>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import PageLayout from '../layouts/PageLayout.vue'
import TeamItem from './TeamItem.vue'

export default {
  name: 'Home',
  components: {
    PageLayout,
    TeamItem
  },
  data() {
    return {
      searchKey: '',
      localIndex: 0
    }
  },
  computed: {
    ...mapState('teams', ['teams']),
    filteredTeams() {
      return this.teams.filter(team => {
        if (this.searchKey === '') {
          return
        } else {
          return (
            team.name.toLowerCase().includes(this.searchKey.toLowerCase()) ||
            team.stadium.toLowerCase().includes(this.searchKey.toLowerCase()) ||
            team.leagues.some(league => league.toLowerCase().includes(this.searchKey.toLowerCase()))
          )
        }
      })
    },
    myTeams() {
      return this.teams.filter(team => {
        return team.is_following
      })
    }
  },
  async mounted() {
    await this.getTeams()
    this.openTab('MY_TEAMS')
  },
  methods: {
    ...mapActions({
      getTeams: 'teams/getTeams'
    }),
    openTab(tabname) {
      document.querySelectorAll('.tabcontent').forEach(tabcontent => {
        tabcontent.style.display = 'none'
      })
      document.querySelectorAll('.tablinks').forEach(tablink => {
        tablink.classList.remove('active')
        if (tablink.textContent === tabname.replace('_', ' ')) {
          // Adjust this line as necessary
          tablink.classList.add('active')
        }
      })
      document.getElementById(tabname).style.display = 'block'
    },
    clearSearch() {
      this.searchKey = ''
    },
    handleKeyDown(event) {
      if (event.key === 'ArrowDown') {
        event.preventDefault()
        if (this.focusedIndex === null || this.focusedIndex === this.filteredTeams.length - 1) {
          this.focusedIndex = 0
        } else {
          this.focusedIndex++
        }
      } else if (event.key === 'ArrowUp') {
        event.preventDefault()
        if (this.focusedIndex === null || this.focusedIndex === 0) {
          this.focusedIndex = this.filteredTeams.length - 1
        } else {
          this.focusedIndex--
        }
      }
    },
    handleMouseEnter(index) {
      this.focusedIndex = index
    },
    handleMouseLeave() {
      this.focusedIndex = null
    },
    handlePressArrow(e) {
      if (!this.filteredTeams.length) return
      if (e.key === 'ArrowUp') {
        this.localIndex = this.localIndex === 0 ? 0 : this.localIndex - 1
        return
      }
      if (e.key === 'ArrowDown') {
        this.localIndex = this.localIndex === this.filteredTeams.length - 1 ? this.localIndex : this.localIndex + 1
        return
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.home-page {
  border-radius: 15px;
}

.user {
  background: $color-primary;
  height: 153px;
  padding: 42px;
  display: flex;
  gap: 20px;
  border-bottom: 1px solid $color-gray;
}

.user-info {
  display: flex;
  flex-direction: column;
  gap: 5px;
  align-items: center;
}

.avatar {
  width: 60px;
  height: 60px;
}

.level {
  background: $color-light-primary;
  width: 50px;
  padding: 5px;
  border-radius: 15px;
  text-align: center;
  font-size: 10px;
}

.user-name {
  font-size: 16px;
  font-style: italic;
}

.tab {
  display: flex;
  justify-content: center;
  gap: 25px;
  background: $color-primary;
}

.tab button {
  background: $color-primary;
  width: fit-content;
  height: 39px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: $color-lightgray;
  border: none;
  cursor: pointer;
}

.tab button:hover {
  color: white;
}

.tab button.active {
  border-bottom: 5px solid $color-secondary;
  position: relative;
}
.tab button.active::before,
.tab button.active::after {
  content: '';
  position: absolute;
  bottom: -5px;
  width: 10px;
  height: 5px;
  background: $color-secondary;
  border-radius: 5px 5px 0 0;
}

.tab button.active::before {
  left: -5px;
}

.tab button.active::after {
  right: -5px;
}

.tabcontent {
  display: none;
  border-top: none;
}

.search {
  padding: 15px;
  display: flex;
  flex-direction: column;
  gap: 15px;
  background: $color-lightgray;
  border-bottom: 8px solid $color-gray;
}

.search-title {
  font-size: 14px;
  font-style: italic;
  font-weight: bold;
  color: $color-primary;
}

.search-input {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
  background: $color-semigray;
  padding: 10px 15px;
  border-radius: 15px;
}

.input {
  background: $color-semigray;
  border: none;
  flex: 1;
  &:focus-visible {
    outline-width: 0;
  }
}

.focused {
  background: $color-semigray;
}

.focused .team-mark {
  background: $color-lightgray;
}

.close {
  cursor: pointer;
}

.my-team {
  padding: 15px;
  display: flex;
  flex-direction: column;
  gap: 15px;
  background: $color-lightgray;
}

.no-results {
  padding: 20px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: Roboto;
  font-size: 12px;
  color: $color-primary;
}

.no-follow-team {
  background: $color-semigray;
  padding: 37px 0;
  width: 100%;
  border-radius: 10px;
}

.description {
  font-family: Roboto;
  font-size: 12px;
  color: $color-dark-gray;
  text-align: center;
}

.my-team-item {
  padding: 5px 0px;
  background: $color-lightgray;
  display: flex;
  gap: 10px;
  align-items: center;
  color: $color-dark-gray;
}

.my-team-item:hover {
  .team-mark {
    background: $color-lightgray;
  }
  background: $color-semigray;
}
.team-mark {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 40px;
  background: $color-semigray;
  border-radius: 50%;
}

@media (min-width: #{$grid-breakpoint-medium}) {
  .user-name {
    display: flex;
    align-items: center;
  }
}

@media (max-width: #{$grid-breakpoint-medium}) {
  .user {
    justify-content: center;
  }
  .user-name {
    display: none;
  }
  .tab {
    border-bottom: 8px solid $color-gray;
  }
}
</style>
