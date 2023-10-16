import { createFormContext } from "@mantine/form"
import { Vendor, VendorContact } from "../types"
import {
  ActionIcon,
  Box,
  Button,
  Card,
  Fieldset,
  Flex,
  Group,
  SimpleGrid,
  Stack,
  Switch,
  Text,
  TextInput,
  Textarea,
  Title,
} from "@mantine/core"
import { randomId, useHover } from "@mantine/hooks"
import { IconX } from "@tabler/icons-react"

const [FormProvider, useFormContext, useForm] = createFormContext<Vendor>()

function Contact(props: { idx: number; contact: VendorContact }) {
  const form = useFormContext()
  const { hovered, ref } = useHover()
  return (
    <Flex ref={ref} gap={20} p="xs" pb="md">
      <Box>{props.idx + 1}.</Box>
      <Box w="100%">
        <SimpleGrid cols={{ sm: 2 }}>
          <TextInput
            label="Name"
            {...form.getInputProps(`vendorContacts.${props.idx}.name`)}
          />
          <TextInput
            label="Email"
            {...form.getInputProps(`vendorContacts.${props.idx}.email`)}
          />
        </SimpleGrid>
        <SimpleGrid cols={{ sm: 2 }}>
          <TextInput
            label="Mobile"
            {...form.getInputProps(`vendorContacts.${props.idx}.mobile`)}
          />
          <TextInput
            label="Phone"
            {...form.getInputProps(`vendorContacts.${props.idx}.phone`)}
          />
        </SimpleGrid>

        <Textarea label="Notes" minRows={3} autosize />
      </Box>
      <Box w="50px">
        {hovered && form.values.vendorContacts.length > 1 && (
          <ActionIcon
            color="gray"
            variant="light"
            size="sm"
            onClick={() => form.removeListItem("vendorContacts", props.idx)}
          >
            <IconX />
          </ActionIcon>
        )}
      </Box>
    </Flex>
  )
}

function Contacts() {
  const form = useFormContext()
  return (
    <Stack gap={0}>
      {form.values.vendorContacts.map((contact, idx) => (
        <Contact key={contact.key} contact={contact} idx={idx} />
      ))}
      <Group my="10px">
        <Button
          type="button"
          size="compact-sm"
          onClick={() => {
            form.insertListItem(`vendorContacts`, {
              name: "",
              email: "",
              mobile: "",
              phone: "",
              notes: "",
              key: randomId(),
            })
          }}
          color="blue"
          variant="subtle"
        >
          Add
        </Button>
      </Group>
    </Stack>
  )
}

export default function VendorForm(props: {
  initialValues?: Vendor
  onSubmit: (data: Vendor) => void
  loading?: boolean
}) {
  const form = useForm({
    initialValues: props.initialValues ?? {
      name: "",
      email: "",
      mobile: "",
      phone: "",
      notes: "",
      team: {
        name: "",
        slug: "",
        members: [],
      },
      isActive: true,
      vendorContacts: [
        {
          name: "",
          email: "",
          mobile: "",
          phone: "",
          notes: "",
          key: randomId(),
        },
      ],
      pricingList: [],
    },
    validate: {
      name: (v) => (v ? null : "This is required"),
      vendorContacts: {
        name: (v) => (v ? null : "This is required"),
      },
    },
  })

  return (
    <FormProvider form={form}>
      <form onSubmit={form.onSubmit(props.onSubmit)}>
        <Stack>
          <Card
            pos="sticky"
            top="0"
            style={{
              zIndex: "10",
            }}
            withBorder
          >
            <Flex justify="space-between" align="center">
              <Title order={2}>
                {props.initialValues?.id ? "Edit vendor" : "Create Vendor"}
              </Title>
              <Button
                type="submit"
                loading={props.loading}
                disabled={!form.isDirty()}
              >
                Submit
              </Button>
            </Flex>
          </Card>
          <Fieldset legend="Vendor Information">
            <Flex align="center" gap={20}>
              <TextInput
                label="Name"
                {...form.getInputProps("name")}
                w="100%"
              />
              <TextInput
                label="Email"
                {...form.getInputProps("email")}
                w="100%"
              />
              {props.initialValues && (
                <Box>
                  <Text fw={700} size="sm">
                    Is active?
                  </Text>
                  <Switch
                    size="xl"
                    disabled={!props.initialValues}
                    onLabel="Yes"
                    offLabel="No"
                    {...form.getInputProps(`isActive`, { type: "checkbox" })}
                  />
                </Box>
              )}
            </Flex>
            <SimpleGrid cols={{ sm: 2 }}>
              <TextInput label="Mobile" {...form.getInputProps("mobile")} />
              <TextInput label="Phone" {...form.getInputProps("phone")} />
            </SimpleGrid>
            <Textarea
              label="Notes"
              {...form.getInputProps("notes")}
              autosize
              minRows={3}
            />
          </Fieldset>
          <Fieldset legend="Contacts">
            <Stack gap={10}>
              <Contacts />
            </Stack>
          </Fieldset>
        </Stack>
      </form>
    </FormProvider>
  )
}
