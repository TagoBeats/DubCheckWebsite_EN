import type { Metadata } from 'next'
import { Suspense } from 'react'
import CheckoutPage from '@/components/CheckoutPage'

export const metadata: Metadata = {
  title: "You're on the list | DubCheck",
  robots: { index: false, follow: false },
}

export default function Page() {
  return (
    <Suspense>
      <CheckoutPage />
    </Suspense>
  )
}
