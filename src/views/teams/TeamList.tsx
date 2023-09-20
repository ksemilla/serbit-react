import { useQuery } from "@tanstack/react-query"
import { Link, useNavigate } from "react-router-dom"
import { TeamsService } from "../../api/services"
import { Table } from "@mantine/core"
import { Team } from "../../types"

function TeamInline(props: { team: Team }) {
  const navigate = useNavigate()
  return (
    <tr
      style={{ cursor: "pointer" }}
      onClick={() => navigate(`/admin/teams/${props.team.id}`)}
    >
      <td>{props.team.name}</td>
      <td>{props.team.owner?.email}</td>
    </tr>
  )
}

export default function TeamList() {
  const { data } = useQuery({
    queryKey: ["teams"],
    queryFn: async () => {
      return TeamsService.getTeamList().then((res) => res.data)
    },
  })
  if (!data) {
    return <div>Loading...</div>
  }

  return (
    <div>
      <Link to="/admin/teams/create">Create team</Link>
      <Table striped highlightOnHover withBorder>
        <thead>
          <tr>
            <th>Name</th>
            <th>Owner</th>
          </tr>
        </thead>
        <tbody>
          {data.list.map((u) => (
            <TeamInline key={u.id} team={u} />
          ))}
        </tbody>
      </Table>
    </div>
  )
}
