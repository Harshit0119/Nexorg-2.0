import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar, Mail } from "lucide-react"
import Link from "next/link"

export default function SignUpSuccessPage() {
  return (
    <div className="flex min-h-svh w-full items-center justify-center bg-gradient-to-br from-primary/5 via-background to-accent/5 p-6 md:p-10">
      <div className="w-full max-w-sm">
        <div className="flex flex-col gap-6">
          {/* Logo */}
          <Link href="/" className="mx-auto flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
              <Calendar className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="text-2xl font-semibold tracking-tight">Nexorg</span>
          </Link>

          <Card className="border-border/50 shadow-lg">
            <CardHeader className="text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                <Mail className="h-8 w-8 text-primary" />
              </div>
              <CardTitle className="text-2xl">Check your email</CardTitle>
              <CardDescription>
                We&apos;ve sent you a confirmation link
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-sm text-muted-foreground leading-relaxed">
                Please check your email inbox and click the confirmation link to activate your account. 
                The link will expire in 24 hours.
              </p>
              <div className="mt-6 flex flex-col gap-3">
                <Button variant="outline" asChild className="w-full">
                  <Link href="/auth/login">
                    Back to Sign In
                  </Link>
                </Button>
              </div>
              <p className="mt-6 text-xs text-muted-foreground">
                Didn&apos;t receive the email? Check your spam folder or{" "}
                <Link href="/auth/sign-up" className="text-primary hover:underline underline-offset-4">
                  try again
                </Link>
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
