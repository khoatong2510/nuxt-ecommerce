import { readFileSync } from 'fs'
import { join } from 'path'

export default defineEventHandler(() => {
  const data = readFileSync(join(process.cwd(), 'server/data/mock-database.json'), 'utf-8')
  return JSON.parse(data)
})
