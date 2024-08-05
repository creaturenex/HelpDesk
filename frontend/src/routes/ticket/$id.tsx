import TShow from '@/components/ticket/TShow';
// import TicketT from '@/components/ticket/TicketT';
import { createFileRoute } from '@tanstack/react-router'


export const Route = createFileRoute('/ticket/$id')({
  // component: () => <TicketT />
  component: () => <TShow />
});

// TROUBLESHOOT PATH PARAMS
// import { createRoute } from '@tanstack/react-router'
// import Ticket from '@/components/ticket/Ticket';

// export const Route = createRoute({
//   path: '/ticket/$id',
//   loader: async({params}) => {
//     console.log('Params:', params)
//     if (!params.id) {
//       throw new Error('Ticket ID not found');
//     }
//     return params
//   },
//   component: Ticket,
// });
