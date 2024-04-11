/* eslint-disable no-unused-vars */
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
import { Button } from "../ui/button";
import { Label } from "@radix-ui/react-dropdown-menu";
import { Input } from "../ui/input";
import { useContext, useState } from "react";
import { Toaster } from "../ui/sonner";
import { toast } from "sonner";

import { FaRegTrashAlt } from "react-icons/fa";
import { ContactContext } from "@/contexts/ContactContext";

const EditContact = ({ contact }) => {
  const { contacts, setContacts } = useContext(ContactContext);
  const [id, setId] = useState(contact.id);
  const [nome, setNome] = useState(contact.nome);
  const [email, setEmail] = useState(contact.email);
  const [telefone, setTelefone] = useState(contact.telefone);
  const [cargo, setCargo] = useState(contact.cargo);
  const [github, setGithub] = useState(contact.github);

  const handleEditContact = async (event) => {
    event.preventDefault();

    if (!nome || !email || !telefone) {
      toast("Error", {
        description: "Preencha os campos obrigatórios",
        action: {
          label: "Fechar",
          onClick: () => console.log(),
        },
      });
      return;
    }
    
    const editedContact = {
      id,
      nome,
      email,
      telefone,
      cargo,
      github,
    };

    const updatedContacts = contacts.map((c) => (c.id === id ? editedContact : c));

    setContacts(updatedContacts);
      

      toast("Sucesso", {
        description: "Contato atualizado com sucesso",
        action: {
          label: "Fechar",
          onClick: () => console.log(),
        },
      });
  }

  const handleDelete = () => {
    const updatedContacts = contacts.filter((c) => c.id !== id);
    setContacts(updatedContacts);

    toast("Sucesso", {
      description: "Contato deletado com sucesso",
      action: {
        label: "Fechar",
        onClick: () => console.log(),
      },
    });
  };
  

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
                  variant="outline">
                  Voltar
                </Button>
              </SheetClose>
              <SheetClose asChild>
                <Button variant="destructive" onClick={handleDelete} className="flex gap-1">
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
