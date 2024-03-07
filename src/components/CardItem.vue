<template>
  <div
    class="card"
    :class="{ list: isListView }"
    data-testid="card"
    :style="{ backgroundImage: `url('${src}')` }"
  >
    <div class="card__container">
      <!-- Header -->
      <div class="card__content">
        <div class="card__info">
          <div
            v-if="positivePercentage > negativePercentage"
            class="card__vote-result-thumb upvote"
          >
            <img src="../assets/img/thumbs-up.svg" alt="thumbs up" />
          </div>
          <div v-else class="card__vote-result-thumb downvote">
            <img src="../assets/img/thumbs-down.svg" alt="thumbs down" />
          </div>
          <div class="card__person-info">
            <h3 class="card__name" data-testid="name">{{ person.name }}</h3>
            <p class="card__description">{{ person.description }}</p>
          </div>
        </div>
        <div class="card__form-container">
          <p class="card__date" data-testid="date">
            <span v-if="hasVoted">Thank you for your vote!</span>
            <span v-else>{{ date }} ago in {{ person.category }}</span>
          </p>
          <button v-if="hasVoted" class="card__btn" data-testid="vote-again-btn" @click="voteAgain">
            Vote again
          </button>
          <form v-else class="card__form" action="" data-testid="form" @submit.prevent="sendVote">
            <input
              v-model="vote"
              class="card__input"
              type="radio"
              name="vote"
              :id="upvoteId"
              data-testid="upvote"
              value="upvote"
            />
            <label class="card__label upvote" :for="upvoteId">
              <img src="../assets/img/thumbs-up.svg" alt="thumbs up" />
            </label>
            <input
              v-model="vote"
              class="card__input"
              type="radio"
              name="vote"
              :id="downvoteId"
              data-testid="downvote"
              value="downvote"
            />
            <label class="card__label downvote" :for="downvoteId">
              <img src="../assets/img/thumbs-down.svg" alt="thumbs down" />
            </label>
            <button
              class="card__btn"
              data-testid="vote-btn"
              type="submit"
              :disabled="vote === undefined"
            >
              Vote Now
            </button>
          </form>
        </div>
      </div>
      <!-- Footer -->
      <div class="card__footer">
        <div class="card__gauge-bar">
          <div class="card__percentages">
            <span class="card__percentage">
              <img src="../assets/img/thumbs-up.svg" alt="thumbs up" />
              <span data-testid="positive-percentage">{{ positivePercentage }}%</span></span
            >
            <span class="card__percentage">
              <span data-testid="negative-percentage">{{ negativePercentage }}%</span>
              <img src="../assets/img/thumbs-down.svg" alt="thumbs down"
            /></span>
          </div>
          <progress class="card__progress-bar" :value="positiveVotes" :max="total"></progress>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { PeopleService } from '@/services/people.service'
import { usePeopleStore } from '@/stores/people'
import { ref } from 'vue'

const props = defineProps({
  person: {
    type: Object,
    required: true
  },
  isListView: {
    type: Boolean,
    required: true
  }
})

const peopleStore = usePeopleStore()

const hasVoted = ref(false)
const vote = ref()

const upvoteId = `upvote-${props.person.id}`
const downvoteId = `downvote-${props.person.id}`

const src = new URL(`../assets/img/${props.person.picture}`, import.meta.url)

// Time passed since last update

const today = new Date()
const lastUpdated = new Date(props.person.lastUpdated)

const timeDifference = today.getTime() - lastUpdated.getTime()
const dayDifference = Math.round(timeDifference / (1000 * 3600 * 24))
let date: string

if (dayDifference > 30 && dayDifference < 365) {
  const months = Math.round(dayDifference / 30)
  date = `${months} months`
} else if (dayDifference >= 365) {
  const years = Math.round(dayDifference / 365)
  date = `${years} years`
} else {
  date = `${dayDifference} days`
}

// Percentage calculations for gauge bar
const positivePercentage = ref()
const negativePercentage = ref()
const total = ref()

const positiveVotes = ref(props.person.votes.positive)
const negativeVotes = ref(props.person.votes.negative)

const calcultaPercentages = () => {
  total.value = positiveVotes.value + negativeVotes.value
  positivePercentage.value = ((positiveVotes.value * 100) / total.value).toFixed(2)
  negativePercentage.value = ((negativeVotes.value * 100) / total.value).toFixed(2)
}

calcultaPercentages()

// Methods

const sendVote = () => {
  let newVotes: Object
  const name = props.person.name

  if (vote.value === 'upvote') {
    positiveVotes.value = positiveVotes.value + 1
  } else {
    negativeVotes.value = negativeVotes.value + 1
  }

  newVotes = {
    votes: {
      positive: positiveVotes.value,
      negative: negativeVotes.value
    }
  }

  calcultaPercentages()

  peopleStore.updatePeople(name, newVotes)

  PeopleService.updateData(props.person.id, newVotes)
  hasVoted.value = true
}

const voteAgain = () => {
  hasVoted.value = false
  vote.value = undefined
}
</script>

<style scoped lang="scss">
* {
  font-family: 'Lato', sans-serif;
  color: white;
}

.card {
  position: relative;
  width: 300px;
  height: 300px;
  background-repeat: no-repeat;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
  background-size: cover;

  &__container {
    position: relative;
    height: 100%;
  }

  &__content {
    padding-top: 95px;
  }

  &__info {
    display: flex;
  }

  &__person-info {
    width: 230px;
  }

  &__vote-result-thumb,
  &__label {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 30px;
    height: 30px;
  }

  .upvote {
    background-color: #3cbbb4cc;
  }

  .downvote {
    background-color: #fbbd4a;
  }

  &__name {
    margin: 7px 0;
    font-size: 30px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  &__description {
    font-size: 15px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  &__date {
    font-size: 12px;
    font-weight: 700;
  }

  &__form-container {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    margin-right: 34px;
  }

  &__form {
    display: flex;
    align-items: center;
    gap: 12px;
  }

  &__input {
    display: none;
  }

  &__input:checked + label {
    border: 2px solid white;
  }

  &__btn {
    width: 107px;
    height: 38px;
    font-size: 15px;
    background: #00000099;
    border: 1px solid white;
    cursor: pointer;
  }

  &__btn:disabled {
    background-color: #888888;
    cursor: initial;
  }

  &__gauge-bar {
    position: absolute;
    bottom: -1px;
    width: 100%;
  }

  &__percentages {
    position: absolute;
    top: 25%;
    display: flex;
    justify-content: space-between;
    width: 100%;
  }

  &__percentage {
    display: flex;
    align-items: center;
    gap: 6px;
    margin: 0 12px;
    font-size: 18px;

    img {
      width: 15px;
      height: 15px;
    }
  }

  &__progress-bar,
  &__progress-bar::-webkit-progress-bar {
    width: 100%;
    height: 36px;
    background: #3cbbb499;
    border: none;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
  }

  //Separate rules so background can render properly in chromium

  &__progress-bar::-moz-progress-bar {
    background: #f9ad1d99;
  }

  &__progress-bar::-webkit-progress-value {
    background: #f9ad1d99;
  }
}

@media (min-width: 798px) {
  .card {
    width: 351px;
    height: 351px;
  }

  .card__percentage {
    margin: 0 12px;
  }

  .card.list {
    margin-bottom: 14px;
    width: 100%;
    height: 142px;
    background-repeat: no-repeat;
    background-size: 154px;

    .card__container {
      background: linear-gradient(
        90deg,
        rgba(0, 0, 0, 0.0001) 0%,
        #888888 19.79%,
        #666666 50%,
        rgba(51, 51, 51, 0.6) 71.88%
      );
    }

    .card__content {
      padding-top: 0;
      display: flex;
      justify-content: space-between;
    }

    .card__info {
      justify-content: space-between;
      width: 100%;
    }

    .card__person-info {
      margin-right: 28px;
      width: 342px;
    }

    .card__vote-result-thumb,
    .card__label {
      width: 45px;
      height: 45px;

      img {
        width: 24px;
        height: 24px;
      }
    }

    .card__name {
      margin-bottom: 18px;
    }

    .card__form-container {
      margin-right: 12px;
    }
  }
}

@media (min-width: 1024px) {
  .card {
    width: 349px;
    height: 349px;

    &__percentage {
      display: flex;
      align-items: center;
      gap: 6px;
      margin: 0 18px;
    }

    &__percentage {
      img {
        width: 22px;
        height: 22px;
      }
    }
  }

  .card.list {
    margin-bottom: 18px;
    height: 170px;
    background-size: 257px;
    background-position-y: -30px;

    .card__background {
      top: -30px;
      width: 250px;
    }

    .card__person-info {
      width: 548px;
    }

    .card__name,
    .card__description {
      white-space: initial;
    }

    .card__percentage {
      font-size: 27px;
    }

    .card__progress-bar,
    .card__progress-bar::-webkit-progress-bar {
      height: 56px;
    }
  }
}
</style>
