import Navbar from '@/components/Navbar'
import { createRootRoute, Outlet } from '@tanstack/react-router'

export const Route = createRootRoute({
  component: () => {
    return (
      <>
        <Navbar />
        <div className='flex flex-col items-center justify-start min-h-screen mt-16 md:justify-center'>
          <Outlet />
        </div>
      </>
    )
  }
})
