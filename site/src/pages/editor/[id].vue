<template>
  <div id="editor-page" class="flex flex-col">
    <SharedHeader>
      <template #tail>
        <UiButton
          variant="ghost-secondary"
          size="round"
          @click="isToolbarOpen = !isToolbarOpen"
          :aria-label="isToolbarOpen ? $t('close_toolbar') : $t('open_toolbar')"
        >
          <span
            :class="[
              'size-4.5',
              isToolbarOpen
                ? 'i-tabler:layout-sidebar-right-collapse'
                : 'i-tabler:layout-sidebar-right-expand'
            ]"
          />
        </UiButton>
      </template>
    </SharedHeader>

    <div class="workspace flex px-3 pb-3 gap-1.5">
      <SplitterGroup id="splitter-editor" direction="horizontal">
        <SplitterPanel id="code-pane" class="py-2">
          <EditorCode v-if="data.loaded" />
          <div v-else class="flex flex-col gap-y-2 h-full">
            <UiSkeleton class="h-10 bg-secondary" />
            <UiSkeleton class="flex-1 bg-secondary" />
          </div>
        </SplitterPanel>

        <SplitterResizeHandle
          id="code-preview-handle"
          class="w-3 relative after:(content-[''] absolute bg-gray-400/40 w-1 h-10 rounded-full inset-0 m-auto)"
        />

        <SplitterPanel id="preview-pane" class="py-2">
          <EditorPreview v-if="data.loaded" />
          <UiSkeleton v-else class="size-full bg-secondary" />
        </SplitterPanel>
      </SplitterGroup>

      <div
        v-if="isToolbarOpen"
        id="tools-pane"
        class="py-2"
        lt-lg="fixed z-10 max-w-full h-full right-0 top-12 pb-10"
      >
        <EditorToolbar v-if="data.loaded" />
        <UiSkeleton v-else class="h-full w-62 bg-secondary mr-10" />
      </div>

      <!-- Autosave indicator -->
      <Transition
        enter-active-class="transition-opacity duration-300"
        leave-active-class="transition-opacity duration-300"
        enter-from-class="opacity-0"
        leave-to-class="opacity-0"
      >
        <div
          v-show="autosaved"
          class="fixed bottom-4 right-4 z-20 hstack gap-x-1.5 glass glass-strong px-3 py-1.5 text-xs text-muted-foreground pointer-events-none"
        >
          <span class="i-line-md:confirm text-primary" />
          {{ $t("editor.autosaved") }}
        </div>
      </Transition>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { isInteger } from "@renovamen/utils";

const route = useRoute();
const { data } = useDataStore();
const { styles } = useStyleStore();

// Fetch resume data
onMounted(() => {
  if (isInteger(route.params.id, { allowString: true })) {
    storageService.switchToResume(Number(route.params.id));
  }
});

// Toogle toolbar
const { width } = useWindowSize();
const isToolbarOpen = ref(width.value > 1024);

// === Autosave ===
const autosaved = ref(false);
const suppressAutosave = ref(false);

// Skip saving while the resume is being loaded into the store
watch(
  () => data.loaded,
  (loaded) => {
    if (loaded) {
      suppressAutosave.value = true;
      setTimeout(() => {
        suppressAutosave.value = false;
      }, 500);
    }
  }
);

const save = async () => {
  if (!data.loaded || data.resumeId === null || suppressAutosave.value) return;

  await storageService.updateResume(
    {
      id: data.resumeId,
      name: data.resumeName,
      markdown: data.markdown,
      css: data.css,
      styles: toRaw(styles)
    },
    true,
    true
  );

  autosaved.value = true;
  setTimeout(() => {
    autosaved.value = false;
  }, 2000);
};

// Debounce and watch markdown / css / styles changes
watchDebounced(
  [() => data.markdown, () => data.css, () => toRaw(styles)],
  save,
  {
    debounce: 800,
    deep: true
  }
);
</script>
