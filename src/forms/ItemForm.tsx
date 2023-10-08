import { useForm } from "@mantine/form"
import { Item } from "../types"
import {
  Box,
  Button,
  Flex,
  Grid,
  NumberInput,
  Switch,
  Text,
  TextInput,
  Textarea,
} from "@mantine/core"

export default function ItemForm(props: {
  onSubmit: (data: Item) => void
  initialValues?: Item
  loading?: boolean
}) {
  const form = useForm<Item>({
    initialValues: props.initialValues ?? {
      partNumber: "",
      name: "",
      team: {
        name: "",
        slug: "",
        members: [],
      },
      listPrice: 0,
      sellPrice: 0,
      quantity: 0,
      isActive: true,
      description: "",
    },
    validate: {
      partNumber: (v) => (v ? null : "This field is required"),
    },
  })

  return (
    <form onSubmit={form.onSubmit(props.onSubmit)}>
      <Flex gap={20} align="center">
        <TextInput
          label="Part Number"
          withAsterisk
          {...form.getInputProps("partNumber")}
          w="100%"
        />

        <Box>
          <Text fw={700} size="sm">
            Is Active?
          </Text>
          <Switch
            size="xl"
            onLabel="Yes"
            offLabel="No"
            defaultChecked={props.initialValues?.isActive ?? true}
            {...form.getInputProps("isActive")}
            disabled={!props.initialValues}
          />
        </Box>
      </Flex>

      <TextInput label="Name" withAsterisk {...form.getInputProps("name")} />
      <Textarea
        label="Description"
        autosize
        {...form.getInputProps("description")}
        minRows={3}
      />
      <Grid>
        <Grid.Col span={4}>
          <NumberInput
            label="Sell Price"
            allowNegative={false}
            {...form.getInputProps("sellPrice")}
          />
        </Grid.Col>
        <Grid.Col span={4}>
          <NumberInput
            label="List Price"
            allowNegative={false}
            {...form.getInputProps("listPrice")}
          />
        </Grid.Col>
        <Grid.Col span={4}>
          <NumberInput
            label="Quantity"
            allowNegative={false}
            {...form.getInputProps("quantity")}
          />
        </Grid.Col>
      </Grid>
      <Button type="submit" loading={props.loading}>
        Submit
      </Button>
    </form>
  )
}
