import {
  ActionIcon,
  AppShell,
  Avatar,
  Box,
  Group,
  Menu,
  Text,
  ThemeIcon,
  UnstyledButton,
  rem,
  useMantineColorScheme,
} from "@mantine/core"
import { Link, Outlet } from "react-router-dom"
import {
  IconHome,
  IconLogout,
  IconMenu2,
  IconMoonStars,
  IconSchool,
  IconShield,
  IconSun,
} from "@tabler/icons-react"
import { useAuthStore } from "../stores"
import { useDisclosure } from "@mantine/hooks"

const navigation: { icon: React.ReactNode; label: string; path: string }[] = [
  {
    icon: <IconHome size="1rem" />,
    label: "Users",
    path: "/admin/users",
  },
  {
    icon: <IconHome size="1rem" />,
    label: "Team",
    path: "/admin/teams",
  },
]

export default function AdminWrapper() {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme()
  const dark = colorScheme === "dark"
  const authStore = useAuthStore()

  const [opened, { toggle }] = useDisclosure()
  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{ width: 300, breakpoint: "sm", collapsed: { mobile: !opened } }}
    >
      <AppShell.Header>
        header
        {/* <Header
          height={60}
          display="flex"
          sx={{ justifyContent: "space-between" }}
        >
          <Group w={{ base: 250 }} position="center" noWrap>
            <Avatar color="cyan" radius="xl">
              <IconSchool size="1.5rem" />
            </Avatar>
            <Link to="/">
              <Text truncate sx={{ whiteSpace: "nowrap" }}>
                ABCDEFG
              </Text>
            </Link>
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
                  icon={<IconLogout size={14} />}
                  onClick={() => {
                    authStore.setIsLogged(false)
                    localStorage.removeItem("accessToken")
                  }}
                >
                  Logout
                </Menu.Item>
              </Menu.Dropdown>
            </Menu>
          </Group>
        </Header> */}
      </AppShell.Header>
      <AppShell.Navbar>
        navber
        {/* <Navbar zIndex={0} p="xs" width={{ base: 250 }}>
          <Navbar.Section grow>
            {navigation.map((nav) => (
              <Link
                key={nav.path}
                to={nav.path}
                style={{ textDecoration: "none" }}
              >
                <Box
                  sx={(theme) => ({
                    width: "100%",
                    padding: theme.spacing.xs,
                    borderRadius: theme.radius.sm,
                    color:
                      theme.colorScheme === "dark"
                        ? theme.colors.dark[0]
                        : theme.black,
                    "&:hover": {
                      backgroundColor:
                        theme.colorScheme === "dark"
                          ? theme.colors.dark[6]
                          : theme.colors.gray[0],
                    },
                  })}
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
          </Navbar.Section>
          <Navbar.Section>
            <Box
              sx={(theme) => ({
                paddingTop: theme.spacing.sm,
                borderTop: `${rem(1)} solid ${
                  theme.colorScheme === "dark"
                    ? theme.colors.dark[4]
                    : theme.colors.gray[2]
                }`,
              })}
            >
              <UnstyledButton
                sx={(theme) => ({
                  display: "block",
                  width: "100%",
                  padding: theme.spacing.xs,
                  borderRadius: theme.radius.sm,
                  color:
                    theme.colorScheme === "dark"
                      ? theme.colors.dark[0]
                      : theme.black,

                  "&:hover": {
                    backgroundColor:
                      theme.colorScheme === "dark"
                        ? theme.colors.dark[6]
                        : theme.colors.gray[0],
                  },
                })}
              >
                <Group noWrap>
                  <Avatar
                    src="https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=255&q=80"
                    radius="xl"
                  />
                  <Box sx={{ flex: 1 }}>
                    <Text size="sm" weight={500}>
                      Amy Horsefighter
                    </Text>
                    <Text color="dimmed" size="xs" truncate>
                      ahorsefighter@gmail.com
                    </Text>
                  </Box>
                </Group>
              </UnstyledButton>
            </Box>
          </Navbar.Section>
        </Navbar> */}
      </AppShell.Navbar>
      <AppShell.Main>
        <Outlet />
      </AppShell.Main>
    </AppShell>
  )
}
