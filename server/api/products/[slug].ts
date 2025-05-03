import { readFileSync } from 'fs'
import { join } from 'path'
import type { Product } from '~/utils/types'

export default defineEventHandler((event) => {
  const data = readFileSync(join(process.cwd(), 'server/data/mock-database.json'), 'utf-8')
  const slug = getRouterParam(event, 'slug')
  const { products } = JSON.parse(data)
  const filteredProduct = products.find((product: Product) => product.slug === slug)

  if (!filteredProduct) {
    throw new Error('Product not found')
  }

  return filteredProduct
})
