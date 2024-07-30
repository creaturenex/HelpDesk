import TicketNew from '@/components/ticket/TicketNew'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/ticket/new')({
  component: () => <TicketNew />
})