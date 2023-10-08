import { useMutation, useQuery } from "@tanstack/react-query"
import { useAuthStore } from "../../stores"
import { useParams } from "react-router-dom"
import { TeamsService } from "../../api/services"
import { Box, Title } from "@mantine/core"
import { ItemForm } from "../../forms"
import { Item } from "../../types"

export default function ItemEdit() {
  const { id } = useParams()
  const authStore = useAuthStore()
  const { data, isLoading } = useQuery({
    queryKey: ["teams", authStore.selectedTeamId, "items", id],
    queryFn: async () => {
      return TeamsService.getItem(
        authStore.selectedTeamId,
        parseInt(id ?? "0")
      ).then((res) => res.data)
    },
    enabled: !!authStore.selectedTeamId && !!id,
  })

  const mutate = useMutation({
    mutationFn: async (data: Item) => {
      return TeamsService.updateItem(
        authStore.selectedTeamId,
        parseInt(id ?? "0"),
        data
      )
    },
  })

  return isLoading ? (
    <div>Loading...</div>
  ) : (
    <Box>
      <Title>Edit Item {id}</Title>
      <ItemForm
        onSubmit={mutate.mutate}
        initialValues={data}
        loading={mutate.isLoading}
      />
    </Box>
  )
}
