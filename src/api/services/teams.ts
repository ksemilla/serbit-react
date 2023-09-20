import { ApiService } from "."
import { Member, Team, User } from "../../types"

export class TeamsService {
  static getTeamList() {
    return ApiService.get<{ list: Team[]; count: number }>("api/teams/")
  }

  static getTeam(id: number) {
    return ApiService.get<Team>(`api/teams/${id}/`)
  }

  // static updateUser(id: number, data: Partial<User>) {
  //   return ApiService.put<Partial<User>, any>(`api/users/${id}/`, data)
  // }

  static createTeam(data: { name: string }) {
    return ApiService.post<{ name: string }, { id: number }>(`api/teams/`, data)
  }

  static deleteTeam(id: number) {
    return ApiService.delete<{ affected: number }>(`api/teams/${id}`)
  }

  static addMember(teamsId: number, data: { user?: User; nickName: string }) {
    return ApiService.post<{ user?: User; nickName: string }, any>(
      `api/teams/${teamsId}/members/`,
      data
    )
  }

  static memberList(teamsId: number) {
    return ApiService.get<Member[]>(`api/teams/${teamsId}/members/`)
  }
}
