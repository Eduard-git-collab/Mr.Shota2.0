<template>
  <div class="min-h-screen w-full bg-slate-950 text-slate-100">
    <!-- Header / Nav -->
    <header class="flex items-center gap-8 px-6 py-4 bg-gradient-to-r from-slate-950 via-slate-900 to-slate-800 border-b border-slate-800 shadow-lg">
      <div class="flex items-center gap-4">
        <div class="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-800 cursor-pointer hover:ring hover:ring-slate-600 transition" @click="goHome">
          <Brandlogo bg-color="" accent-color="#FBFBF7" />
        </div>
        <h1 class="m-0 cursor-pointer select-none text-lg font-semibold tracking-wide" @click="goHome">Dashboard</h1>
      </div>
      <nav class="flex flex-1 gap-3">
        <RouterLink
          :to="{ name: 'DashboardBlogs' }"
          class="rounded-lg border border-transparent px-4 py-2 text-[11px] font-semibold uppercase tracking-wide text-slate-300 transition hover:text-white hover:bg-slate-800/60"
          :class="routeName==='DashboardBlogs' && 'bg-slate-100 text-slate-900 shadow-sm border-slate-100'"
        >Blogs</RouterLink>
        <RouterLink
          :to="{ name: 'BlogTemplates' }"
          class="rounded-lg border border-transparent px-4 py-2 text-[11px] font-semibold uppercase tracking-wide text-slate-300 transition hover:text-white hover:bg-slate-800/60"
          :class="routeName==='BlogTemplates' && 'bg-slate-100 text-slate-900 shadow-sm border-slate-100'"
        >Blog Templates</RouterLink>
        <RouterLink
          :to="{ name: 'DashboardClients' }"
          class="rounded-lg border border-transparent px-4 py-2 text-[11px] font-semibold uppercase tracking-wide text-slate-300 transition hover:text-white hover:bg-slate-800/60"
          :class="routeName==='DashboardClients' && 'bg-slate-100 text-slate-900 shadow-sm border-slate-100'"
        >Clients</RouterLink>
        <RouterLink
          :to="{ name: 'AllBlogs' }"
          class="rounded-lg border border-transparent px-4 py-2 text-[11px] font-semibold uppercase tracking-wide text-slate-300 transition hover:text-white hover:bg-slate-800/60"
          target="_blank"
        >Public View</RouterLink>
      </nav>
      <div class="flex items-center gap-4 text-[11px] font-medium" v-if="user">
        <RouterLink to="/" class="text-slate-300 hover:text-white">Home</RouterLink>
        <span class="rounded bg-slate-800 px-3 py-1 text-slate-300">{{ user.email }}</span>
        <button
          class="rounded-md bg-rose-600 px-3 py-2 text-[10px] font-semibold uppercase tracking-wide text-white shadow hover:bg-rose-500"
          @click="handleSignOut"
        >
          Sign Out
        </button>
      </div>
    </header>

    <!-- Main content -->
    <main class="relative z-10 flex flex-col gap-6 px-6 py-10 lg:px-12">
      <router-view />
    </main>
  </div>
</template>

<script setup>
import { useAuth, signOut } from '../../auth/useAuth'
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import Brandlogo from '../../assets/logos/brandlogo.vue'

const { user } = useAuth()
const route = useRoute()
const router = useRouter()
const routeName = computed(() => route.name)

function goHome() {
  router.push({ name: 'DashboardBlogs' })
}

async function handleSignOut() {
  await signOut()
  router.push({ name: 'Login' })
}
</script>
