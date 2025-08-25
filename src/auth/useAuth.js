import { ref, computed } from 'vue'
import { supabase } from '../lib/supabaseClient'

const user = ref(null)
const loadingInitial = ref(true)
const authReadyPromise = init()

function init() {
  return supabase.auth.getSession()
    .then(({ data: { session } }) => {
      user.value = session?.user || null
    })
    .finally(() => {
      loadingInitial.value = false
    })

}

supabase.auth.onAuthStateChange((_event, session) => {
  user.value = session?.user || null
})

export async function signIn(email, password) {
  const { data, error } = await supabase.auth.signInWithPassword({ email, password })
  if (error) return { error }
  user.value = data.user
  return { user: data.user }
}

export async function signOut() {
  await supabase.auth.signOut()
  user.value = null
}

export function useAuth() {
  return {
    user: computed(() => user.value),
    isAuthenticated: computed(() => !!user.value),
    loadingInitial: computed(() => loadingInitial.value),
    authReadyPromise
  }
}