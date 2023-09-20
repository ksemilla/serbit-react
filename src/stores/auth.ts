import { create } from "zustand"
import { Team, User } from "../types"

interface AuthState {
  isLogged: boolean
  setIsLogged: (v: boolean) => void
  user?: User | null
  setUser: (user: User | null) => void
  userId: number
  setUserId: (id: number) => void
  logout: () => void

  selectedTeamId: number
  setSelectedTeamId: (id: number) => void
  selectedTeam: Team | null
  setSelectedTeam: (t: Team | null) => void
}

export const useAuthStore = create<AuthState>()((set) => ({
  isLogged: false,
  setIsLogged: (v) => set((state) => ({ ...state, isLogged: v })),
  user: null,
  setUser: (user) => set((state) => ({ ...state, user })),
  userId: 0,
  setUserId: (id) => set((state) => ({ ...state, userId: id })),

  logout: () =>
    set((state) => ({ ...state, user: null, userId: 0, isLogged: false })),

  selectedTeamId: 0,
  setSelectedTeamId: (id) => set((state) => ({ ...state, selectedTeamId: id })),

  selectedTeam: null,
  setSelectedTeam: (selectedTeam) =>
    set((state) => ({ ...state, selectedTeam })),
}))
