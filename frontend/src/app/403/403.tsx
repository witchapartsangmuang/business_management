// app/403/page.tsx
'use client'

import { useRouter } from 'next/navigation'

export default function ForbiddenPage() {
  const router = useRouter()

  return (
    <div className="flex min-h-screen flex-col items-center justify-center text-center">
      <h1 className="text-6xl font-bold text-red-600">403</h1>
      <p className="mt-4 text-xl font-semibold">
        Access Denied
      </p>
      <p className="mt-2 text-gray-500">
        You do not have permission to access this page.
      </p>

      <button
        className="mt-6 rounded bg-blue-600 px-6 py-2 text-white hover:bg-blue-700"
        onClick={() => router.push('/')}
      >
        Go back home
      </button>
    </div>
  )
}
