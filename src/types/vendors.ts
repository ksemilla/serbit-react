import { Item, Team } from "."

export interface Vendor {
  id?: number
  team: Team
  name: string
  isActive: boolean
  vendorContacts: VendorContact[]
  pricingList: VendorPricing[]
}

export interface VendorContact {
  id?: number
  key?: string
  vendor?: Vendor
  name: string
  mobile?: string
  phone?: string
  email?: string
  notes?: string
}

export interface VendorPricing {
  id?: number
  vendor?: Vendor
  item: Item
  sellPrice: number
}
