import { defineStore } from 'pinia'

interface ShoppingCartState {
  products: Product[]
  cart: {
    productId: string,
    quantity: number
  }[]
}

export const useShoppingCartStore = defineStore('shoppingCart', {
  state: (): ShoppingCartState => ({
    cart: [],
    products: [],
  }),
  getters: {
    cartSize: (state): number => {
      return state.cart.reduce((total, item) => total + item.quantity, 0)
    },
  },
  actions: {
    addToCart(productId: string, quantity: number = 1) {
      // Check if the product already exists in the cart
      const existingItem = this.cart.find(item => item.productId === productId)

      if (existingItem) {
        // If the product exists, update the quantity
        existingItem.quantity += quantity
      }
      else {
        // If the product doesn't exist, add it to the cart
        this.cart.push({ productId, quantity })
      }
    },
    removeFromCart(productId: string) {
      // Remove the product from the cart
      this.cart = this.cart.filter(item => item.productId !== productId)
    },
  },
})
