<template>
  <section class="flex flex-col gap-6 rounded-3xl border border-slate-800 bg-slate-900/70 p-8 shadow-xl backdrop-blur">
    <header class="flex flex-col gap-2">
      <h2 class="m-0 text-xl font-bold tracking-wide text-slate-100">Clients</h2>
      <p class="m-0 text-[10px] font-semibold uppercase tracking-wide text-slate-400">
        Placeholder area for future client management.
      </p>
    </header>
    <div class="grid gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
      <div
        class="flex flex-col gap-3 rounded-2xl border border-slate-700/70 bg-slate-800/50 p-5 shadow hover:-translate-y-1 hover:border-slate-500 hover:shadow-lg transition"
        v-for="n in 6"
        :key="n"
      >
        <h3 class="m-0 text-base font-semibold text-slate-100">Client {{ n }}</h3>
        <p class="m-0 text-xs leading-relaxed text-slate-400">
          Short description placeholder...
        </p>
        <button
          class="mt-auto w-fit rounded-md bg-slate-700 px-3 py-2 text-[10px] font-semibold uppercase tracking-wide text-slate-100 hover:bg-slate-600"
        >
          Details
        </button>
      </div>
    </div>
  </section>
</template>
