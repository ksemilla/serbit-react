import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom"

import {
  Dashboard,
  ItemList,
  LoginPage,
  MemberCreate,
  MemberDetail,
  MemberList,
  TeamCreate,
  TeamDetail,
  TeamList,
  UserDetail,
  UserList,
} from "./views"
import AuthWrapper from "./containers/AuthWrapper"
import BaseWrapper from "./containers/BaseWrapper"
import AdminWrapper from "./containers/AdminWrapper"
import { SignupPage } from "./views/signup"

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<AuthWrapper />}>
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route element={<BaseWrapper />}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/items">
          <Route path="" element={<ItemList />} />
        </Route>
        <Route path="/members">
          <Route path="" element={<MemberList />} />
          <Route path="create" element={<MemberCreate />} />
          <Route path=":id" element={<MemberDetail />} />
        </Route>
        <Route path="/items">
          <Route path="" element={<ItemList />} />
          {/* <Route path="create" element={<MemberCreate />} />
          <Route path=":id" element={<MemberDetail />} /> */}
        </Route>
      </Route>
      <Route element={<AdminWrapper />}>
        <Route path="/admin/users" element={<UserList />} />
        <Route path="/admin/users/:id" element={<UserDetail />} />
        <Route path="/admin/teams" element={<TeamList />} />
        <Route path="/admin/teams/create" element={<TeamCreate />} />
        <Route path="/admin/teams/:id" element={<TeamDetail />} />
      </Route>
    </Route>
  )
)

export default router
