import { useEffect, useState, type FormEvent } from "react";
import { z } from "zod";
import { useAuth } from "@/contexts/AuthContext";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { toast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const schema = z.object({
  email: z.string().trim().email({ message: "Enter a valid email" }).max(255),
  password: z.string().min(6, { message: "Min 6 characters" }).max(100),
  fullName: z.string().trim().min(2, { message: "Enter your name" }).max(100).optional(),
  userType: z.enum(["worker", "client"]).optional(),
});

const AuthPage = (): JSX.Element => {
  const { signIn, signUp } = useAuth();
  const [loading, setLoading] = useState<boolean>(false);
  const [userType, setUserType] = useState<"worker" | "client">("worker");
  const navigate = useNavigate();

  useEffect(() => {
    const check = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) navigate("/", { replace: true });
    };
    check();
  }, [navigate]);

  const handleLogin = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = String(formData.get("email"));
    const password = String(formData.get("password"));

    const parsed = schema.pick({ email: true, password: true }).safeParse({ email, password });
    if (!parsed.success) {
      toast({ 
        title: "Invalid input", 
        description: parsed.error.errors[0].message,
        variant: "destructive" 
      });
      return;
    }

    setLoading(true);
    const { error } = await signIn(email, password);
    if (error) {
      toast({ 
        title: "Login failed", 
        description: error,
        variant: "destructive" 
      });
    } else {
      navigate("/", { replace: true });
    }
    setLoading(false);
  };

  const handleSignup = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = String(formData.get("email"));
    const password = String(formData.get("password"));
    const fullName = String(formData.get("fullName"));

    const parsed = schema.safeParse({ email, password, fullName, userType });
    if (!parsed.success) {
      toast({ 
        title: "Invalid input", 
        description: parsed.error.errors[0].message,
        variant: "destructive" 
      });
      return;
    }

    setLoading(true);
    const { error } = await signUp(email, password, fullName, userType);
    if (error) {
      toast({ 
        title: "Signup failed", 
        description: error,
        variant: "destructive" 
      });
    } else {
      toast({ 
        title: "Welcome to ByDay", 
        description: "Account created. Kindly check your email for verification." 
      });
      navigate("/", { replace: true });
    }
    setLoading(false);
  };


  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-lg bg-card border border-border rounded-2xl shadow-lg p-6">
        <div className="text-center mb-6">
          <div className="inline-flex items-center space-x-2">
            <div className="w-9 h-9 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-lg">B</span>
            </div>
            <span className="text-2xl font-bold">ByDay</span>
          </div>
          <p className="text-muted-foreground mt-2">Log in or create an account</p>
        </div>

        <Tabs defaultValue="login">
          <TabsList className="grid grid-cols-2 w-full">
            <TabsTrigger value="login">Login</TabsTrigger>
            <TabsTrigger value="signup">Sign Up</TabsTrigger>
          </TabsList>

          <TabsContent value="login">
            <form onSubmit={handleLogin} className="space-y-4 mt-4">
              <div>
                <Label htmlFor="email">Email</Label>
                <Input id="email" name="email" type="email" placeholder="you@example.com" required />
              </div>
              <div>
                <Label htmlFor="password">Password</Label>
                <Input id="password" name="password" type="password" placeholder="••••••••" required />
              </div>
              <Button type="submit" disabled={loading} className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
                {loading ? "Please wait..." : "Login"}
              </Button>
            </form>
          
          </TabsContent>

          <TabsContent value="signup">
            <form onSubmit={handleSignup} className="space-y-4 mt-4">
              <div>
                <Label htmlFor="fullName">Full name</Label>
                <Input id="fullName" name="fullName" placeholder="Ama Kofi" required />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input id="email" name="email" type="email" placeholder="you@example.com" required />
              </div>
              <div>
                <Label htmlFor="password">Password</Label>
                <Input id="password" name="password" type="password" placeholder="••••••••" required />
              </div>
              <div>
                <Label htmlFor="userType">I am a</Label>
                <Select value={userType} onValueChange={(value: "worker" | "client") => setUserType(value)}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select user type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="worker">Worker - Looking for jobs</SelectItem>
                    <SelectItem value="client">Client - Posting jobs</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button type="submit" disabled={loading} className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
                {loading ? "Please wait..." : "Create account"}
              </Button>
            </form>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AuthPage;
