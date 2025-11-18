// app/not-found.tsx
import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gray-50 px-4">
      <h1 className="text-6xl font-extrabold text-gray-900">404</h1>
      <h2 className="mt-4 text-2xl font-semibold text-gray-800">
        Page not found
      </h2>
      <p className="mt-2 text-gray-500 text-center max-w-md">
        ขอโทษด้วยนะครับ ไม่พบหน้าที่คุณต้องการเข้าชม
      </p>

      <Link
        href="/"
        className="mt-6 inline-flex items-center rounded-md border border-transparent
                   px-5 py-2 text-sm font-medium
                   bg-blue-600 text-white hover:bg-blue-700
                   focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      >
        กลับหน้าแรก
      </Link>
    </main>
  );
}
