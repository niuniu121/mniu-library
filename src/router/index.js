import { createRouter, createWebHistory } from 'vue-router'
import { useAuth } from '../router/authenticate'
import AboutView from '../views/AboutView.vue'
import AddBookView from '../views/AddBookView.vue'
import AdminView from '../views/AdminView.vue'
import CountBookAPI from '../views/CountBookAPI.vue'
import EditBookView from '../views/EditBookView.vue'
import FirebaseRegisterView from '../views/FirebaseRegisterView.vue'
import FirebaseSigninView from '../views/FirebaseSigninView.vue'
import GetAllBookAPI from '../views/GetAllBookAPI.vue'
import GetBookCountView from '../views/GetBookCountView.vue'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import WeatherView from '../views/WeatherView.vue'
//const { isAuthenticated,userRole } = useAuth()
const { isAuthenticated, userRole } = useAuth()

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
    meta: { requiresAuth: true, role: ['Admin', 'User'] }
  },
  {
    path: '/login',
    name: 'Login',
    component: LoginView
  },
  {
    path: '/admin',
    name: 'AdminView',
    component: AdminView
  },
  {
    path: '/FireLogin',
    name: 'FireLogin',
    component: FirebaseSigninView
  },
  {
    path: '/FireRegister',
    name: 'FireRegister',
    component: FirebaseRegisterView
  },
  {
    path: '/addBook',
    name: 'AddBook',
    component: AddBookView
  },
  {
    path: '/editBook',
    name: 'EditBook',
    component: EditBookView
  },
  {
    path: '/GetBookCount',
    name: 'GetBookCount',
    component: GetBookCountView
  },
  {
    path: '/WeatherView',
    name: 'WeatherView',
    component: WeatherView
  },
  {
    path: '/CountBookAPI',
    name: 'CountBookAPI',
    component: CountBookAPI
  },
  {
    path: '/GetAllBookAPI',
    name: 'GetAllBookAPI',
    component: GetAllBookAPI
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  // Perform logic before every route change
  console.log('router-to', to)

  if (to.meta.requiresAuth && !isAuthenticated.value) {
    next({ name: 'Login' })
  } else if (to.meta.role && to.meta.role.includes(userRole.value)) {
    if (userRole.value === 'Admin') {
      alert('The user is admin')
      //next(false)
      router.push({ name: 'AdminView' })
    } else {
      next()
    }
  } else {
    next()
  }
})

export default router
// if (to.meta.role === 'Admin') {
//   console.log('router-to-role', to.meta.role)

//   if (userRole === 'Admin') {
//     next()
//   } else {
//     alert('Raise admin login')
//     next({ name: 'Login' })
//   }
// }

// if (to.matched.some((record) => record.meta.requiresAuth)) {
//   //console.log('isAuthenticated2:' + localStorage.getItem('isAuthenticated'))
//   console.log('isAuthenticated2' + isAuthenticated.value)

//   if (!isAuthenticated) {
//     next({ name: 'Login' })
//   } else {
//     next()
//   }
// } else {
//   next()
// }
// if (to.meta.role.includes('Admin')) {
//   //console.log('router-to-role', to.meta.role)
//   if (userRole == 'Admin') {
//     next()
//   } else {
//     alert('Raise admin login')
//     next({ name: 'Login' })
//   }

//   //next({ name: 'Login' })
// }
// if (to.name == 'About' && !isAuthenticated.value) {
//   console.log('index,js', isAuthenticated.value)
//   // For example, redirect to home if trying to access any other route
//   alert('The user is not login')
//   next({ name: 'Login' })
// } else {
//   next()
// }
