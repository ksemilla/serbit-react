import { useForm } from "@mantine/form"
import { User } from "../../types"
import { useMutation, useQuery } from "@tanstack/react-query"
import { TeamsService, UsersService } from "../../api/services"
import { useAuthStore } from "../../stores"
import { Box, Button, Group, Select, TextInput } from "@mantine/core"
import { Link, useNavigate } from "react-router-dom"
import { IconChevronLeft } from "@tabler/icons-react"

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
      return TeamsService.addMember(authStore.selectedTeamId, data)
    },
    onSuccess: () => {
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
    <Box maw={500}>
      <Group justify="end" mb="md">
        <Button
          variant="light"
          component={Link}
          to="/members"
          type="button"
          leftSection={<IconChevronLeft />}
        >
          Back
        </Button>
      </Group>
      <form onSubmit={form.onSubmit((v) => mutate.mutate(v))}>
        <TextInput
          {...form.getInputProps("nickName")}
          label="Nick Name"
          required
        />
        <Select
          label="Connected User Email"
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
        <Group justify="center" mt="lg">
          <Button w="100%" type="submit">
            Create member
          </Button>
        </Group>
      </form>
    </Box>
  )
}
