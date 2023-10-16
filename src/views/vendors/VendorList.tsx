import { Vendor } from "../../types"
import { Link, useNavigate } from "react-router-dom"
import { Button, Group, Table, TextInput } from "@mantine/core"
import { IconSearch } from "@tabler/icons-react"
import { useTeamVendorList } from "../../hooks"

function VendorInline(props: { vendor: Vendor }) {
  const navigate = useNavigate()

  return (
    <Table.Tr
      style={{ cursor: "pointer" }}
      onClick={() => navigate(`/vendors/${props.vendor.id}`)}
    >
      <Table.Td>{props.vendor.id}</Table.Td>
      <Table.Td>{props.vendor.name}</Table.Td>
      <Table.Td>{props.vendor.isActive}</Table.Td>
    </Table.Tr>
  )
}

export default function VendorList() {
  const { vendors } = useTeamVendorList()

  return (
    <div>
      <Group>
        <TextInput leftSection={<IconSearch />} />
        <Button component={Link} to="create">
          Create Vendor
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
          {vendors?.list.map((u) => (
            <VendorInline key={u.id} vendor={u} />
          ))}
        </Table.Tbody>
      </Table>
    </div>
  )
}
