import { RouterProvider } from "react-router-dom"
import { MantineProvider } from "@mantine/core"
import router from "./router"
import { useEffect, useState } from "react"
import { useMutation } from "@tanstack/react-query"
import { AuthService } from "./api/services"
import { VerifyToken } from "./types"
import { useAuthStore } from "./stores"
import { resolver } from "./themeResolvers"
import { Notifications } from "@mantine/notifications"
import "@mantine/notifications/styles.css"

function App() {
  const authStore = useAuthStore()
  const accessToken = localStorage.getItem("accessToken")

  const [loading, setLoading] = useState(true)
  const mutate = useMutation({
    mutationFn: (data: VerifyToken) => {
      return AuthService.verifyToken(data)
    },
    onSuccess: (res) => {
      authStore.setIsLogged(true)
      authStore.setUserId(res.data.sub)
    },
    onSettled: () => {
      setLoading(false)
    },
  })

  useEffect(() => {
    if (accessToken) {
      mutate.mutateAsync({ accessToken })
    } else {
      setLoading(false)
    }
  }, [])

  return (
    <MantineProvider defaultColorScheme="dark" cssVariablesResolver={resolver}>
      <Notifications />
      {loading ? <div>Loading...</div> : <RouterProvider router={router} />}
    </MantineProvider>
  )
}

export default App
