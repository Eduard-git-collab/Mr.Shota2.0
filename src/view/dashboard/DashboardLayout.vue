<template>
  <div class="dash-bg min-h-screen relative overflow-hidden">

    <!-- Header / Nav -->
    <header class="dash-header relative z-20">
      <div class="left">
        <div class="logo" @click="goHome">
          <Brandlogo bg-color="" accent-color="#FBFBF7" />
        </div>
        <h1 class="brand" @click="goHome">Dashboard</h1>
      </div>
      <nav class="main-nav">
        <RouterLink :to="{ name: 'DashboardBlogs' }" class="nav-link" :class="{ active: routeName==='DashboardBlogs'}">Blogs</RouterLink>
        <RouterLink :to="{ name: 'DashboardClients' }" class="nav-link" :class="{ active: routeName==='DashboardClients'}">Clients</RouterLink>
        <RouterLink :to="{ name: 'AllBlogs' }" class="nav-link" target="_blank">Public View</RouterLink>
      </nav>
      <div class="user-section" v-if="user">
        <span class="user-email">{{ user.email }}</span>
        <button class="signout" @click="handleSignOut">Sign Out</button>
      </div>
    </header>

    <!-- Main content -->
    <main class="dash-main relative z-10">
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

<style scoped>
.dash-bg { background:#FBFBF7; color:#1b2e3a; }

.bg-layer {
  position:absolute; left:50%; transform:translateX(-50%);
  border-radius:9999px 9999px 0 0; pointer-events:none;
}
.layer-1 { bottom:0; width:160vw; height:70vh; background:linear-gradient(to bottom,#0030564d 0%,#D8EFE34d 60%,transparent 80%); }
.layer-2 { bottom:-30px; width:150vw; height:65vh; background:linear-gradient(to bottom,#00305699 0%, #D8EFE333 55%, transparent 78%); }
.layer-3 { bottom:-50px; width:140vw; height:60vh; background:linear-gradient(to bottom,#003056b3 0%, #D8EFE333 45%, transparent 70%); }

.noise-texture {
  background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
  background-size:200px 200px;
  mix-blend-mode:multiply;
}

.dash-header {
  display:flex;
  align-items:center;
  gap:2rem;
  padding:.9rem 2rem;
  background:linear-gradient(120deg,#003056,#00273f);
  color:#FBFBF7;
  border-bottom:1px solid #003c67;
  backdrop-filter:blur(6px);
  box-shadow:0 6px 22px -10px rgba(0,0,0,.55);
}
.left {
  display:flex;
  align-items:center;
  gap:.9rem;
}
.logo { width:48px; height:48px; display:flex; align-items:center; justify-content:center; cursor:pointer; }
.brand { margin:0; font-size:1.05rem; font-weight:600; cursor:pointer; letter-spacing:.6px; }
.main-nav {
  display:flex;
  gap:1rem;
  flex:1;
}
.nav-link {
  color:#d0dde5;
  text-decoration:none;
  padding:.55rem .9rem;
  font-size:.7rem;
  font-weight:600;
  letter-spacing:.8px;
  text-transform:uppercase;
  border-radius:10px;
  background:#ffffff10;
  border:1px solid #ffffff18;
  transition:background .25s, color .25s, box-shadow .25s, border-color .25s;
  backdrop-filter:blur(4px);
}
.nav-link:hover { background:#ffffff25; color:#fff; border-color:#ffffff40; }
.nav-link.active {
  background:#FBFBF7;
  color:#003056;
  border-color:#FBFBF7;
  box-shadow:0 4px 14px -6px #ffffffaa;
}

.user-section {
  display:flex; align-items:center; gap:.9rem;
  font-size:.7rem; letter-spacing:.5px;
}
.user-email { opacity:.9; font-weight:500; }
.signout {
  background:#c51919;
  color:#fff;
  border:none;
  padding:.55rem .85rem;
  font-size:.6rem;
  font-weight:600;
  letter-spacing:.75px;
  text-transform:uppercase;
  border-radius:8px;
  cursor:pointer;
  transition:background .25s;
}
.signout:hover { background:#9f1414; }

.dash-main {
  padding:2rem clamp(1rem,4vw,3rem) 4rem;
  display:flex;
  flex-direction:column;
  gap:1.5rem;
  position:relative;
  z-index:10;
}
</style>