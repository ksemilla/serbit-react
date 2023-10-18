import { useMutation, useQuery } from "@tanstack/react-query"
import { VendorForm } from "../../forms"
import { useParams } from "react-router-dom"
import { useTeamClient } from "../../stores"
import { Loader } from "@mantine/core"
import { randomId } from "@mantine/hooks"
import { Vendor } from "../../types"

export default function VendorEdit() {
  const teamClient = useTeamClient()
  const { id } = useParams()

  const { data: vendor } = useQuery({
    queryKey: ["teams", teamClient.selectedTeam?.id, "vendors", id],
    queryFn: async () => {
      return teamClient.getVendor(parseInt(id ?? "0")).then((res) => ({
        ...res.data,
        vendorContacts: res.data.vendorContacts
          ? res.data.vendorContacts.map((vc) => ({
              ...vc,
              key: randomId(),
            }))
          : [],
      }))
    },
    enabled: !!id,
  })

  const mutate = useMutation({
    mutationFn: async (data: Vendor) => {
      return teamClient.updateVendor(data).then((res) => res.data)
    },
    onSuccess: (vendor) => {
      console.log(vendor)
    },
  })

  return !vendor ? (
    <Loader />
  ) : (
    <VendorForm onSubmit={mutate.mutate} initialValues={vendor} />
  )
}
