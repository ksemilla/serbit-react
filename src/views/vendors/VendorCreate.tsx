import { Box } from "@mantine/core"
import { VendorForm } from "../../forms"
import { Vendor } from "../../types"
import { useMutation } from "@tanstack/react-query"
import { TeamsService } from "../../api/services"
import { useAuthStore } from "../../stores"
import { useTeamVendorCreate } from "../../hooks"

export default function VendorCreate() {
  const authStore = useAuthStore()

  // const mutate = useMutation({
  //   mutationFn: async (data: Vendor) => {
  //     if (authStore.selectedTeam) data.team = authStore.selectedTeam
  //     return TeamsService.createVendor(authStore.selectedTeamId, data).then(
  //       (res) => res.data
  //     )
  //   },
  //   onSuccess: (res) => {
  //     console.log(res)
  //   },
  // })

  const createVendor = useTeamVendorCreate()

  return (
    <Box maw="800px">
      <VendorForm onSubmit={createVendor} />
    </Box>
  )
}
