import { Button } from '@/components/ui/button'
import Link from 'next/link'

export const metadata={
    title:"not-found"
}

export default function NotFound() {
  return (
    <div className='min-h-dvh flex items-center justify-center'>
    <div className=" flex flex-col justify-center items-center gap-4">
      <h2 className="text-2xl">Page Not Found</h2>
      <Link href="/">
      <Button variant="secondary">
      Return Home
      </Button>
      </Link>
    </div>
    </div>
  )
}