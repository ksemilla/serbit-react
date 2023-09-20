import { useQuery } from "@tanstack/react-query"
import { UsersService } from "../../api/services"
import { User } from "../../types/users"
import { Table } from "@mantine/core"
import { useNavigate } from "react-router-dom"

function UserInline(props: { user: User }) {
  const navigate = useNavigate()

  return (
    <tr
      style={{ cursor: "pointer" }}
      onClick={() => navigate(`/admin/users/${props.user.id}`)}
    >
      <td>{props.user.email}</td>
      <td>{props.user.role}</td>
      <td>{props.user.id}</td>
    </tr>
  )
}

export default function UserList() {
  const { data } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      return UsersService.getUserList().then((res) => res.data)
    },
  })

  if (!data) {
    return <div>Loading...</div>
  }

  return (
    <div>
      <Table striped highlightOnHover withBorder>
        <thead>
          <tr>
            <th>Email</th>
            <th>Role</th>
            <th>Nick Name</th>
          </tr>
        </thead>
        <tbody>
          {data.list.map((u) => (
            <UserInline key={u.id} user={u} />
          ))}
        </tbody>
      </Table>
    </div>
  )
}
