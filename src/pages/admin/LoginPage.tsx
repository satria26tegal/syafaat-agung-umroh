import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";
import { useAuth } from "@/contexts/AuthContext";
import logo from "@/assets/logo.png";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { signIn } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const { error } = await signIn(email, password);

    if (error) {
      toast.error("Login gagal. Periksa email dan password Anda.");
      setIsLoading(false);
    } else {
      toast.success("Login berhasil!");
      navigate("/admin/dashboard");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-elegant flex items-center justify-center p-4">
      <Card className="w-full max-w-md p-8 border-gold/20">
        <div className="text-center mb-8">
          <img src={logo} alt="Logo" className="h-20 w-20 mx-auto mb-4" />
          <h1 className="text-3xl font-cairo font-bold text-gold mb-2">Admin Login</h1>
          <p className="text-muted-foreground">Syafaat Agung Tour & Travel</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Email</label>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@syafaatagung.com"
              required
              disabled={isLoading}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Password</label>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              disabled={isLoading}
            />
          </div>

          <Button
            type="submit"
            className="w-full bg-gradient-gold hover:opacity-90"
            disabled={isLoading}
          >
            {isLoading ? "Memproses..." : "Login"}
          </Button>
        </form>

        <p className="text-center text-sm text-muted-foreground mt-6">
          Hubungi administrator untuk mendapatkan akses
        </p>
      </Card>
    </div>
  );
};

export default LoginPage;