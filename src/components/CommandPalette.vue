<script setup lang="ts">
import { useCommandPalette } from '@/composables/useCommandPalette'

const {
  isOpen,
  searchQuery,
  selectedIndex,
  inputRef,
  showCommands,
  filteredCommands,
  openPalette,
  closePalette,
  executeCommand,
} = useCommandPalette()
</script>

<template>
  <Transition
    enter-active-class="transition duration-100 ease-out"
    enter-from-class="transform scale-95 opacity-0"
    enter-to-class="transform scale-100 opacity-100"
    leave-active-class="transition duration-75 ease-in"
    leave-from-class="transform scale-100 opacity-100"
    leave-to-class="transform scale-95 opacity-0"
  >
    <div v-if="isOpen" class="fixed inset-0 z-50 flex items-start justify-center" @click="closePalette">
      <div class="fixed inset-0 bg-black/50" aria-hidden="true" />

      <div
        class="relative w-[600px] mt-[10vh] transform"
        @click.stop
      >
        <div class="bg-[#252526] rounded-lg shadow-2xl overflow-hidden border border-[#3c3c3c]">
          <!-- Search Input -->
          <div class="p-1.5 border-b border-[#3c3c3c]">
            <div class="flex items-center px-2 py-1 bg-[#3c3c3c] rounded">
              <svg class="w-4 h-4 text-[#858585] mr-2" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M10.5 10.5L13.5 13.5M6.5 11.5C3.73858 11.5 1.5 9.26142 1.5 6.5C1.5 3.73858 3.73858 1.5 6.5 1.5C9.26142 1.5 11.5 3.73858 11.5 6.5C11.5 9.26142 9.26142 11.5 6.5 11.5Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
              <input
                ref="inputRef"
                v-model="searchQuery"
                type="text"
                class="w-full bg-transparent text-[#cccccc] text-sm focus:outline-none placeholder-[#858585]"
                placeholder="Type > to see available commands..."
              >
            </div>
          </div>

          <!-- Command List -->
          <div
            v-if="showCommands"
            class="max-h-[440px] overflow-y-auto"
            role="listbox"
          >
            <div
              v-for="(command, index) in filteredCommands"
              :key="command.id"
              role="option"
              class="px-2 py-1.5 cursor-pointer text-sm flex items-center"
              :class="{
                'bg-[#04395e] text-white': index === selectedIndex,
                'text-[#cccccc] hover:bg-[#2a2d2e]': index !== selectedIndex,
              }"
              @click="executeCommand(command)"
              @mouseenter="selectedIndex = index"
            >
              <!-- Command Icon -->
              <svg class="w-4 h-4 mr-3 flex-shrink-0" :class="index === selectedIndex ? 'text-white' : 'text-[#858585]'" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M13.5 8.5L8 14L2.5 8.5M13.5 2.5L8 8L2.5 2.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
              </svg>

              <!-- Command Info -->
              <div class="flex-1 min-w-0">
                <div class="flex items-center justify-between">
                  <span class="truncate font-medium">
                    {{ command.title }}
                  </span>
                  <span
                    class="ml-4 flex-shrink-0 font-mono text-xs px-1.5 py-0.5 rounded"
                    :class="index === selectedIndex ? 'bg-[#1c5c92] text-white' : 'bg-[#333333] text-[#858585]'"
                  >
                    {{ command.shortcut }}
                  </span>
                </div>
                <div
                  class="text-xs mt-0.5 truncate"
                  :class="index === selectedIndex ? 'text-[#ccccccc]' : 'text-[#858585]'"
                >
                  {{ command.description }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>

<style scoped>
::-webkit-scrollbar {
  width: 10px;
}

::-webkit-scrollbar-track {
  background: transparent;
}

::-webkit-scrollbar-thumb {
  background: #424242;
  border: 2px solid #252526;
  border-radius: 5px;
}

::-webkit-scrollbar-thumb:hover {
  background: #4f4f4f;
}
</style>
