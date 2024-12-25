<template>
  <header class="bg-[#141414]">
    <div class="flex items-center justify-between h-14">
      <!-- Logo Section -->
      <div class="flex items-center gap-3">
        <div class="h-6 w-6 rounded-full bg-purple-500" />
        <div class="flex items-center">
          <span class="text-white font-semibold">Minimal</span>
          <span class="text-purple-400 font-semibold">Blog</span>
        </div>
      </div>

      <!-- Actions -->
      <div class="flex items-center gap-4">
        <div class="bg-purple-500/10 px-4 py-1.5 rounded-full">
          <span class="text-purple-400 text-sm">Saved ✓</span>
        </div>
        <button
          class="w-8 h-8 rounded-full bg-[#1d1d1d] text-white flex items-center justify-center"
        >
          ?
        </button>
      </div>
    </div>
  </header>
</template>
