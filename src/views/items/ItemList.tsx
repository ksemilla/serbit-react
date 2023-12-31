import { useQuery } from "@tanstack/react-query"
import { Link, useNavigate } from "react-router-dom"
import { TeamsService } from "../../api/services"
import { useAuthStore } from "../../stores"
import { Button, Group, Table, TextInput } from "@mantine/core"
import { Item } from "../../types"
import { IconSearch } from "@tabler/icons-react"

function ItemInline(props: { item: Item }) {
  const navigate = useNavigate()

  return (
    <Table.Tr
      style={{ cursor: "pointer" }}
      onClick={() => navigate(`/items/${props.item.id}`)}
    >
      <Table.Td>{props.item.partNumber}</Table.Td>
      <Table.Td>{props.item.name}</Table.Td>
      <Table.Td>{props.item.sellPrice}</Table.Td>
    </Table.Tr>
  )
}

export default function ItemList() {
  const authStore = useAuthStore()

  const { data } = useQuery({
    queryKey: ["items"],
    queryFn: async () => {
      return TeamsService.getItemList(authStore.selectedTeamId).then(
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
          Create Item
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
            <ItemInline key={u.id} item={u} />
          ))}
        </Table.Tbody>
      </Table>
    </div>
  )
}
