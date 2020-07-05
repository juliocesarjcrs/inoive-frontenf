<template>
    <div id="app">
        <!-- <img alt="Vue logo" src="./assets/logo.png" /> -->
        <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
        <navbar />
        <!-- <router-view /> -->
        <!-- <invoice /> -->
    </div>
</template>

<script>
import navbar from './components/Navbar.vue'
import invoice from './components/invoice.vue'

export default {
    name: 'App',
    components: {
        navbar,
        // invoice
    }
}
</script>

<style>
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
}
</style>
