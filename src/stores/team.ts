import { create } from "zustand"
import { ApiService } from "../api/services"
import { ListResult, Team, Vendor } from "../types"
import { AxiosResponse } from "axios"

interface TeamState {
  selectedTeamId: number
  setSelectedTeamId: (id: number) => void
  selectedTeam: Team | null
  setSelectedTeam: (t: Team | null) => void

  getVendorList: () => Promise<AxiosResponse<ListResult<Vendor>, any>>
  getVendor: (id: number) => Promise<AxiosResponse<Vendor, any>>
  updateVendor: (data: Vendor) => Promise<AxiosResponse<Vendor, any>>
  createVendor: (data: Vendor) => Promise<AxiosResponse<Vendor, any>>
}

export const useTeamClient = create<TeamState>()((set, get) => ({
  selectedTeamId: 0,
  setSelectedTeamId: (id) => set((state) => ({ ...state, selectedTeamId: id })),

  selectedTeam: null,
  setSelectedTeam: (selectedTeam) =>
    set((state) => ({ ...state, selectedTeam })),

  getVendorList: () =>
    ApiService.get<ListResult<Vendor>>(
      `api/teams/${get().selectedTeamId}/vendors/`
    ),

  getVendor: (id: number) =>
    ApiService.get<Vendor>(`api/teams/${get().selectedTeamId}/vendors/${id}`),

  createVendor: (data) => {
    const selectedTeam = get().selectedTeam
    if (selectedTeam) data.team = selectedTeam
    return ApiService.post<Vendor>(
      `api/teams/${get().selectedTeamId}/vendors/`,
      data
    )
  },

  updateVendor: (data) => {
    const selectedTeam = get().selectedTeam
    if (selectedTeam) data.team = selectedTeam
    return ApiService.put<Vendor>(
      `api/teams/${get().selectedTeamId}/vendors/${data.id}`,
      data
    )
  },
}))
