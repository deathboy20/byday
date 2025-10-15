"use client"

import { Button } from "@/components/ui/button"
import { Menu, Search, User } from "lucide-react"
import { useState } from "react"
import Link from "next/link"

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <nav className="sticky top-0 z-50 bg-card border-b border-border backdrop-blur-sm bg-opacity-95">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-lg">BD</span>
            </div>
            <span className="text-xl font-bold text-foreground">ByDay</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <Link href="/" className="text-foreground hover:text-primary transition-colors font-medium">
              Find Work
            </Link>
            <Link href="/dashboard/client" className="text-foreground hover:text-primary transition-colors font-medium">
              Post a Job
            </Link>
            <Link href="#" className="text-foreground hover:text-primary transition-colors font-medium">
              How It Works
            </Link>
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-3">
            <Button variant="ghost" size="icon">
              <Search className="h-5 w-5" />
            </Button>
            <Link href="/auth">
              <Button variant="outline">
                <User className="h-4 w-4 mr-2" />
                Sign In
              </Button>
            </Link>
            <Link href="/auth">
              <Button className="bg-accent hover:bg-accent/90 text-accent-foreground">Get Started</Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden p-2" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            <Menu className="h-6 w-6" />
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 space-y-3 border-t border-border">
            <Link href="/" className="block px-4 py-2 text-foreground hover:bg-muted rounded-lg">
              Find Work
            </Link>
            <Link href="/dashboard/client" className="block px-4 py-2 text-foreground hover:bg-muted rounded-lg">
              Post a Job
            </Link>
            <Link href="#" className="block px-4 py-2 text-foreground hover:bg-muted rounded-lg">
              How It Works
            </Link>
            <div className="px-4 pt-3 space-y-2 border-t border-border">
              <Link href="/auth">
                <Button variant="outline" className="w-full bg-transparent">
                  <User className="h-4 w-4 mr-2" />
                  Sign In
                </Button>
              </Link>
              <Link href="/auth">
                <Button className="w-full bg-accent hover:bg-accent/90 text-accent-foreground">Get Started</Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navbar
