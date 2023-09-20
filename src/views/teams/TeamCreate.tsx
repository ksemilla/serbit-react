import { Button, Select, TextInput } from "@mantine/core"
import { useForm } from "@mantine/form"
import { useMutation, useQuery } from "@tanstack/react-query"
import { TeamsService, UsersService } from "../../api/services"
import { useNavigate } from "react-router-dom"
import { User } from "../../types"

export default function TeamCreate() {
  const navigate = useNavigate()
  const form = useForm<{ name: string; owner?: User }>({
    initialValues: { name: "" },
    validate: {
      name: (v) => (v ? null : "Name is required"),
      owner: (v) => (v ? null : "Owner is required"),
    },
  })

  const mutate = useMutation({
    mutationFn: async (data: { name: string }) => {
      return TeamsService.createTeam(data).then((res) => res.data)
    },
    onSuccess: (res) => {
      navigate(`/admin/teams/${res.id}`)
    },
  })

  const { data: users } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      return UsersService.getUserList().then((res) => res.data)
    },
  })

  if (!users) {
    return <div>Loading...</div>
  }

  return (
    <form onSubmit={form.onSubmit((v) => mutate.mutate(v))}>
      <TextInput required {...form.getInputProps("name")} label="Name" />
      <Select
        data={users?.list.map((u) => u.email)}
        searchable
        error={form.errors.owner ? "bad" : null}
        onChange={(v) =>
          form.setFieldValue(
            "owner",
            users.list.find((u) => u.email === v)
          )
        }
      />
      <Button type="submit">Create team</Button>
    </form>
  )
}
