<template>
  <div id="app">
    <button @click="plus">+</button>
    <div>{{this.$store.state.count}}</div>
    <div>{{this.$store.getters.newCount}}</div>
  </div>
</template>

<script>

export default {
  name: 'app',
  mounted() {
    console.log('App mounted', this.$store);
  },
  methods: {
    plus() {
      this.$store.dispatch('change');
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
