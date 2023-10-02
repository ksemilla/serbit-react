import { Team } from "."

export interface Item {
  id?: number
  team: Team
  partNumber: string
  name: string
  description?: string
  listPrice: number
  sellPrice: number
  quantity: number
  isActive: boolean
}
