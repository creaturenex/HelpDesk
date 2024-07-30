import { createLazyFileRoute } from '@tanstack/react-router'
import Tickets from '@/components/Tickets'

export const Route = createLazyFileRoute('/tickets')({
  component: () => 
    <div className='flex flex-col items-center justify-center'>
      <Tickets />
    </div>
})