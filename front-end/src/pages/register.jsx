import { Button } from "@/components/ui/button";
import { ReloadIcon } from "@radix-ui/react-icons";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { api } from "@/services/api";
import { useState } from "react";
import errorMessage from "@/services/error";
import { ModeToggle } from "@/components/modeToggle";
import { Link } from "react-router-dom";
import PasswordInput from "@/components/passwordInput";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSaveUser = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    const data = {
      email,
      password,
      username,
    };
    try {
      const res = await api.post("/users", data);
      console.log(res.data.message);
      toast("Usuário cadastrado com sucesso!", {
        description: "Volte para o menu de login",
        action: {
          label: "Ok",
          onClick: () => console.log(),
        },
      });

      setUsername("");
      setEmail("");
      setPassword("");
      setIsLoading(false);
    } catch (error) {
      toast("Error", {
        description: errorMessage(error),
        action: {
          label: "Fechar",
          onClick: () => console.log(),
        },
      });
      setUsername("");
      setEmail("");
      setPassword("");
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex text-3xl flex-row flex-wrap">
      <div className=" flex-1 min-h-screen max-lg:hidden">
        <div className="bg-[url('./assets/template6.svg')] bg-cover bg-bottom h-full"></div>
      </div>
      <div className="absolute right-0 m-5">
        <ModeToggle />
      </div>
      <div className="flex-1 min-h-screen flex flex- justify-center items-center ">
        <Card className="w-[350px] pt-4 pb-1 border-none">
          <CardHeader>
            <CardTitle>Register</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSaveUser}>
              <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="username">Username</Label>
                  <Input
                    required
                    id="email"
                    placeholder="Digite seu nome de usuário"
                    onChange={(event) => setUsername(event.target.value)}
                    value={username}
                  />
                </div>
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
                Register
              </Button>
            </form>
            <div className="flex justify-center mt-2">
              <CardDescription className="mt-2">
                Já possui uma conta?
              </CardDescription>
              <Button variant="link" className="pl-1">
                <Link to="/login">Entrar</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
        <Toaster />
      </div>
    </div>
  );
};

export default Register;
