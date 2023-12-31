import { useQuery } from "@tanstack/react-query"
import { Link, useNavigate } from "react-router-dom"
import { TeamsService } from "../../api/services"
import { useAuthStore } from "../../stores"
import { Button, Group, Table, TextInput } from "@mantine/core"
import { Member } from "../../types"
import { IconSearch } from "@tabler/icons-react"

function MemberInline(props: { member: Member }) {
  const navigate = useNavigate()

  return (
    <Table.Tr
      style={{ cursor: "pointer" }}
      onClick={() => navigate(`/members/${props.member.id}`)}
    >
      <Table.Td>{props.member.nickName}</Table.Td>
      <Table.Td>{props.member.user?.email}</Table.Td>
      <Table.Td>{props.member.user?.email}</Table.Td>
    </Table.Tr>
  )
}

export default function MemberList() {
  const authStore = useAuthStore()

  const { data } = useQuery({
    queryKey: ["members"],
    queryFn: async () => {
      return TeamsService.memberList(authStore.selectedTeamId).then(
        (res) => res.data
      )
    },
    enabled: !!authStore.selectedTeamId,
  })

  return (
    <div>
      <Group>
        <TextInput leftSection={<IconSearch />} />
        <Button component={Link} to="create">
          Create Member
        </Button>
      </Group>
      <Table striped highlightOnHover>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Nick Name</Table.Th>
            <Table.Th>User</Table.Th>
            <Table.Th>Nick Name</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {data?.list.map((u) => (
            <MemberInline key={u.id} member={u} />
          ))}
        </Table.Tbody>
      </Table>
    </div>
  )
}
