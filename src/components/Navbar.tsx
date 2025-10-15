import { Button } from "@/components/ui/button";
import { Menu, Search, User, LogOut, LayoutDashboard, Briefcase } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const userType = user?.user_metadata?.user_type || 'worker';

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  return (
    <nav className="sticky top-0 z-50 bg-card border-b border-border backdrop-blur-sm bg-opacity-95">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-lg">BD</span>
            </div>
            <span className="text-xl font-bold text-foreground">ByDay</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {user ? (
              <>
                <Link to="/dashboard" className="text-foreground hover:text-primary transition-colors font-medium">
                  Dashboard
                </Link>
                {userType === 'worker' ? (
                  <Link to="/jobs" className="text-foreground hover:text-primary transition-colors font-medium">
                    Find Work
                  </Link>
                ) : (
                  <Link to="/jobs/new" className="text-foreground hover:text-primary transition-colors font-medium">
                    Post a Job
                  </Link>
                )}
              </>
            ) : (
              <>
                <a href="#how-it-works" className="text-foreground hover:text-primary transition-colors font-medium">
                  How It Works
                </a>
                <a href="#features" className="text-foreground hover:text-primary transition-colors font-medium">
                  Features
                </a>
              </>
            )}
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-3">
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={user.user_metadata?.avatar_url} alt={user.user_metadata?.full_name || 'User'} />
                      <AvatarFallback>
                        {(user.user_metadata?.full_name || user.email || 'U').charAt(0).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">{user.user_metadata?.full_name || 'User'}</p>
                      <p className="text-xs leading-none text-muted-foreground">{user.email}</p>
                      <p className="text-xs leading-none text-muted-foreground capitalize">{userType}</p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => navigate('/dashboard')}>
                    <LayoutDashboard className="mr-2 h-4 w-4" />
                    <span>Dashboard</span>
                  </DropdownMenuItem>
                  {userType === 'worker' && (
                    <DropdownMenuItem onClick={() => navigate('/jobs')}>
                      <Briefcase className="mr-2 h-4 w-4" />
                      <span>Find Jobs</span>
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleSignOut}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <>
                <Button variant="outline" onClick={() => navigate('/auth')}>
                  <User className="h-4 w-4 mr-2" />
                  Sign In
                </Button>
                <Button className="bg-accent hover:bg-accent/90 text-accent-foreground" onClick={() => navigate('/auth')}>
                  Get Started
                </Button>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 space-y-3 border-t border-border">
            {user ? (
              <>
                <Link
                  to="/dashboard"
                  className="block px-4 py-2 text-foreground hover:bg-muted rounded-lg"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Dashboard
                </Link>
                {userType === 'worker' ? (
                  <Link
                    to="/jobs"
                    className="block px-4 py-2 text-foreground hover:bg-muted rounded-lg"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Find Work
                  </Link>
                ) : (
                  <Link
                    to="/jobs/new"
                    className="block px-4 py-2 text-foreground hover:bg-muted rounded-lg"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Post a Job
                  </Link>
                )}
                <div className="px-4 pt-3 border-t border-border">
                  <div className="flex items-center space-x-3 mb-3">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={user.user_metadata?.avatar_url} alt={user.user_metadata?.full_name || 'User'} />
                      <AvatarFallback>
                        {(user.user_metadata?.full_name || user.email || 'U').charAt(0).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium">{user.user_metadata?.full_name || 'User'}</p>
                      <p className="text-xs text-muted-foreground capitalize">{userType}</p>
                    </div>
                  </div>
                  <Button variant="outline" className="w-full" onClick={handleSignOut}>
                    <LogOut className="h-4 w-4 mr-2" />
                    Log Out
                  </Button>
                </div>
              </>
            ) : (
              <>
                <a href="#how-it-works" className="block px-4 py-2 text-foreground hover:bg-muted rounded-lg">
                  How It Works
                </a>
                <a href="#features" className="block px-4 py-2 text-foreground hover:bg-muted rounded-lg">
                  Features
                </a>
                <div className="px-4 pt-3 space-y-2 border-t border-border">
                  <Button variant="outline" className="w-full" onClick={() => navigate('/auth')}>
                    <User className="h-4 w-4 mr-2" />
                    Sign In
                  </Button>
                  <Button className="w-full bg-accent hover:bg-accent/90 text-accent-foreground" onClick={() => navigate('/auth')}>
                    Get Started
                  </Button>
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
