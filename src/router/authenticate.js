import { ref } from 'vue'
import router from './index'

const isAuthenticated = ref(false)
const userLogin = ref(false)
const userRole = ref('')

export function useAuth() {
  const login = (role) => {
    //localStorage,setItem('isAuthenticated', 'true')
    isAuthenticated.value = true
    userLogin.value = true
    userRole.value = role
    alert('Login Success')
    router.push({ name: 'About' })
  }

  const logout = () => {
    //localStorage.removeItem('isAuthenticated')
    isAuthenticated.value = false
    router.push({ name: 'Home' })
  }

  return { isAuthenticated, userRole, login, logout }
}
