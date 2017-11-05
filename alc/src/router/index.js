import Vue from 'vue'
import Router from 'vue-router'
import UpdateStudent from '../components/updateStudent.vue'
import Main from '../components/main.vue'
import Form from '../components/form.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'App',
      component: Main,
      children: [
        {
          path: '/students',
          name: 'Students',
          component: Form
        },
        {
          path: '/student/:id',
          name: 'UpdateStudent',
          component: UpdateStudent
        }
      ]
    }
  ],
  mode: 'history',
  base: __dirname
})
