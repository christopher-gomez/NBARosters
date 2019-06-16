<template>
  <div id='app'>
    <router-view/>
  </div>
</template>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: white;
}
#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
button {
  background: none;
  border: none;
  font-size: 2em;
  margin: 20px 20px;
  outline: none !important;
}
button:hover {
  cursor: pointer;
}
</style>
