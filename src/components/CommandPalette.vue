<script setup lang="ts">
import { useEditorStore } from "@/stores/editor";
import { computed, nextTick, onMounted, onUnmounted, ref } from "vue";

const isOpen = ref(false);
const searchQuery = ref("");
const selectedIndex = ref(0);
const inputRef = ref<HTMLInputElement | null>(null);
const store = useEditorStore();

const commands = [
  {
    id: "toggle-preview",
    title: "Toggle Preview",
    description: "Show or hide the preview panel",
    shortcut: "⌘U",
    action: () => store.togglePreview(),
  },
  {
    id: "toggle-word-wrap",
    title: "Toggle Word Wrap",
    description: "Enable/disable word wrapping in editor",
    shortcut: "⌥Z",
    action: () => store.toggleWordWrap(),
  },
  {
    id: "format-document",
    title: "Format Document",
    description: "Format the markdown document",
    shortcut: "⇧⌥F",
    action: formatDocument,
  },
  {
    id: "toggle-editor",
    title: "Toggle Editor",
    description: "Show or hide the editor panel",
    shortcut: "⌘E",
    action: () => store.toggleEditor(),
  },
];

function formatDocument() {
  // TODO: Implement document formatting
  // For now, this is just a placeholder
  const formattedContent = store.content;
  store.updateContent(formattedContent);
}

const showCommands = computed(() => searchQuery.value.startsWith(">"));

const filteredCommands = computed(() => {
  if (!showCommands.value) return [];

  const query = searchQuery.value.slice(1).toLowerCase().trim();
  if (!query) return commands;

  return commands.filter((command) => {
    const titleMatch = command.title.toLowerCase().includes(query);
    const descMatch = command.description.toLowerCase().includes(query);
    return titleMatch || descMatch;
  });
});

function openPalette() {
  isOpen.value = true;
  searchQuery.value = "";
  selectedIndex.value = 0;
  // Use nextTick to ensure the input is mounted
  nextTick(() => {
    inputRef.value?.focus();
  });
}

function closePalette() {
  isOpen.value = false;
  searchQuery.value = "";
}

function handleKeydown(e: KeyboardEvent) {
  // Global shortcuts that work regardless of command palette state
  if (e.metaKey || e.ctrlKey) {
    switch (e.key.toLowerCase()) {
      case "p":
        e.preventDefault();
        if (isOpen.value) closePalette();
        else openPalette();
        return;
      case "e":
        e.preventDefault();
        store.toggleEditor();
        return;
      case "u":
        e.preventDefault();
        store.togglePreview();
        return;
    }
  }

  // Alt+Z for word wrap
  if (e.altKey && e.key.toLowerCase() === "z") {
    e.preventDefault();
    store.toggleWordWrap();
    return;
  }

  // Command palette specific shortcuts (only when open)
  if (!isOpen.value) return;

  switch (e.key) {
    case "ArrowDown":
      e.preventDefault();
      if (filteredCommands.value.length > 0) {
        selectedIndex.value =
          (selectedIndex.value + 1) % filteredCommands.value.length;
      }
      break;
    case "ArrowUp":
      e.preventDefault();
      if (filteredCommands.value.length > 0) {
        selectedIndex.value =
          selectedIndex.value - 1 < 0
            ? filteredCommands.value.length - 1
            : selectedIndex.value - 1;
      }
      break;
    case "Enter":
      e.preventDefault();
      if (filteredCommands.value[selectedIndex.value]) {
        filteredCommands.value[selectedIndex.value].action();
        isOpen.value = false;
      }
      break;
    case "Escape":
      e.preventDefault();
      isOpen.value = false;
      break;
    case "Tab":
      e.preventDefault();
      if (filteredCommands.value.length > 0) {
        selectedIndex.value =
          (selectedIndex.value + 1) % filteredCommands.value.length;
      }
      break;
    case "n":
      if (e.ctrlKey || e.metaKey) {
        e.preventDefault();
        if (filteredCommands.value.length > 0) {
          selectedIndex.value =
            (selectedIndex.value + 1) % filteredCommands.value.length;
        }
      }
      break;
  }
}

onMounted(() => {
  window.addEventListener("keydown", handleKeydown);
});

onUnmounted(() => {
  window.removeEventListener("keydown", handleKeydown);
});

function executeCommand(command: (typeof commands)[0]) {
  command.action();
  isOpen.value = false;
}
</script>

<template>
  <Transition
    enter-active-class="transition duration-75 ease-out"
    enter-from-class="transform scale-95 opacity-0"
    enter-to-class="transform scale-100 opacity-100"
    leave-active-class="transition duration-50 ease-in"
    leave-from-class="transform scale-100 opacity-100"
    leave-to-class="transform scale-95 opacity-0"
  >
    <div v-if="isOpen" class="fixed inset-0 z-50" @click="closePalette">
      <div class="min-h-screen px-4 text-center">
        <div class="fixed inset-0 bg-black/50" aria-hidden="true" />

        <div
          class="inline-block w-full max-w-2xl mt-[15vh] transform text-left align-middle transition-all"
          @click.stop
        >
          <div
            class="bg-[#1d1d1d] rounded-lg shadow-2xl overflow-hidden border border-[#323232]"
          >
            <div class="p-3 border-b border-[#323232]">
              <input
                ref="inputRef"
                v-model="searchQuery"
                type="text"
                class="w-full bg-transparent text-white px-2 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-purple-400"
                placeholder="Type > to see available commands..."
              />
            </div>

            <div
              v-if="showCommands"
              class="max-h-[440px] overflow-y-auto"
              role="listbox"
            >
              <div
                v-for="(command, index) in filteredCommands"
                :key="command.id"
                role="option"
                class="px-3 py-2 cursor-pointer text-sm"
                :class="{
                  'bg-[#2a2a2a]': index === selectedIndex,
                  'hover:bg-[#2a2a2a]': index !== selectedIndex,
                }"
                @click="executeCommand(command)"
                @mouseenter="selectedIndex = index"
              >
                <div class="flex items-center justify-between">
                  <div class="flex items-center space-x-3">
                    <div class="text-white">
                      {{ command.title }}
                    </div>
                    <div class="text-gray-400">
                      {{ command.description }}
                    </div>
                  </div>
                  <div class="text-gray-500 font-mono text-xs">
                    {{ command.shortcut }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>
