import {
  ActionIcon,
  AppShell,
  Avatar,
  Box,
  Group,
  Menu,
  ScrollArea,
  Text,
  ThemeIcon,
  UnstyledButton,
  rem,
  useMantineColorScheme,
} from "@mantine/core"
import { Link, Outlet, useLocation } from "react-router-dom"
import {
  Icon123,
  IconChalkboard,
  IconHome,
  IconMenu2,
  IconMoonStars,
  IconSchool,
  IconShield,
  IconSun,
} from "@tabler/icons-react"
import { useAuthStore } from "../stores"
import { useDisclosure } from "@mantine/hooks"
import classes from "./Wrapper.module.css"

const navigation: { icon: React.ReactNode; label: string; path: string }[] = [
  {
    icon: <IconHome size="1rem" />,
    label: "Dashboard",
    path: "/",
  },
  {
    icon: <IconChalkboard size="1rem" />,
    label: "Items",
    path: "/items",
  },
  {
    icon: <Icon123 size="1rem" />,
    label: "Subscriptions",
    path: "/subscriptions",
  },
  {
    icon: <Icon123 size="1rem" />,
    label: "Payouts",
    path: "/payouts",
  },
  {
    icon: <Icon123 size="1rem" />,
    label: "Vendors",
    path: "/vendors",
  },
  {
    icon: <Icon123 size="1rem" />,
    label: "Members",
    path: "/members",
  },
]

export default function BaseWrapper() {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme()
  const dark = colorScheme === "dark"
  const authStore = useAuthStore()
  const resource = useLocation().pathname.split("/")[1]

  const [opened] = useDisclosure()
  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{ width: 250, breakpoint: "sm", collapsed: { mobile: !opened } }}
      padding="sm"
    >
      <AppShell.Header>
        <Group h="100%" justify="space-between">
          <Group w={{ base: 250 }} justify="center">
            <Avatar color="cyan" radius="xl">
              <IconSchool size="1.5rem" />
            </Avatar>
            <Text truncate>ABCDEFG</Text>
          </Group>
          <Group px="xs">
            <Link to="/admin/users">
              <ActionIcon variant="outline">
                <IconShield size="1rem" />
              </ActionIcon>
            </Link>
            <ActionIcon
              variant="outline"
              color={dark ? "yellow" : "blue"}
              onClick={() => toggleColorScheme()}
              title="Toggle color scheme"
            >
              {dark ? <IconSun size="1rem" /> : <IconMoonStars size="1rem" />}
            </ActionIcon>
            <Menu shadow="md">
              <Menu.Target>
                <ActionIcon variant="outline" color="blue">
                  <IconMenu2 size="1rem" />
                </ActionIcon>
              </Menu.Target>
              <Menu.Dropdown>
                <Menu.Item
                  // icon={<IconLogout size={14} />}
                  onClick={() => {
                    authStore.logout()
                    localStorage.removeItem("accessToken")
                  }}
                >
                  Logout
                </Menu.Item>
              </Menu.Dropdown>
            </Menu>
          </Group>
        </Group>
      </AppShell.Header>
      <AppShell.Navbar p="sm">
        <AppShell.Section grow my="md" component={ScrollArea}>
          {navigation.map((nav) => (
            <Link
              key={nav.path}
              to={nav.path}
              style={{ textDecoration: "none" }}
            >
              <Box
                style={(theme) => ({
                  width: "100%",
                  padding: theme.spacing.xs,
                  borderRadius: theme.radius.sm,
                  color:
                    colorScheme === "dark" ? theme.colors.dark[0] : theme.black,
                  backgroundColor:
                    `/${resource}` === nav.path
                      ? colorScheme === "dark"
                        ? theme.colors.gray[9]
                        : theme.colors.gray[2]
                      : "",
                })}
                className={classes.demo}
              >
                <Group>
                  <ThemeIcon variant="light">{nav.icon}</ThemeIcon>
                  <Text fw={500} size="sm">
                    {nav.label}
                  </Text>
                </Group>
              </Box>
            </Link>
          ))}
        </AppShell.Section>
        <AppShell.Section>
          <Box
            style={(theme) => ({
              paddingTop: theme.spacing.sm,
              borderTop: `${rem(1)} solid ${
                colorScheme === "dark"
                  ? theme.colors.dark[4]
                  : theme.colors.gray[2]
              }`,
            })}
          >
            <UnstyledButton
              style={(theme) => ({
                display: "block",
                width: "100%",
                padding: theme.spacing.xs,
                borderRadius: theme.radius.sm,
                color:
                  colorScheme === "dark" ? theme.colors.dark[0] : theme.black,
              })}
            >
              <Group>
                <Avatar
                  src="https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=255&q=80"
                  radius="xl"
                />
                <Box style={{ flex: 1 }}>
                  <Text size="sm" fw={500}>
                    Amy Horsefighter
                  </Text>
                  <Text size="xs" truncate>
                    {authStore.user?.email}
                  </Text>
                </Box>
              </Group>
            </UnstyledButton>
          </Box>
        </AppShell.Section>
      </AppShell.Navbar>
      <AppShell.Main>
        <ScrollArea.Autosize mah="calc(100vh - 84px)">
          <Outlet />
        </ScrollArea.Autosize>
      </AppShell.Main>
    </AppShell>
  )
}
