<template>
  <header
    class="relative sticky top-0 z-40 hstack justify-between pl-4 pr-1 glass-strong rounded-none border-x-0 border-t-0"
  >
    <nuxt-link
      class="hstack gap-x-2 transition-opacity hover:opacity-75"
      :to="$nuxt.$localePath('/')"
    >
      <SharedLogo text-base />
      <div text-lg><SharedBrandName /></div>
    </nuxt-link>

    <div class="hstack">
      <!-- Desktop nav (hidden on mobile) -->
      <div class="hstack lt-md:hidden">
        <UiButton
          :as="NuxtLink"
          :to="$nuxt.$localePath('/dashboard')"
          variant="ghost-secondary"
          size="xs"
          class="h-8 gap-x-1 transition-colors hover:text-primary"
          :aria-label="$t('dashboard.my_resumes')"
        >
          <span class="i-ep:menu text-lg" />
          <span class="text-base">{{ $t("dashboard.my_resumes") }}</span>
        </UiButton>

        <UiDropdownMenu>
          <UiDropdownMenuTrigger as-child>
            <UiButton
              variant="ghost-secondary"
              size="xs"
              class="h-8 gap-x-1 transition-colors hover:text-primary"
              :aria-label="`Switch the language from: ${localeName}`"
            >
              <span class="i-ic:round-translate text-lg" />
              <span class="text-base">{{ localeName }}</span>
            </UiButton>
          </UiDropdownMenuTrigger>
          <UiDropdownMenuContent class="min-w-28" align="start" :side-offset="0">
            <UiDropdownMenuItem
              v-for="item in availableLocales"
              :key="item.code"
              :as="NuxtLink"
              :to="switchLocalePath(item.code)"
            >
              <span v-if="item.icon" :class="[item.icon, 'text-base mr-1.5']" />
              {{ item.name }}
            </UiDropdownMenuItem>
          </UiDropdownMenuContent>
        </UiDropdownMenu>
      </div>

      <slot name="tail" />

      <SharedToggleDark />

      <!-- Desktop GitHub link (hidden on mobile) -->
      <UiButton
        as="a"
        variant="ghost-secondary"
        size="round"
        class="lt-md:hidden"
        href="http://github.com/Renovamen/oh-my-cv"
        target="_blank"
        rel="nofollow noopener"
      >
        <span i-tabler:brand-github text-lg />
      </UiButton>

      <!-- Mobile hamburger -->
      <UiButton
        variant="ghost-secondary"
        size="round"
        class="md:hidden"
        :aria-label="isMenuOpen ? $t('close_toolbar') : $t('open_toolbar')"
        @click="isMenuOpen = !isMenuOpen"
      >
        <span :class="isMenuOpen ? 'i-ic:round-close text-xl' : 'i-ic:round-menu text-xl'" />
      </UiButton>
    </div>

    <!-- Mobile dropdown menu -->
    <Transition
      enter-active-class="transition-opacity duration-200"
      leave-active-class="transition-opacity duration-150"
      enter-from-class="opacity-0"
      leave-to-class="opacity-0"
    >
      <div
        v-if="isMenuOpen"
        class="absolute inset-x-0 top-full z-40 glass-strong rounded-b-xl border-t-0 shadow-lg p-2 md:hidden"
      >
        <nuxt-link
          :to="$nuxt.$localePath('/dashboard')"
          class="hstack h-9 gap-x-2 px-3 rounded-lg text-sm transition-colors hover:bg-primary/10 hover:text-primary"
          @click="isMenuOpen = false"
        >
          <span class="i-ep:menu text-lg" />
          {{ $t("dashboard.my_resumes") }}
        </nuxt-link>

        <div class="hstack h-9 gap-x-1 px-1.5">
          <span class="i-ic:round-translate text-lg text-muted-foreground" />
          <UiButton
            v-for="item in locales"
            :key="item.code"
            variant="ghost-secondary"
            size="xs"
            class="h-7 gap-x-1"
            :class="item.code === locale ? 'text-primary' : ''"
            :as="NuxtLink"
            :to="switchLocalePath(item.code)"
            @click="isMenuOpen = false"
          >
            <span v-if="item.icon" :class="[item.icon, 'text-sm']" />
            {{ item.name }}
          </UiButton>
        </div>

        <a
          href="http://github.com/Renovamen/oh-my-cv"
          target="_blank"
          rel="nofollow noopener"
          class="hstack h-9 gap-x-2 px-3 rounded-lg text-sm transition-colors hover:bg-primary/10 hover:text-primary"
          @click="isMenuOpen = false"
        >
          <span i-tabler:brand-github text-lg />
          GitHub
        </a>
      </div>
    </Transition>
  </header>
</template>

<script lang="ts" setup>
import { NuxtLink } from "#components";

const switchLocalePath = useSwitchLocalePath();
const { locale, locales } = useI18n();
const route = useRoute();

const isMenuOpen = ref(false);

const availableLocales = computed(() =>
  locales.value.filter((i) => i.code !== locale.value)
);

const localeName = computed(
  () => locales.value.find((i) => i.code === locale.value)?.name || ""
);

// Close the mobile menu on route change
watch(
  () => route.fullPath,
  () => {
    isMenuOpen.value = false;
  }
);
</script>
