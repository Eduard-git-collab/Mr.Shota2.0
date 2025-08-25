<template>
    <section class="panel">
      <header class="panel-header">
        <h2 class="panel-title">Clients</h2>
        <p class="panel-sub">Placeholder area for future client management.</p>
      </header>
      <div class="grid">
        <div class="client-card" v-for="n in 6" :key="n">
          <h3>Client {{ n }}</h3>
          <p>Short description placeholder...</p>
          <button class="mini-btn">Details</button>
        </div>
      </div>
    </section>
  </template>
  
  <script setup>
  </script>
  
  <style scoped>
  .panel {
    background:#ffffffd4;
    backdrop-filter:blur(8px);
    border:1px solid #00305622;
    border-radius:24px;
    padding:1.6rem 1.7rem 2rem;
    box-shadow:0 8px 28px -12px rgba(0,48,86,.35), 0 4px 12px -4px rgba(0,48,86,.25);
    display:flex;
    flex-direction:column;
    gap:1.25rem;
  }
  .panel-header { display:flex; flex-direction:column; gap:.4rem; }
  .panel-title {
    margin:0;
    font-size:1.2rem;
    font-weight:700;
    color:#003056;
    letter-spacing:.5px;
  }
  .panel-sub {
    margin:0;
    font-size:.7rem;
    letter-spacing:.6px;
    text-transform:uppercase;
    opacity:.7;
    color:#003056b0;
  }
  .grid {
    display:grid;
    gap:1.1rem;
    grid-template-columns:repeat(auto-fill,minmax(190px,1fr));
  }
  .client-card {
    background:#FBFBF7e6;
    border:1px solid #00305626;
    border-radius:18px;
    padding:.95rem 1rem 1.1rem;
    display:flex;
    flex-direction:column;
    gap:.55rem;
    box-shadow:0 4px 14px -6px rgba(0,48,86,.25);
    transition:box-shadow .25s, transform .25s, border-color .25s;
  }
  .client-card:hover {
    transform:translateY(-4px);
    border-color:#00305666;
    box-shadow:0 10px 26px -10px rgba(0,48,86,.45);
  }
  .client-card h3 {
    margin:0;
    font-size:.95rem;
    font-weight:600;
    color:#003056;
  }
  .client-card p {
    margin:0;
    font-size:.7rem;
    line-height:1.35;
    opacity:.75;
  }
  .mini-btn {
    margin-top:auto;
    background:#003056;
    color:#FBFBF7;
    border:none;
    font-size:.6rem;
    letter-spacing:.75px;
    text-transform:uppercase;
    font-weight:600;
    padding:.5rem .75rem;
    border-radius:8px;
    cursor:pointer;
    transition:background .2s;
  }
  .mini-btn:hover { background:#00263f; }
  </style>