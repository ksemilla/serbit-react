import { useMutation, useQuery } from "@tanstack/react-query"
import { useTeamClient } from "../stores"
import { Vendor } from "../types"
import { useNavigate } from "react-router-dom"

export function useTeamVendorList() {
  const teamClient = useTeamClient()

  const { data, ...rest } = useQuery({
    queryKey: ["teams", teamClient.selectedTeam?.id, "vendors"],
    queryFn: async () => {
      return teamClient.getVendorList().then((res) => res.data)
    },
    enabled: !!teamClient.selectedTeam,
  })

  return {
    vendors: data,
    ...rest,
  }
}

export function useTeamVendorCreate() {
  const teamClient = useTeamClient()
  const navigate = useNavigate()
  const mutate = useMutation({
    mutationFn: async (data: Vendor) =>
      teamClient.createVendor(data).then((res) => res.data),
    onSuccess: (vendor) => {
      navigate(`/vendors/${vendor.id}`)
    },
  })
  return mutate.mutate
}
