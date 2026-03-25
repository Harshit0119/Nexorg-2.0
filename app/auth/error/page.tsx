import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar, AlertTriangle } from "lucide-react"
import Link from "next/link"

export default async function AuthErrorPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>
}) {
  const params = await searchParams

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
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-destructive/10">
                <AlertTriangle className="h-8 w-8 text-destructive" />
              </div>
              <CardTitle className="text-2xl">Authentication Error</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-sm text-muted-foreground leading-relaxed">
                {params?.error 
                  ? `Error: ${params.error}` 
                  : "An unexpected error occurred during authentication. Please try again."}
              </p>
              <div className="mt-6 flex flex-col gap-3">
                <Button asChild className="w-full">
                  <Link href="/auth/login">
                    Back to Sign In
                  </Link>
                </Button>
                <Button variant="outline" asChild className="w-full">
                  <Link href="/">
                    Go to Home
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
