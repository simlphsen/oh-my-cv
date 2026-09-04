<template>
  <div id="dashboard-page" class="flex flex-col bg-secondary/50">
    <SharedHeader />

    <div
      class="workspace w-full mx-auto px-4 py-8"
      style="max-width: var(--page-max-w)"
      flex="~ col"
    >
      <!-- Page header (GitHub-style) -->
      <div class="px-2 space-y-2" md="hstack justify-between">
        <div class="space-y-1">
          <div class="hstack gap-x-3">
            <span
              class="size-10 rounded-lg bg-primary/10 text-primary flex-center glass"
            >
              <span i-ic:round-description text-2xl />
            </span>
            <h1 font-bold text-2xl sm:text-3xl>{{ $t("dashboard.my_resumes") }}</h1>
          </div>
          <div class="pl-13 text-sm text-muted-foreground">
            {{ $t("dashboard.subtitle") }}
          </div>
        </div>

        <div class="pl-13 md:pl-0">
          <DashboardFile @update="refresh" />
        </div>
      </div>

      <UiScrollArea class="flex-1 mt-5 px-2">
        <div class="gap-6 pt-4" flex="~ wrap" justify="center sm:start">
          <DashboardNewResume />

          <template v-if="status === 'success'">
            <DashboardResumeItem
              v-for="resume in resumes"
              :key="resume.id"
              :resume="resume"
              @update="refresh"
            />
          </template>
          <template v-else>
            <div v-for="i in 4" :key="i" class="w-56 h-80">
              <UiSkeleton class="w-[210px] h-[299px] bg-secondary mx-auto rounded-md" />
            </div>
          </template>
        </div>
      </UiScrollArea>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { DbResume } from "~/utils/storage";

const {
  data: resumes,
  refresh,
  status
} = useAsyncData<DbResume[]>("resume-list", () => storageService.getResumes(), {
  server: false,
  immediate: false,
  default: () => []
});

onMounted(refresh);
</script>
