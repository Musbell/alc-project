<template>
  <v-container grid-list-md>
    <v-layout row wrap>
      <v-flex d-flex xs12 sm12 md4 lg4>
        <StudentList/>
      </v-flex>
      <v-flex d-flex xs12 sm12 md8 lg8>
        <div v-if="this.$route.path == '/'" id="placeholder-container">
          <img src="https://i.pinimg.com/736x/cb/74/ed/cb74ed4cf93e363b83fc527d16ad54d7--illustration-vector-icon-design.jpg"
               alt="placeholder" id="placeholder" />
          <p></p>
          <p>Develped with  <v-icon large>favorite</v-icon> by <a href="https://www.github.com/musbell"
          target="_blank">Musbell</a></p>
        </div>
        <transition name="view" mode="out-in" appear>
          <router-view :key="$route.fullPath">
          </router-view>
        </transition>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  import StudentList from './studentList.vue'
  export default {
    name: 'hello',
    data () {
      return {
        msg: 'Welcome to Your Vue.js PWA'
      }
    },
    components: {
      StudentList
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  #placeholder-container{
    text-align: center;
  }
</style>
