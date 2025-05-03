<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui'
import { useShoppingCartStore } from '~/stores/shoppingCartStore'

const shoppingCartStore = useShoppingCartStore()
const cartSize = computed(() => shoppingCartStore.cartSize)

const items = ref<NavigationMenuItem[]>([
  {
    label: 'Trang chủ',
    icon: 'i-lucide-home',
    to: '/',
    class: 'text-md',
  },
  {
    label: 'Sản phẩm',
    icon: 'i-lucide-store',
    to: '/store',
    class: 'text-md',
  },
  {
    label: 'Liên hệ',
    icon: 'i-lucide-phone',
    to: '/contact-us',
  },
])
</script>

<template>
  <!-- <nav>

    </nav> -->
  <div class="w-full flex items-center px-16 gap-4">
    <img
      src="/suabotuc_logo.svg"
      alt="Logo"
      class="w-[100px]"
    >

    <UInput
      icon="i-lucide-search"
      size="xl"
      variant="outline"
      placeholder="Search..."
    />

    <UNavigationMenu
      :items="items"
      class="flex-1"
      variant="link"
      color="neutral"
      :highlight="true"
      highlight-color="primary"
    />

    <div class="flex items-center gap-2">
      <UChip
        size="3xl"
        :text="cartSize"
      >
        <UButton
          icon="i-lucide-shopping-cart"
          size="xl"
          color="primary"
          variant="subtle"
          class="cursor-pointer"
        />
      </UChip>

      <span>0.00 VND</span>
    </div>
  </div>
</template>
