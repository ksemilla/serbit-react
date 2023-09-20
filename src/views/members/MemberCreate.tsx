import { useForm } from "@mantine/form"
import { User } from "../../types"
import { useMutation, useQuery } from "@tanstack/react-query"
import { TeamsService, UsersService } from "../../api/services"
import { useAuthStore } from "../../stores"
import { Button, Select, TextInput } from "@mantine/core"
import { useNavigate } from "react-router-dom"

export default function MemberCreate() {
  const authStore = useAuthStore()
  const navigate = useNavigate()

  const form = useForm<{ user?: User; nickName: string }>({
    initialValues: { nickName: "" },
    validate: {
      nickName: (v) => (v ? null : "nickname is required"),
    },
  })

  const mutate = useMutation({
    mutationFn: async (data: { user?: User; nickName: string }) => {
      console.log(authStore.selectedTeamId)
      return TeamsService.addMember(authStore.selectedTeamId, data)
    },
    onSuccess: (res) => {
      console.log(res)
      navigate(`/members`)
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
    <div>
      create member
      <form onSubmit={form.onSubmit((v) => mutate.mutate(v))}>
        <TextInput
          {...form.getInputProps("nickName")}
          label="Nick Name"
          required
        />
        <Select
          data={users?.list.map((u) => u.email)}
          searchable
          error={form.errors.user ? "bad" : null}
          onChange={(v) =>
            form.setFieldValue(
              "user",
              users.list.find((u) => u.email === v)
            )
          }
        />
        <Button type="submit">Create member</Button>
      </form>
    </div>
  )
}
