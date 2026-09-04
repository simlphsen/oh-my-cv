<template>
  <div class="w-56 h-80">
    <UiDialog>
      <UiDialogTrigger as-child>
        <button
          class="resume-card group w-[210px] h-[299px] flex-center border-2 border-dashed glass bg-card/40 hover:bg-card/80 ring-when-focus"
          :aria-label="$t('dashboard.new')"
        >
          <span i-ic:round-plus text="5xl muted-foreground group-hover:primary" />
        </button>
      </UiDialogTrigger>

      <UiDialogContent class="sm:max-w-150 max-h-[85vh] overflow-y-auto">
        <UiDialogHeader>
          <UiDialogTitle text-xl>{{ $t("template.dialog.title") }}</UiDialogTitle>
          <UiDialogDescription>
            {{ $t("template.dialog.desc") }}
          </UiDialogDescription>
        </UiDialogHeader>

        <div class="grid grid-cols-2 md:grid-cols-4 gap-3 pt-2">
          <button
            v-for="template in templates"
            :key="template.id"
            class="glass-card group flex flex-col items-center gap-y-2.5 px-3 py-5 cursor-pointer ring-when-focus"
            :aria-label="$t(template.name)"
            @click="createWith(template.id)"
          >
            <!-- Template preview accent block -->
            <span
              class="size-14 rounded-2xl flex-center text-white shadow-lg transition-transform duration-200 group-hover:scale-110"
              :style="{ backgroundColor: template.accent }"
            >
              <span class="i-mdi:file-document-edit-outline text-2xl" />
            </span>

            <div text-center>
              <div text-sm font-medium>{{ $t(template.name) }}</div>
              <div class="mt-0.5 text-xs text-muted-foreground leading-snug">
                {{ $t(template.desc) }}
              </div>
            </div>
          </button>
        </div>
      </UiDialogContent>
    </UiDialog>
  </div>
</template>

<script lang="ts" setup>
const router = useRouter();
const localePath = useLocalePath();

const { TEMPLATE } = useConstant();
const templates = TEMPLATE.LIST;

const createWith = async (templateId: string) => {
  const data = await storageService.createResume(templateId);

  if (!data) return;
  else router.push(localePath(`/editor/${data.id}`));
};
</script>
