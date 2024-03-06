/* eslint-disable no-undef */
import { Button } from "@/components/ui/button";
import { ReloadIcon } from "@radix-ui/react-icons";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AuthContext } from "@/context/auth";
import { useContext, useState } from "react";
import { Navigate, Link } from "react-router-dom";
import errorMessage from "@/services/error";
import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner";
import { ModeToggle } from "@/components/modeToggle";
import PasswordInput from "@/components/passwordInput";


const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signIn, signed } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);

  const handleSignIn = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    const data = {
      email,
      password,
    };

    try {
      const res = await signIn(data);
      setIsLoading(false);
      setEmail("");
      setPassword("");

      if (res.response.data.error) {
        toast("Error", {
          description: errorMessage(res),
          action: {
            label: "Fechar",
            onClick: () => console.log(),
          },
        });
      }
    } catch (error) {
      toast("Error", {
        description: "Erro interno no servidor.",
        action: {
          label: "Fechar",
          onClick: () => console.log(),
        },
      });
      console.log(error.message);
    }
  };

  if (signed) {
    return <Navigate to="/" />;
  } else {
    return (
      <div className="min-h-screen flex text-3xl flex-row flex-wrap">
        <div className=" flex-1 min-h-screen max-lg:hidden">
          <div className="bg-[url('./assets/template6.svg')] bg-cover bg-bottom h-full flex items-end justify-center">
            <p className="text-xl mb-6 font-thin italic text-slate-600">2024 &copy; Vitor Santos</p>
          </div>
        </div>
        <div className="absolute right-0 m-5">
          <ModeToggle />
        </div>
        <div className="flex-1 min-h-screen flex justify-center items-center flex-col">
          <Card className="w-[350px] pt-4 pb-1 border-none">
            <CardHeader>
              <CardTitle>Login</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSignIn}>
                <div className="grid w-full items-center gap-4">
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="email">E-mail</Label>
                    <Input
                      required
                      type="email"
                      id="email"
                      placeholder="Digite seu e-mail"
                      onChange={(event) => setEmail(event.target.value)}
                      value={email}
                    />
                  </div>
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="password">Password</Label>
                    <PasswordInput
                      required
                      id="password"
                      placeholder="Digite sua senha"
                      onChange={(event) => setPassword(event.target.value)}
                      value={password}
                    />
                    
                  </div>
                </div>
                <Button
                  disabled={isLoading}
                  type="submit"
                  className="w-full mt-6">
                  {isLoading ? (
                    <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                  ) : (
                    ""
                  )}
                  Login
                </Button>
              </form>
              <div className="flex justify-center mt-2">
                <CardDescription className="mt-2">
                  Ainda não possui uma conta?
                </CardDescription>
                <Button variant="link" className="pl-1">
                  <Link to="/register">Cadastre-se</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
          <Toaster />
        </div>
      </div>
    );
  }
};

export default Login;
