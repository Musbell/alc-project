<template>
  <v-card>
    <div class="container" id="search">
      <v-text-field
        single-line
        label="Search"
        prepend-icon="search"
        v-model="searchText"
      ></v-text-field>
    </div>
    <v-list two-line>
      <template>
        <v-subheader>student list</v-subheader>
        <v-progress-circular indeterminate color="primary" v-if="loading"></v-progress-circular>
        <transition-group
          name="staggered-fade"
          v-bind:css="false"
          v-on:before-enter="beforeEnter"
          v-on:enter="enter"
          v-on:leave="leave"
        >
          <StudentDetail
            v-for="student in filterBy(allStudents, searchText)"
            :key="student.id"
            :student="student"
          ></StudentDetail>
        </transition-group>
      </template>
      <br>
      <div class="text-xs-center">
        <v-pagination :length="3" v-model="page"></v-pagination>
      </div>
    </v-list>
  </v-card>
</template>

<script>
  import StudentDetail from './studentDetail.vue'
  import { ALL_STUDENTS_SEARCH_QUERY } from '../constants/graphql'
  export default {
    name: 'studentList',
    data () {
      return {
        allStudents: [],
        loading: 0,
        searchText: '',
        page: 1
      }
    },
    methods: {
      filterBy (list, value) {
//        value = value.charAt(0).toUpperCase() + value.slice(1)
        return list.filter((student) => {
          return student.lastName.indexOf(value) > -1 || student.firstName.indexOf(value) > -1
        })
      },
      beforeEnter: function (el) {
        el.style.opacity = 0
        el.style.height = 0
      },
      enter: function (el, done) {
        var delay = el.dataset.index * 150
        setTimeout(function () {
          Velocity(
            el,
            {opacity: 1, height: '5em'},
            {complete: done}
          )
        }, delay)
      },
      leave: function (el, done) {
        var delay = el.dataset.index * 150
        setTimeout(function () {
          Velocity(
            el,
            {opacity: 0, height: 0},
            {complete: done}
          )
        }, delay)
      }
    },
    components: {
      StudentDetail
    },
    apollo: {
      allStudents: {
        query: ALL_STUDENTS_SEARCH_QUERY,
        pollInterval: 300
      }
    }
  }
</script>


<style>
  #search{
    margin-bottom: -40px;
  }
</style>
