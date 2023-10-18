import { Box } from "@mantine/core"
import { VendorForm } from "../../forms"
import { useTeamVendorCreate } from "../../hooks"

export default function VendorCreate() {
  const createVendor = useTeamVendorCreate()

  return (
    <Box maw="800px">
      <VendorForm onSubmit={createVendor} />
    </Box>
  )
}
