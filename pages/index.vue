<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useShoppingCartStore } from '~/stores/shoppingCartStore'
import type { Product } from '@/utils/types'
import { formatPrice } from '@/utils/formatter'

definePageMeta({
  layout: 'default',
})

const shoppingCartStore = useShoppingCartStore()
const router = useRouter()

const { data, error, status } = await useFetch<{ products: Product[] }>('/api/products', {
  onResponse: ({ response }) => {
    shoppingCartStore.$patch({
      products: response._data.products,
    })
  },
})

const onCardClick = (slug: string) => {
  router.push(`/products/${slug}`)
}
</script>

<template>
  <div class="flex-1">
    <div class="banner" />

    <div class="flex py-8 px-16">
      <div class="">
        <div class="text-3xl font-semibold">
          Sản phẩm tiêu biểu
        </div>

        <div
          v-if="status === 'pending'"
          class="mt-4"
        >
          Loading products...
        </div>

        <div
          v-else-if="error"
          class="mt-4 text-red-500"
        >
          Failed to load products. Please try again later.
        </div>

        <div
          v-else-if="data?.products?.length"
          class="mt-4 w-full grid grid-cols-4 gap-6"
        >
          <UCard
            v-for="item in data.products"
            :key="item.id"
            variant="outline"
            class="cursor-pointer"
            @click="onCardClick(item.slug)"
          >
            <div class="flex flex-col gap-2">
              <NuxtImg
                v-if="item.images.length > 0"
                :src="item.images[0]"
                class="w-full"
              />

              <div class="mt-1 text-xl font-bold text-gray-800 item-title">
                {{ item.title }}
              </div>

              <div>
                <p class="line-clamp-2">
                  {{ item.shortDescription }}
                </p>
                <a
                  :href="`/products/${item.slug}`"
                  class="text-sky-600"
                >Xem thêm</a>
              </div>
            </div>

            <div class="mt-2 text-lg text-green-600">
              {{ formatPrice(item.price) }}
            </div>
          </UCard>
        </div>

        <div
          v-else
          class="mt-4 text-gray-500"
        >
          No products found.
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="css">
.main {
  background-color: var(--color-green-700);
  background-position-y: 10%;
  background-repeat: no-repeat;
}

.banner {
  background-image: url("~/assets/img/suabotuc_banner.svg");
  background-size: cover;
  background-repeat: no-repeat;
  background-position: 50% 50%;
  width: 100%;
  min-height: 200px;
}

.item-title {
  position: relative;
  display: flex;
}

.item-title::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 0;
  height: 2px;
  background-color: var(--color-sky-700);
  transition: width 0.2s ease-in-out;
}

.item-title:hover::after {
  width: 100%;
}
</style>
