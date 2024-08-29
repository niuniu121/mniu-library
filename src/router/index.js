import { createRouter, createWebHistory } from 'vue-router'
import { useAuth } from '../router/authenticate'
import AboutView from '../views/AboutView.vue'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'

const { isAuthenticated } = useAuth()

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'About',
    component: AboutView,
    meta: { requiresAuth: true, role: 'Admin' }
  },
  {
    path: '/login',
    name: 'Login',
    component: LoginView
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  // Perform logic before every route change
  // console.log('router-to', to)
  // if (to.meta.role.includes('Admin')) {
  //   //console.log('router-to-role', to.meta.role)
  //   alert('Raise admin login')
  //   //next({ name: 'Lo' })
  // }
  if (to.name == 'About' && !isAuthenticated.value) {
    console.log('index,js', isAuthenticated.value)
    // For example, redirect to home if trying to access any other route
    alert('The user is not login')
    next({ name: 'Login' })
  } else {
    next()
  }
})

export default router
