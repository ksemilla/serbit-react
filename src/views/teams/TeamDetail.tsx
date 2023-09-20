import { Box } from "@mantine/core"
import { useMutation, useQuery } from "@tanstack/react-query"
import { useNavigate, useParams } from "react-router-dom"
import { TeamsService } from "../../api/services"

export default function TeamDetail() {
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()
  const { data } = useQuery({
    queryKey: ["teams", id],
    queryFn: async () => {
      return TeamsService.getTeam(parseInt(id ?? "0")).then((res) => res.data)
    },
    enabled: !!id,
  })

  const mutate = useMutation({
    mutationFn: async (id: number) => {
      return TeamsService.deleteTeam(id).then((res) => res.data)
    },
    onSuccess: () => {
      navigate("/admin/teams/")
    },
  })

  if (!data) {
    return <div>Loading...</div>
  }

  return (
    <Box>
      {data.name}
      <button onClick={() => mutate.mutate(parseInt(id ?? "0"))}>delete</button>
    </Box>
  )
}
