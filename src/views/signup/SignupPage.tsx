import { Box, Button, Group, TextInput } from "@mantine/core"
import { useForm } from "@mantine/form"
import { Link, useNavigate } from "react-router-dom"
import { useMutation } from "@tanstack/react-query"
import { UsersService } from "../../api/services"
import { LoginData } from "../../types/auth"
import { useAuthStore } from "../../stores"
import { useEffect } from "react"

export default function SignupPage() {
  const navigate = useNavigate()
  const authStore = useAuthStore()

  const form = useForm({
    initialValues: { email: "", password: "" },
    validate: {
      email: (v) => (/^\S+@\S+$/.test(v) ? null : "Invalid email"),
      password: (v) => (v.length > 2 ? null : "More than 2 characters"),
    },
  })

  const mutate = useMutation({
    mutationFn: async (data: LoginData) => {
      return UsersService.createUser(data).then((res) => res.data)
    },
    onSuccess: (res) => {
      localStorage.setItem("accessToken", res.accessToken)
      authStore.setIsLogged(true)
      navigate("/dashboard")
    },
  })
  useEffect(() => {
    if (authStore.isLogged) navigate("/dashboard")
  }, [authStore.isLogged])

  return (
    <Box maw={300} mx="auto">
      <form
        onSubmit={form.onSubmit((v) => {
          mutate.mutate(v)
        })}
      >
        <TextInput
          withAsterisk
          label="Email"
          placeholder="example@gmail.com"
          {...form.getInputProps("email")}
        />
        <TextInput
          withAsterisk
          label="Password"
          {...form.getInputProps("password")}
        />
        <Group position="center" mt="sm">
          <Button type="submit">Create Account</Button>
        </Group>
      </form>
      <Link to="/login">Already have an account?</Link>
    </Box>
  )
}
