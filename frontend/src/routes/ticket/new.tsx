// import TicketNew from '@/components/ticket/TicketNew'
import TNew from '@/components/ticket/TNew'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/ticket/new')({
  // component: () => <TicketNew />
  component: () => <TNew />
})