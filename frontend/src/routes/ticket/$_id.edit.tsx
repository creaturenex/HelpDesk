import TicketEdit from '@/components/ticket/TicketEdit'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/ticket/$_id/edit')({
  component: () => <TicketEdit />
})