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

const store = usePeopleStore()
const peopleData: Ref<Person[]> = ref([])

store.fetchPeopleData()

function setPeopleData() {
  return new Promise(function (resolve, reject) {
    setTimeout(resolve, 1000)
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
      👉 Your code goes here 👈
      <!-- End: Implementation -->
    </main>
    <BannerBottom />
    <hr role="separator" />
    <Footer />
  </div>
</template>
