import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="text-center space-y-6">
        <div className="space-y-2">
          <h1 className="text-9xl font-bold text-primary">404</h1>
          <h2 className="text-3xl font-semibold text-foreground">Page Not Found</h2>
          <p className="text-muted-foreground max-w-md mx-auto">
            Sorry, we couldn't find the page you're looking for. It might have been moved or deleted.
          </p>
        </div>
        <div className="flex gap-4 justify-center">
          <Link href="/">
            <Button className="bg-primary text-primary-foreground hover:bg-primary/90">Go Home</Button>
          </Link>
          <Link href="/auth">
            <Button variant="outline">Sign In</Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
