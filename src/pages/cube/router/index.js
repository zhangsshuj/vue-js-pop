import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'ui',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/ui.vue')
  },
  {
      path: '/vs',
      name: 'vs',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "vs" */ '../views/vs.vue')
  },
    {
        path: '/editor',
        name: 'editor',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "vs" */ '../views/editor.vue')
    },
    {
        path: '/editor1',
        name: 'editor1',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "vs" */ '../views/editor1.vue')
    },
    {
        path: '/editor2',
        name: 'editor2',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "vs" */ '../views/editor2.vue')
    },
    {
        path: '/css',
        name: 'css',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "vs" */ '../views/css.vue')
    }
]

const router = new VueRouter({
  routes
})

export default router
