<template>
    <div id="app">hello
        <router-link tag="div" to="/home">首页</router-link>
        <router-link to="/about">关于</router-link>
        <router-view></router-view>
    </div>
</template>

<script>
export default {
    name: "app",
    mouted() {
        console.log('app', this.$router);
    },
    components: {}
};
</script>

<style>
#app {
    font-family: "Avenir", Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
}
</style>
