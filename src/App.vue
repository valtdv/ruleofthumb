<script setup lang="ts">
import NavBar from './components/NavBar.vue';
import HeroCard from './components/HeroCard.vue';
import BannerTop from './components/BannerTop.vue';
import BannerBottom from './components/BannerBottom.vue';
import Footer from './components/FooterComponent.vue';
</script>

<template>
  Hello world!
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
        <hr role="separator">
        <Footer />
    </div>
</template>
