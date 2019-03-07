<template>
  <div id="app">
    <button @click="plus10">+10</button>
    <button @click="plus100">+100</button>
    <div>{{this.$store.state.count}}</div>
    <div>{{this.$store.state.a.count}}</div>
    <div>{{this.$store.state.a.b.count}}</div>
  </div>
</template>

<script>

export default {
  name: 'app',
  mounted() {
    console.log('App mounted', this.$store);
  },
  methods: {
    plus10() {
      this.$store.commit('change');
      console.log(this.$store);
    },
    plus100() {
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
