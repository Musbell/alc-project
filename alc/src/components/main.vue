<template>
  <v-app light>
    <v-navigation-drawer
      persistent
      :mini-variant="miniVariant"
      :clipped="clipped"
      v-model="drawer"
      enable-resize-watcherw
    >
      <v-toolbar flat class="transparent">
        <v-list class="pa-0">
          <v-list-tile avatar>
            <v-list-tile-avatar>
              <img src="https://www.wssu.edu/profiles/raileyt/profile.jpg" />
            </v-list-tile-avatar>
            <v-list-tile-content>
              <v-list-tile-title>Lawrence Leider</v-list-tile-title>
              <!--<v-list-tile-sub-title> <caption>Form teacher</caption></v-list-tile-sub-title>-->
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
      </v-toolbar>
      <v-list class="pt-0" dense>
        <v-divider></v-divider>
        <router-link to="/">
        <v-list-tile @click="">
          <v-list-tile-action>
            <v-icon>home</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Home</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        </router-link>
        <router-link to="/students">
        <v-list-tile @click="">
            <v-list-tile-action>
            <v-icon>person_add</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Add student</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
           </router-link>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar fixed dark class="blue darken-3">
      <v-toolbar-side-icon @click.stop="drawer = !drawer" dark></v-toolbar-side-icon>
      <v-btn
        icon
        dark
        @click.stop="miniVariant = !miniVariant"
      >
        <v-icon v-html="miniVariant ? 'chevron_right' : 'chevron_left'"></v-icon>
      </v-btn>
      <v-btn
        icon
        dark
        @click.stop="clipped = !clipped"
      >
        <v-icon>web</v-icon>
      </v-btn>
      <v-btn
        icon
        dark
        @click.stop="fixed = !fixed"
      >
        <v-icon>remove</v-icon>
      </v-btn>
      <v-toolbar-title v-text="title"></v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn
        icon
        dark
        @click.stop="rightDrawer = !rightDrawer"
      >
        <v-icon light>code</v-icon>
      </v-btn>
    </v-toolbar>
    <main>
      <v-container fluid>
        <v-slide-y-transition mode="out-in">
          <v-layout column align-center>
            <Body/>
          </v-layout>
        </v-slide-y-transition>
      </v-container>
    </main>
    <div v-if="this.$route.path != '/students'">
      <router-link to="/students">
    <v-btn
    fab
    bottom
    right
    class="pink"
    dark
    fixed
    >
    <v-icon>add</v-icon>
    </v-btn>
    </router-link>
    </div>
    <!--<v-navigation-drawer-->
      <!--temporary-->
      <!--:right="right"-->
      <!--v-model="rightDrawer"-->
      <!--dark-->
    <!--&gt;-->
      <!--<v-list>-->
        <!--<v-list-tile @click="right = !right">-->
          <!--<v-list-tile-action>-->
            <!--<v-icon light>compare_arrows</v-icon>-->
          <!--</v-list-tile-action>-->
          <!--<v-list-tile-title>Switch drawer (click me)</v-list-tile-title>-->
        <!--</v-list-tile>-->
      <!--</v-list>-->
    <!--</v-navigation-drawer>-->
    <v-footer :fixed="fixed" light>
      <span>&copy; 2017</span>
    </v-footer>
  </v-app>
</template>

<script>
  import Body from './Body.vue'
  export default {
    name: 'main',
    data () {
      return {
        clipped: true,
        drawer: true,
        fixed: false,
        items: [
          { icon: 'home', title: 'Home' }
        ],
        miniVariant: true,
        right: true,
        rightDrawer: false,
        title: 'ALC Intermediate Web Track Assessment'
      }
    },
    components: {
      Body
    }
  }
</script>

<style>

</style>
