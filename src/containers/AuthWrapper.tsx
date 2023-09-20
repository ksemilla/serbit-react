import { useEffect } from "react"
import { Outlet, useNavigate } from "react-router-dom"
import { useAuthStore } from "../stores"
import { useQuery } from "@tanstack/react-query"
import { TeamsService, UsersService } from "../api/services"

export default function AuthWrapper() {
  const navigate = useNavigate()
  const authStore = useAuthStore()

  useEffect(() => {
    if (!authStore.isLogged) navigate("/login")
  }, [authStore.isLogged])

  useQuery({
    queryKey: ["my-account"],
    queryFn: async () => {
      return UsersService.getUser(authStore.userId).then((res) => res.data)
    },
    enabled: !!authStore.userId,
    onSuccess: (user) => {
      authStore.setUser(user)
      // NOTE: THIS IS WHERE SELECTED TEAM IS SET
      if (user.ownedTeams.length > 0) {
        authStore.setSelectedTeamId(user.ownedTeams[0].id ?? 0)
      } else if (user.members.length > 0) {
        authStore.setSelectedTeamId(user.members[0].team.id ?? 0)
      }
    },
  })

  useQuery({
    queryKey: ["my-selected-team"],
    queryFn: async () => {
      return TeamsService.getTeam(authStore.selectedTeamId).then(
        (res) => res.data
      )
    },
    enabled: !!authStore.selectedTeamId,
    onSuccess: (team) => {
      authStore.setSelectedTeam(team)
    },
  })

  return <Outlet />
}
