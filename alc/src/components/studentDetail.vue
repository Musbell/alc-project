<template>
  <div>
    <v-divider v-bind="divider" v-bind:inset="inset"></v-divider>
    <router-link :to="{ name: 'UpdateStudent', params: { id: student.id }}">
      <v-list-tile avatar  @click="">
        <v-list-tile-avatar>
          <img src="https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png">
        </v-list-tile-avatar>
        <v-list-tile-content>
          <v-list-tile-title>{{student.firstName}} {{student.lastName}}</v-list-tile-title>
          <v-list-tile-sub-title>
            <span class='grey--text text--darken-2'>{{student.sessionOfAdmission}}</span>
          </v-list-tile-sub-title>
        </v-list-tile-content>
        <v-list-tile-action>
          <v-icon>school</v-icon>
        </v-list-tile-action>
      </v-list-tile>
    </router-link>
  </div>
</template>

<script>
  export default {
    name: 'studentDetail',
    props: ['student'],
    data () {
      return {
        header: 'Student list',
        divider: true,
        inset: true
      }
    },
    methods: {

    }
  }
</script>

<style>
  a{
    text-decoration: none;
  }
</style>
