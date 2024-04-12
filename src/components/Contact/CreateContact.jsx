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
import { IoIosAddCircleOutline } from "react-icons/io";
import { useContext, useState } from "react";
import { Toaster } from "../ui/sonner";
import { toast } from "sonner";
import { ContactContext } from "@/contexts/ContactContext";


const CreateContact = () => {
  const { contacts, setContacts } = useContext(ContactContext);

  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [telefone, setTelefone] = useState("");
  const [cargo, setCargo] = useState("");
  const [github, setGithub] = useState("");

  const handleCreateContact = async (event) => {
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

    const contactExists = contacts.find((contact) => contact.email === email) || contacts.find((contact) => contact.telefone === telefone);

    if (contactExists) {
      toast("Error", {
        description: "Contato já cadastrado",
        action: {
          label: "Fechar",
          onClick: () => console.log(),
        },
      });
      return;
    }

    const newContact = {
      id: contacts.length + 1,
      nome,
      email,
      telefone,
      cargo,
      github,

    };

    setContacts([...contacts, newContact]);

      setNome("");
      setEmail("");
      setTelefone("");
      setCargo("");
      setGithub("");
  };

  return (
    <div>
      <Sheet>
        <SheetTrigger asChild>
          <Button className="flex items-center gap-1 w-36 p-5">
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
            <SheetFooter className="flex gap-2 flex-wrap">
              <SheetClose asChild>
                <Button
                  variant="outline">
                  Voltar
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

export default CreateContact;
