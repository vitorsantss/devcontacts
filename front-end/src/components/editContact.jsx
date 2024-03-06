/* eslint-disable react/prop-types */
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
import { useState } from "react";
import { Toaster } from "./ui/sonner";
import { toast } from "sonner";
import { api } from "@/services/api";
import errorMessage from "@/services/error";
import { FaRegTrashAlt } from "react-icons/fa";

const EditContact = ({ contact }) => {
  const [nome, setNome] = useState(contact.name);
  const [email, setEmail] = useState(contact.email);
  const [telefone, setTelefone] = useState(contact.phone);
  const [cargo, setCargo] = useState(contact.position);
  const [github, setGithub] = useState(contact.github);

  const handleEditContact = async (event) => {
    event.preventDefault();

    const token = localStorage.getItem("@Auth:token");

    const data = {};
    if (nome) data.name = nome;
    if (email) data.email = email;
    if (telefone) data.phone = telefone;
    if (cargo) data.position = cargo;
    if (github) data.github = github;

    try {
      await api.put(`/contacts/${contact.id}`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      toast("Sucesso", {
        description: "Contato atualizado com sucesso",
        action: {
          label: "Fechar",
          onClick: () => console.log(),
        },
      });
      reload();
    } catch (error) {
      toast("Error", {
        description: errorMessage(error),
        action: {
          label: "Fechar",
          onClick: () => console.log(),
        },
      });
    }
  };

  const reload = () => {
    setTimeout(function() {
      window.location.reload();
  }, 1000);
  }

  const handleDelete = () => {
    const token = localStorage.getItem("@Auth:token");

    try {
      api.delete(`/contacts/${contact.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      toast("Sucesso", {
        description: "Contato deletado com sucesso",
        action: {
          label: "Fechar",
          onClick: () => console.log(),
        },
      });
      reload();
    } catch (error) {
      toast("Error", {
        description: errorMessage(error),
        action: {
          label: "Fechar",
          onClick: () => console.log(),
        },
      });
    }
  }

  return (
    <div>
      <Sheet>
        <SheetTrigger asChild>
          <Button className="" variant="outline">
            Editar
          </Button>
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Editar contato</SheetTitle>
            <SheetDescription>
              Edite um contato preenchendo os campos abaixo
            </SheetDescription>
          </SheetHeader>
          <form onSubmit={handleEditContact}>
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
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="telefone" className="text-right">
                  Telefone *
                </Label>
                <Input
                  required
                  id="telefone"
                  name="telefone"
                  value={telefone}
                  className="col-span-3"
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
                  onChange={(e) => setGithub(e.target.value)}
                />
              </div>
            </div>
            <SheetFooter>
              <SheetClose asChild>
                <Button
                  onClick={() => window.location.reload()}
                  variant="outline">
                  Voltar
                </Button>
              </SheetClose>
              <SheetClose asChild>
                <Button onClick={handleDelete} variant="destructive" className="flex gap-1">
                  <FaRegTrashAlt />
                  Excluir
                </Button>
              </SheetClose>
              <SheetClose asChild>
              <Button type="submit">Salvar</Button>
              </SheetClose>
            </SheetFooter>
          </form>
        </SheetContent>
      </Sheet>
      <Toaster />
    </div>
  );
};

export default EditContact;
