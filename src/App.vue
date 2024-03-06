<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { usePeopleStore } from './stores/people'
import type { Ref } from 'vue'
import type { Person } from '@/models/interfaces/person.interface'
import NavBar from './components/NavBar.vue'
import HeroCard from './components/HeroCard.vue'
import BannerTop from './components/BannerTop.vue'
import BannerBottom from './components/BannerBottom.vue'
import Footer from './components/FooterComponent.vue'
import CardItem from '@/components/CardItem.vue'

const store = usePeopleStore()
const peopleData: Ref<Person[]> = ref([])
const viewType = ref('List')

store.fetchPeopleData()

function setPeopleData() {
  return new Promise(function (resolve, reject) {
    setTimeout(resolve, 500)
  }).then(function () {
    peopleData.value = store.getPeopleData
  })
}

onMounted(() => {
  setPeopleData()
})
</script>

<template>
  <NavBar />
  <HeroCard />
  <div class="max-centered">
    <BannerTop />
    <main role="main">
      <!-- Start: Implementation -->
     <section class="main-section">
      <div class="main-section__header">
        <h2 class="main-section__title">Previous Rulings</h2>
        <select v-model="viewType" class="main-section__select" name="" id="">
          <option value="List">List</option>
          <option value="Grid">Grid</option>
        </select>
      </div>
      <div class="main-section__content" :class="viewType === 'List' ? 'list-view' : 'grid-view'">
        <template v-for="person in peopleData" :key="person.id">
          <CardItem :person="person" :is-list-view="viewType === 'List'" />
        </template>
      </div>
     </section>
      <!-- End: Implementation -->
    </main>
    <BannerBottom />
    <hr role="separator" />
    <Footer />
  </div>
</template>

<style scoped lang="scss">
.main-section {
  &__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 24px;
  }

  &__title {
    margin: 0;
    font-size: 24px;
  }

  &__content {
    display: flex;
    gap: 12px;
    overflow: scroll;
  }

  &__select {
    display: none;
    padding: 12px;
    width: 173px;
    text-align: center;
    background: white;
    border: 2px solid black;
    border-radius: 0;
  }
}

@media (min-width: 798px) {
  .main-section {
    &__content {
      display: block;
    }

    &__content.grid-view {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 21px;
    }

    &__select {
      display: block;
    }
  }
}

@media (min-width: 1024px) {
  .main-section {
    &__content.grid-view {
      grid-template-columns: 1fr 1fr 1fr;
      gap: 27px;
    }
  }
}
</style>
