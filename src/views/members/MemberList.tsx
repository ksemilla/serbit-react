import { useQuery } from "@tanstack/react-query"
import { Link, useNavigate } from "react-router-dom"
import { TeamsService } from "../../api/services"
import { useAuthStore } from "../../stores"
import { Table } from "@mantine/core"
import { Member } from "../../types"

function MemberInline(props: { member: Member }) {
  const navigate = useNavigate()

  return (
    <tr
      style={{ cursor: "pointer" }}
      onClick={() => navigate(`/admin/users/${props.member.id}`)}
    >
      <td>{props.member.nickName}</td>
      <td>{props.member.user?.email}</td>
      <td>{props.member.user?.email}</td>
    </tr>
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
      <Link to="create">create member</Link>
      <Table striped highlightOnHover withBorder>
        <thead>
          <tr>
            <th>Nick Name</th>
            <th>Role</th>
            <th>Nick Name</th>
          </tr>
        </thead>
        <tbody>
          {data?.map((u) => (
            <MemberInline key={u.id} member={u} />
          ))}
        </tbody>
      </Table>
    </div>
  )
}
