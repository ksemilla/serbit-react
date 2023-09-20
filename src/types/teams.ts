import { User } from "./users"

export interface Team {
  id?: number
  name: string
  slug: string
  members: Member[]
  owner?: User
}

export interface Member {
  id?: number
  user?: User
  team: Team
  nickName: string
}
