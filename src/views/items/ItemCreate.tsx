import { Box, Title } from "@mantine/core"
import { ItemForm } from "../../forms"
import { Item } from "../../types"
import { useAuthStore } from "../../stores"
import { useMutation } from "@tanstack/react-query"
import { TeamsService } from "../../api/services"
import { useNavigate } from "react-router-dom"

export default function ItemCreate() {
  const authStore = useAuthStore()
  const navigate = useNavigate()

  const mutate = useMutation({
    mutationFn: async (data: Item) => {
      return TeamsService.createItem(authStore.selectedTeamId, data).then(
        (res) => res.data
      )
    },
    onSuccess: (res) => {
      navigate(`/items/${res.id}`)
    },
  })

  const onSubmit = (data: Item) => {
    if (authStore.selectedTeam) data.team = authStore.selectedTeam
    mutate.mutate(data)
  }

  return (
    <Box>
      <Title>Create Item</Title>
      <ItemForm onSubmit={onSubmit} loading={mutate.isLoading} />
    </Box>
  )
}
