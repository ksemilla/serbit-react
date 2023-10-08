import { ApiService } from "."
import { Item, ListResult, Member, Team, User, Vendor } from "../../types"

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
    return ApiService.post<{ id: number }>(`api/teams/`, data)
  }

  static deleteTeam(id: number) {
    return ApiService.delete<{ affected: number }>(`api/teams/${id}`)
  }

  static addMember(teamsId: number, data: { user?: User; nickName: string }) {
    return ApiService.post<any>(`api/teams/${teamsId}/members/`, data)
  }

  static memberList(teamsId: number) {
    return ApiService.get<ListResult<Member>>(`api/teams/${teamsId}/members/`)
  }

  static getMember(memberId: number) {
    return ApiService.get<Member>(`api/members/${memberId}`)
  }

  static getItemList(teamsId: number) {
    return ApiService.get<ListResult<Item>>(`api/teams/${teamsId}/items/`)
  }

  static createItem(teamsId: number, data: Item) {
    return ApiService.post<Item>(`api/teams/${teamsId}/items/`, data)
  }

  static getItem(teamsId: number, itemId: number) {
    return ApiService.get<Item>(`api/teams/${teamsId}/items/${itemId}`)
  }

  static updateItem(teamsId: number, itemId: number, data: Item) {
    return ApiService.put<any>(`api/teams/${teamsId}/items/${itemId}`, data)
  }

  static getVendorList(teamsId: number) {
    return ApiService.get<ListResult<Vendor>>(`api/teams/${teamsId}/vendors/`)
  }

  static createVendor(teamsId: number, data: Vendor) {
    return ApiService.post<any>(`api/teams/${teamsId}/vendors/`, data)
  }
}
