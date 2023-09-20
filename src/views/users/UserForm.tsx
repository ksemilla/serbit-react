import { useForm } from "@mantine/form"
import { User } from "../../types/users"
import { Button, Grid, Select, TextInput } from "@mantine/core"
import { userRoles } from "../../const"

export default function UserForm(props: {
  user?: User
  onSubmit: (data: User) => void
}) {
  const form = useForm<User>({
    initialValues: props.user,
  })

  const onSubmit = (data: User) => {
    props.onSubmit(data)
  }

  return (
    <form onSubmit={form.onSubmit((v) => onSubmit(v))}>
      <Grid>
        <Grid.Col>
          <TextInput {...form.getInputProps("email")} label="Email" required />
        </Grid.Col>
        <Grid.Col span={6}>
          <TextInput {...form.getInputProps("firstName")} label="First Name" />
        </Grid.Col>
        <Grid.Col span={6}>
          <TextInput {...form.getInputProps("lastName")} label="Last Name" />
        </Grid.Col>
        <Grid.Col span={6}>
          <TextInput {...form.getInputProps("nickName")} label="Nick Name" />
        </Grid.Col>
        <Grid.Col span={6}>
          <Select
            defaultValue={props.user?.role}
            data={userRoles}
            onChange={(v: "user" | "admin") =>
              v && form.setFieldValue("role", v)
            }
            label="Role"
          />
        </Grid.Col>
        <Grid.Col>
          <Button type="submit">Update</Button>
        </Grid.Col>
      </Grid>
    </form>
  )
}
