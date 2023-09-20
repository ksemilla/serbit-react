import { Member, Team } from "."

export interface User {
  id?: number
  email: string
  role: "user" | "admin"
  firstName: string
  lastName: string
  nickName: string
  isActive: string
  ownedTeams: Team[]
  members: Member[]
}
