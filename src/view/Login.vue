<template>
    <div class="login-page min-h-screen flex items-center justify-center relative overflow-hidden font-poppins">
      <!-- OPTIONAL subtle layered background (same palette, very light). Remove if unwanted -->
      <div class="bg-layer layer-1"></div>
      <div class="bg-layer layer-2"></div>
      <div class="bg-layer layer-3"></div>
  
      <!-- Main card -->
      <div class="relative z-10 w-full max-w-[440px] px-6 sm:px-8 py-10 rounded-2xl shadow-lg login-card">
        <a class="inline-flex items-center gap-2 text-sm mb-6 link-inline" href="/">
          <svg width="10" height="14" viewBox="0 0 320 512" class="opacity-80">
            <path
              fill="currentColor"
              d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l192 192c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L77.3 256 246.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-192 192z"
            />
          </svg>
          <span>Back to site</span>
        </a>
  
        <header class="mb-8">
          <h1 class="text-3xl font-bold font-figtree text-primary tracking-tight">Sign In</h1>
          <p class="mt-2 text-sm text-text-soft">
            Enter your email and password to access your dashboard.
          </p>
        </header>
  
        <form @submit.prevent="handleSubmit" novalidate class="flex flex-col gap-5">
          <!-- Email -->
          <div class="form-group">
            <label for="email" class="form-label">Email *</label>
            <input
              v-model="email"
              id="email"
              name="email"
              type="email"
              autocomplete="email"
              autocapitalize="none"
              autocorrect="off"
              required
              placeholder="you@example.com"
              class="input"
              :aria-invalid="Boolean(error)"
            />
          </div>
  
          <!-- Password -->
          <div class="form-group">
            <label for="password" class="form-label">Password *</label>
              <input
                v-model="password"
                id="password"
                name="password"
                type="password"
                autocomplete="current-password"
                required
                placeholder="••••••••"
                class="input"
                :aria-invalid="Boolean(error)"
              />
          </div>
  
          <div class="flex items-center justify-between -mt-1">
            <label class="inline-flex items-center gap-2 text-xs text-text-mute">
              <input
                type="checkbox"
                v-model="remember"
                class="h-4 w-4 rounded border border-border bg-white text-primary focus:ring-2 focus:ring-primary/40 focus:outline-none"
              />
              <span>Remember me</span>
            </label>
            <button type="button" class="text-xs link-inline font-medium">
              Forgot password?
            </button>
          </div>
  
          <button
            type="submit"
            :disabled="submitting"
            class="btn-primary w-full mt-2"
          >
            <span v-if="!submitting">Login</span>
            <span v-else class="inline-flex items-center gap-2">
              <svg class="animate-spin h-4 w-4" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10"
                        stroke="currentColor" stroke-width="4" fill="none" />
                <path class="opacity-85" fill="currentColor"
                      d="M4 12a8 8 0 018-8v3a5 5 0 00-5 5H4z" />
              </svg>
              Signing in…
            </span>
          </button>
  
          <p v-if="error" class="error-msg" role="alert">
            {{ error }}
          </p>
        </form>
  
        <p class="mt-8 text-xs text-text-mute text-center">
          Don’t have an account?
          <router-link to="/signup" class="link-inline font-medium">Create one</router-link>
        </p>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  import { signIn, useAuth } from '../auth/useAuth'
  import { useRoute, useRouter } from 'vue-router'
  
  const email = ref('')
  const password = ref('')
  const remember = ref(false)
  const submitting = ref(false)
  const error = ref('')
  const route = useRoute()
  const router = useRouter()
  const { isAuthenticated } = useAuth()
  
  // If already logged in, redirect (adjust route name if needed)
  if (isAuthenticated.value) {
    router.replace({ name: 'DashboardBlogs' })
  }
  
  async function handleSubmit() {
    error.value = ''
    if (!email.value || !password.value) {
      error.value = 'Email and password are required.'
      return
    }
    submitting.value = true
    const { error: signInError } = await signIn(email.value, password.value, { remember: remember.value })
    submitting.value = false
    if (signInError) {
      error.value = signInError.message || 'Sign in failed.'
      return
    }
    const redirect = route.query.redirect || '/dashboard'
    router.replace(redirect)
  }
  </script>
  
  <style scoped>
  /* Palette (local fallback if global tokens.css not loaded) */
  :root, :host {
    --color-bg:#FBFBF7;
    --color-primary:#003056;
    --color-primary-hover:#00263f;
    --color-accent:#D8EFE3;
    --color-border:#CBD7DE;
    --color-border-strong:#98B3C2;
    --color-text:#0f2a36;
    --color-text-soft:#4a6573;
    --color-text-mute:#6c8692;
    --color-danger:#C62828;
    --focus-ring:0 0 0 3px rgba(0,48,86,.35);
    --radius-sm:6px;
    --radius-md:12px;
    --radius-lg:18px;
    --elevation:0 8px 20px -10px rgba(0,48,86,.25), 0 2px 6px -2px rgba(0,48,86,.15);
  }
  
  .font-figtree {
    font-family:'Figtree', system-ui, -apple-system, BlinkMacSystemFont,"Segoe UI",Roboto,Ubuntu,"Open Sans","Helvetica Neue",Arial,sans-serif;
  }
  .font-poppins {
    font-family:'Poppins', system-ui, -apple-system, BlinkMacSystemFont,"Segoe UI",Roboto,Ubuntu,"Open Sans","Helvetica Neue",Arial,sans-serif;
  }
  
  .login-page {
    background: var(--color-bg);
    padding: clamp(1.25rem, 3vw, 2.5rem) 1rem;
  }
  
  /* Subtle radial wave layers (very soft) */
  .bg-layer {
    position:absolute;
    left:50%; transform:translateX(-50%);
    pointer-events:none;
    border-radius:9999px 9999px 0 0;
    mix-blend-mode:multiply;
  }
  .layer-1 {
    bottom:0;
    width:160vw; height:70vh;
    background:radial-gradient(ellipse at center, #D8EFE3 0%, rgba(216,239,227,.55) 40%, transparent 70%);
    opacity:.55;
  }
  .layer-2 {
    bottom:-40px;
    width:150vw; height:62vh;
    background:radial-gradient(ellipse at center, rgba(0,82,118,0.18) 0%, rgba(0,48,86,0.12) 45%, transparent 75%);
    opacity:.35;
  }
  .layer-3 {
    bottom:-70px;
    width:140vw; height:55vh;
    background:radial-gradient(ellipse at center, rgba(0,48,86,0.22) 0%, rgba(0,48,86,0.12) 50%, transparent 78%);
    opacity:.28;
  }
  
  .login-card {
    background:#ffffffd9;
    backdrop-filter:blur(8px);
    border:1px solid #ffffff;
    box-shadow:var(--elevation);
  }
  
  .form-group { display:flex; flex-direction:column; gap:.4rem; }
  .form-label {
    font-size:.7rem;
    font-weight:600;
    letter-spacing:.75px;
    text-transform:uppercase;
    color:var(--color-text-mute);
  }
  
  .input {
    appearance:none;
    width:100%;
    border:1px solid var(--color-border);
    background:#fff;
    border-radius:var(--radius-md);
    padding:.75rem .9rem;
    font-size:.85rem;
    font-weight:500;
    color:var(--color-text);
    transition:border-color .2s, box-shadow .2s, background .2s;
  }
  .input::placeholder {
    color:var(--color-text-mute);
    font-weight:400;
  }
  .input:focus {
    outline:none;
    border-color:var(--color-primary);
    box-shadow:var(--focus-ring);
    background:#fff;
  }
  
  .btn-primary {
    display:inline-flex;
    align-items:center;
    justify-content:center;
    gap:.5rem;
    font-size:.9rem;
    font-weight:600;
    letter-spacing:.4px;
    padding:.9rem 1.1rem;
    border-radius:var(--radius-md);
    border:1px solid var(--color-primary);
    background:var(--color-primary);
    color:#fff;
    transition:background .2s, box-shadow .2s, transform .2s;
    box-shadow:0 4px 14px -4px rgba(0,48,86,.4);
  }
  .btn-primary:hover:not(:disabled) {
    background:var(--color-primary-hover);
  }
  .btn-primary:active:not(:disabled) {
    transform:translateY(1px);
  }
  .btn-primary:focus-visible {
    outline:none;
    box-shadow:var(--focus-ring), 0 4px 14px -4px rgba(0,48,86,.55);
  }
  .btn-primary:disabled {
    opacity:.6;
    cursor:not-allowed;
    box-shadow:none;
  }
  
  .link-inline {
    color:var(--color-primary);
    text-decoration:none;
    position:relative;
    transition:color .2s;
  }
  .link-inline:hover {
    color:var(--color-primary-hover);
    text-decoration:underline;
  }
  
  .error-msg {
    margin-top:.5rem;
    font-size:.75rem;
    color:var(--color-danger);
    background:#fff5f5;
    border:1px solid #f3c2c2;
    padding:.55rem .7rem;
    border-radius:var(--radius-md);
    line-height:1.3;
  }
  
  /* Smaller screens tweak */
  @media (max-width:520px) {
    .login-card {
      padding:2.75rem 1.4rem 2.25rem;
    }
    .btn-primary {
      font-size:.85rem;
      padding:.85rem 1rem;
    }
  }
  </style>