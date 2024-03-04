<template>
  <div :class="{ 'team-item': true, focused: isFocused }">
    <div class="team">
      <div class="team-mark">
        <img src="@/assets/images/team-placeholder.png" alt="team-placeholder" class="team-placeholder" />
      </div>
      <div class="team-info">
        <div class="team-league" v-html="highlightText(team.leagues.join(', '))"></div>
        <div class="team-detail">
          <div class="team-name" v-html="highlightText(team.name)"></div>
          <div class="team-stadium">
            <img src="@/assets/images/stadium.svg" alt="stadium" class="stadium" />
            <div v-html="highlightText(team.stadium)"></div>
          </div>
        </div>
      </div>
    </div>
    <div class="follow-button">
      <div v-if="team.is_following">
        <button class="following" @click="unfollowTeam(team.id)">FOLLOWING</button>
      </div>
      <div v-else>
        <button class="follow" @click="followTeam(team.id)">FOLLOW</button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  props: {
    team: {
      type: Object,
      required: true
    },
    searchKey: {
      type: String,
      default: ''
    },
    isFocused: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    ...mapActions({
      followTeam: 'teams/followTeam',
      unfollowTeam: 'teams/unfollowTeam'
    }),
    highlightText(text) {
      if (!this.searchKey) return text
      const regex = new RegExp(this.searchKey, 'ig')
      return text.replace(regex, match => `<span style="color: #00b1ff">${match}</span>`)
    }
  }
}
</script>

<style lang="scss" scoped>
.team-item {
  padding: 5px 0px;
  background: $color-lightgray;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: $color-dark-gray;
}

.highlighted {
  .team-item {
    background: $color-semigray;
  }
  .team-mark {
    background: $color-lightgray;
  }
}
.team-item:hover {
  .team-mark {
    background: $color-lightgray;
  }
  background: $color-semigray;
}

.focused .team-mark,
.team-item.focused .team-mark {
  background: $color-lightgray;
}

.team {
  display: flex;
  gap: 10px;
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

.team-placeholder {
  width: 28px;
  height: 28px;
}

.team-info {
  display: flex;
  flex-direction: column;
  gap: 5px;
  padding: 5px 0;
  font-family: Roboto;
  font-weight: normal;
}

.team-detail {
  display: flex;
  gap: 12px;
  align-items: center;
}

.team-name {
  font-weight: bold;
}

.team-stadium {
  display: flex;
  gap: 6px;
}

.follow {
  padding: 8px 20px;
  background: $color-secondary;
  border: none;
  border-radius: 20px;
  color: $color-lightgray;
  cursor: pointer;
}

.following {
  padding: 8px 20px;
  background: $color-lightgray;
  border: 2px solid $color-secondary;
  border-radius: 20px;
  color: $color-secondary;
  cursor: pointer;
}

.highlight {
  color: $color-secondary;
}
</style>
