<template>
  <div id="landing-page" class="relative isolate min-h-screen overflow-hidden">
    <SharedHeader />

    <!-- Decorative background -->
    <div aria-hidden="true" class="pointer-events-none absolute inset-0 -z-1">
      <div
        class="absolute -top-32 left-1/2 size-150 -translate-x-1/2 rounded-full bg-primary/15 blur-3xl"
      />
      <div class="absolute top-1/3 -left-40 size-100 rounded-full bg-blue-400/10 blur-3xl" />
      <div class="absolute -bottom-20 -right-32 size-100 rounded-full bg-sky-400/10 blur-3xl" />
      <div
        class="absolute inset-0 opacity-[0.04] [background-image:radial-gradient(hsl(var(--foreground))_1px,transparent_1px)] [background-size:32px_32px]"
      />
    </div>

    <div
      class="h-fit max-w-240 sm:(absolute inset-0 m-auto)"
      p="x-5 t-30 md:x-20 lt-sm:b-10"
    >
      <div text-center>
        <h1
          class="mx-auto max-w-4xl text-4xl font-bold leading-tight tracking-tight sm:text-6xl"
          v-html="$t('landing.hero')"
        />

        <div my-8 text="lg sm:xl" class="mx-auto max-w-2xl text-muted-foreground">
          <SharedBrandName /> {{ $t("landing.desc") }}
        </div>

        <UiButton
          :as="NuxtLink"
          :to="$nuxt.$localePath('/dashboard')"
          class="h-12 px-8 text-base font-medium shadow-lg shadow-primary/20 transition-all hover:(shadow-xl shadow-primary/30 -translate-y-0.5)"
        >
          {{ $t("landing.start") }}
        </UiButton>
      </div>

      <div m="t-14 sm:t-16 x-auto" grid="~ cols-1 sm:cols-2 gap-4 sm:gap-6" max-w-150>
        <div
          v-for="i in [0, 1]"
          :key="i"
          class="glass-card p-6 transition-transform duration-200 hover:-translate-y-1"
        >
          <div hstack mb-4 gap-x-3>
            <span
              :class="[
                'size-10 rounded-xl flex-center',
                i ? 'bg-blue-500/10 text-blue-500' : 'bg-primary/10 text-primary'
              ]"
            >
              <span :class="[i ? 'i-wpf:privacy' : 'i-mdi:rocket-launch', 'text-xl']" />
            </span>
            <h2 text-lg font-semibold>{{ $t(`landing.feats[${i}].title`) }}</h2>
          </div>

          <ul text="sm muted-foreground" space-y-2 pl-5 list-disc>
            <li
              v-for="line in $t(`landing.feats[${i}].items`).split('<br>')"
              :key="line"
              v-html="line"
            />
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { NuxtLink } from "#components";
</script>
