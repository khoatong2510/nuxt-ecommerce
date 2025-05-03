<script setup lang="ts">
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import { useShoppingCartStore } from '~/stores/shoppingCartStore'

const route = useRoute()
const toast = useToast()
const shoppingCartStore = useShoppingCartStore()
const productSlug = computed(() => route.params.productSlug)

// Mock product data (replace with actual API call or data fetching logic)
const { data: product, status, error } = await useFetch<Product>(() => `/api/products/${productSlug.value}`)

if (error.value)
  throw new Error('failed to fetch product')

const processedDescription = computed(() =>
  product.value?.description.replace(/\\r\\n/g, '<br>'),
)

const quantity = ref(1)

const formattedPrice = (value: number): string => `${value.toLocaleString()} VNĐ`

const addToCart = () => {
  if (!product.value)
    throw new Error('Product not found')

  shoppingCartStore.addToCart(product.value.id, quantity.value)
  toast.add({
    title: 'Thành công',
    description: `Đã thêm sản phẩm "${product.value.title}" vào giỏ hàng!`,
    icon: 'i-lucide-shopping-cart',
  })
}

const carousel = useTemplateRef('carousel')
const activeIndex = ref(0)

function onClickPrev() {
  activeIndex.value--
}
function onClickNext() {
  activeIndex.value++
}

function onSelect(index: number) {
  activeIndex.value = index

  carousel.value?.emblaApi?.scrollTo(index)
}
</script>

<template>
  <div class="flex p-6 gap-6">
    <div v-if="status === 'pending'">
      Loading product details...
    </div>

    <div v-else-if="error || !product">
      Failed to load product details
    </div>

    <template v-else>
      <!-- First Column: Product Image -->
      <div class="w-full md:w-1/2">
        <UCarousel
          ref="carousel"
          v-slot="{ item }"
          arrows
          dots
          fade
          prev-icon="i-lucide-chevron-left"
          next-icon="i-lucide-chevron-right"
          :prev="{ onClick: onClickPrev }"
          :next="{ onClick: onClickNext }"
          :items="product.images"
          class="w-full max-w-lg mx-auto"
        >
          <img
            :src="item"
            class="w-full rounded-lg"
          >
        </UCarousel>

        <div class="flex gap-1 justify-between pt-4 max-w-xs mx-auto">
          <div
            v-for="(item, index) in product.images"
            :key="index"
            class="size-11 opacity-25 hover:opacity-100 transition-opacity"
            :class="{ 'opacity-100': activeIndex === index }"
            @click="onSelect(index)"
          >
            <img
              :src="item"
              width="44"
              height="44"
              class="rounded-lg mt-8"
            >
          </div>
        </div>
      </div>

      <!-- Second Column: Product Details -->
      <div class="w-full md:w-1/2 flex flex-col gap-4">
        <h1 class="text-3xl font-bold">
          {{ product?.title }}
        </h1>
        <p
          class="text-gray-700 whitespace-pre-wrap"
          v-html="processedDescription"
        />

        <div class="text-2xl font-semibold text-green-600">
          {{ formattedPrice(product.price) }}
        </div>

        <div class="flex items-center gap-4">
          <input
            v-model="quantity"
            type="number"
            min="1"
            class="w-16 px-2 py-1 border border-gray-300 rounded"
          >

          <button
            class="
              px-4 py-2
              bg-green-500 text-white
              rounded
              hover:bg-green-600 transition cursor-pointer
            "
            @click="addToCart"
          >
            Thêm vào giỏ hàng
          </button>
        </div>
      </div>
    </template>
  </div>
</template>

<style scoped>
/* Add any additional styling here */
</style>
