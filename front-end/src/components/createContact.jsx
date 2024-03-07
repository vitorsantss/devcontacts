/* eslint-disable react/no-unescaped-entities */
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "./ui/button";
import { Label } from "@radix-ui/react-dropdown-menu";
import { Input } from "./ui/input";
import { IoIosAddCircleOutline } from "react-icons/io";
import { useState } from "react";
import { Toaster } from "./ui/sonner";
import { toast } from "sonner";
import { api } from "@/services/api";
import errorMessage from "@/services/error";

const CreateContact = () => {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [telefone, setTelefone] = useState("");
  const [cargo, setCargo] = useState("");
  const [github, setGithub] = useState("");

  const reload = () => {
    setTimeout(function() {
      window.location.reload();
  }, 1000);
  }

  const handleCreateContact = async (event) => {
    event.preventDefault();

    const token = localStorage.getItem("@Auth:token");

    const data = {
      name: nome,
      email: email,
      phone: telefone,
      position: cargo,
      github: github,
    };

    try {
      await api.post(`/contacts`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      toast("Sucesso", {
        description: "Contato criado com sucesso",
        action: {
          label: "Fechar",
          onClick: () => console.log(),
        },
      });
      setNome("");
      setEmail("");
      setTelefone("");
      setCargo("");
      setGithub("");
      reload();
    } catch (error) {

      toast("Error", {
        description: errorMessage(error),
        action: {
          label: "Fechar",
          onClick: () => console.log(),
        },
      });

      setNome("");
      setEmail("");
      setTelefone("");
      setCargo("");
      setGithub("");
    }
  };

  return (
    <div>
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="secondary" className="flex items-center gap-1">
            <IoIosAddCircleOutline />
            Novo
          </Button>
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Novo contato</SheetTitle>
            <SheetDescription>
              Crie um contato preenchendo os campos abaixo
            </SheetDescription>
          </SheetHeader>
          <form onSubmit={handleCreateContact}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="nome" className="text-right">
                  Nome *
                </Label>
                <Input
                  required
                  id="nome"
                  name="nome"
                  value={nome}
                  className="col-span-3"
                  placeholder="Vitor Santos"
                  onChange={(e) => setNome(e.target.value)}
                />
              </div>

              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="email" className="text-right">
                  Email *
                </Label>
                <Input
                  required
                  id="email"
                  name="email"
                  type="email"
                  value={email}
                  className="col-span-3"
                  placeholder="example@gmail.com"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="telefone" className="text-right">
                  Telefone *
                </Label>
                <Input
                  required
                  type="number"
                  id="telefone"
                  name="telefone"
                  value={telefone}
                  className="col-span-3 appearance-none"
                  placeholder="(99) 99999-9999"
                  onChange={(e) => setTelefone(e.target.value)}
                />
              </div>

              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="cargo" className="text-right">
                  Cargo
                </Label>
                <Input
                  id="cargo"
                  name="cargo"
                  value={cargo}
                  className="col-span-3"
                  placeholder="Desenvolvedor"
                  onChange={(e) => setCargo(e.target.value)}
                />
              </div>

              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="github" className="text-right">
                  Github
                </Label>
                <Input
                  id="github"
                  name="github"
                  value={github}
                  className="col-span-3"
                  placeholder="vitorsantss"
                  onChange={(e) => setGithub(e.target.value)}
                />
              </div>
            </div>
            <SheetFooter>
              <SheetClose asChild>
                <Button
                  variant="outline">
                  Voltar
                </Button>
              </SheetClose>
              <Button type="submit">Salvar</Button>
            </SheetFooter>
          </form>
        </SheetContent>
      </Sheet>
      <Toaster />
    </div>
  );
};

export default CreateContact;
