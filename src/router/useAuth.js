import { ref } from 'vue'
import router from './index'

const isAuthenticated = ref(false)
const userRole = ref('')

export function useAuth() {
  const login = (role) => {
    //localStorage,setItem('isAuthenticated', 'true')
    isAuthenticated.value = true
    userRole.value = role

    if (role === 'Admin') {
      alert('The user is admin')
      router.push({ name: 'AdminView' })
    } else if (role === 'user') {
      router.push({ name: 'About' })
    }
  }

  const logout = () => {
    //localStorage.removeItem('isAuthenticated')
    isAuthenticated.value = false
    userRole.value = ''
    router.push({ name: 'Home' })
  }

  return { isAuthenticated, userRole, login, logout }
}
