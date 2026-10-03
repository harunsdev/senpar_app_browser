import { auth } from '@/auth'
import { redirect } from 'next/navigation'
import { SignupForm } from './_components/signup-form'

export default async function SignupPage() {
  const session = await auth()
  if (session?.user) redirect('/dashboard')

  return (
    <div className="min-h-screen flex items-center justify-center p-4 hero-gradient">
      <div className="w-full max-w-md">
        <div className="mb-6 rounded-lg border border-amber-400/30 bg-amber-500/10 px-4 py-3 text-center">
          <p className="text-sm font-medium text-amber-200">
            ⚠️ TEST MODE — For demo purposes only. Do not enter real data.
          </p>
        </div>
        <SignupForm />
      </div>
    </div>
  )
}
