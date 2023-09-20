import { useMutation, useQuery } from "@tanstack/react-query"
import { useParams } from "react-router-dom"
import { UsersService } from "../../api/services"
import { Box } from "@mantine/core"
import UserForm from "./UserForm"
import { User } from "../../types/users"

export default function UserDetail() {
  const { id } = useParams<{ id: string }>()
  const { data } = useQuery({
    queryKey: ["users", id],
    enabled: !!id,
    queryFn: async () => {
      return UsersService.getUser(parseInt(id ?? "0")).then((res) => res.data)
    },
  })

  const mutate = useMutation({
    mutationFn: async (userData: User) => {
      return UsersService.updateUser(parseInt(id ?? "0"), userData)
    },
  })

  const onSubmit = (data: User) => {
    mutate.mutate(data)
  }

  if (!data) {
    return <div>Loading...</div>
  }

  return (
    <Box>
      <UserForm user={data} onSubmit={onSubmit} />
    </Box>
  )
}
