import { useQuery } from "@tanstack/react-query"
import { useParams } from "react-router-dom"
import { TeamsService } from "../../api/services"
import {
  Avatar,
  Box,
  Divider,
  Group,
  Paper,
  Stack,
  Switch,
  Text,
  Title,
} from "@mantine/core"

export default function MemberDetail() {
  const { id } = useParams<{ id: string }>()
  const { data } = useQuery({
    queryKey: ["members", id],
    queryFn: async () => {
      return TeamsService.getMember(parseInt(id ?? "0")).then((res) => res.data)
    },
    enabled: !!id,
  })

  console.log(data)

  if (!data) {
    return <div>Loading...</div>
  }

  return (
    <Box p="lg">
      <Group justify="space-between">
        <Group>
          {parseInt(id ?? "0") % 2 === 0 ? (
            <Avatar
              src="https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=255&q=80"
              size={100}
            />
          ) : (
            <Avatar size={100} />
          )}
          <Stack gap={1}>
            <Title>{data?.nickName}</Title>
            {data.user ? (
              <Text>{data.user?.email}</Text>
            ) : (
              <Text>Connect to email</Text>
            )}
          </Stack>
        </Group>
        <Group h="100%">
          <Switch
            size="xl"
            onLabel="Active"
            offLabel="Inactive"
            color="green"
          />
        </Group>
      </Group>
      <Divider my="lg" />
      <Paper shadow="xs" p="lg" withBorder>
        <Title>Tasks</Title>
      </Paper>
    </Box>
  )
}
