/* eslint-disable react-hooks/exhaustive-deps */
import CardContact from "@/components/cardContact";
import Logo from "../assets/logo.svg?react";
import Nome from "../assets/nome.svg?react";
import LogoDark from "../assets/logoDark.svg?react";
import NomeDark from "../assets/nomeDark.svg?react";
import { ModeToggle } from "../components/modeToggle";
import { Input } from "@/components/ui/input";
import { CiSearch } from "react-icons/ci";
import { Button } from "@/components/ui/button";
import Logout from "@/components/ui/logout";
import { useEffect, useState } from "react";
import { api } from "@/services/api";
import ilustracao from "/ilustracao.png";
import CreateContact from "@/components/createContact";
import { AuthContext } from "@/context/auth";
import { useContext } from "react";
import { useTheme } from "@/components/theme-provider";

const Home = () => {
  const [user, setUser] = useState();
  const [contacts, setContacts] = useState([]);
  const { signOut } = useContext(AuthContext);
  const { theme } = useTheme();
  const [search, setSearch] = useState("");
  const [dataSearch, setDataSearch] = useState([]);

  const handleSearch = (e) => {
    e.preventDefault();

    const token = localStorage.getItem("@Auth:token");

    api
      .get(`/contact?search=${search}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setDataSearch(res.data.dados.contacts);
        console.log(dataSearch);
      })
      .catch((error) => {
        if (error.response.status === 401) {
          console.error(error.message);
          signOut();
        }
      });
  };

  useEffect(() => {
    const token = localStorage.getItem("@Auth:token");
    let userId = localStorage.getItem("@Auth:user");

    userId = JSON.parse(userId);

    api
      .get(`/users/${userId.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setUser(res.data.dados);
        setContacts(res.data.dados.contacts);
      })
      .catch((error) => {
        if (error.response.status === 401) {
          console.error(error.message);
          signOut();
        }
      });
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex items-center flex-row justify-between mt-4 mb-10">
        {theme === "dark" ? (
          <Button variant="link" onClick={() => window.location.reload()}>
          <div className="flex items-center">
            <Logo className="w-7 h-auto ml-3 mt-1" />
            <Nome className="w-[152px] h-12 mt-1" />
          </div>
          </Button>
        ) : (
          <Button variant="link" onClick={() => window.location.reload()}>
          <div className="flex items-center">
            <LogoDark className="w-7 h-auto ml-3 mt-1" />
            <NomeDark className="w-[152px] h-12 mt-1" />
          </div>
          </Button>
        )}

        <div className="flex flex-row gap-4">
          <form
            onSubmit={handleSearch}
            className="w-96 flex gap-2 items-center">
            <Input
              className="w-full h-8"
              placeholder="Pesquisar"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <Button type="submit" variant="outline" className="w-13 h-8">
              <CiSearch size={20} />
            </Button>
          </form>
          <CreateContact />
        </div>
        <div className="flex items-center mr-4 gap-3">
          <ModeToggle />
          <Logout username={user ? user.username : null} />
        </div>
      </div>
      <div className="flex flex-grow justify-center items-center text-3xl font-bold flex-col gap-3">
        <div className="flex justify-center flex-row flex-wrap gap-8">
          { dataSearch.length !== 0 ? (
            dataSearch.map((contato) => (
              <CardContact key={contato.id} contact={contato} />
            ))
          ) : contacts.length !== 0 ? (
            contacts.map((contato) => (
              <CardContact key={contato.id} contact={contato} />
            ))
          ) : (
            <div>
              <div
                className="bg-cover bg-center w-72 h-72 mb-2"
                style={{ backgroundImage: `url(${ilustracao})` }}
              />
              <p className="text-xl font-normal text-slate-500">
                Você não possui contatos cadastrados
              </p>
            </div>
          )}
        </div>
      </div>
      <div className="flex justify-center items-end mt-8">
        <p className="text-xl mb-6 font-thin italic text-slate-600">
          2024 &copy; Vitor Santos
        </p>
      </div>
    </div>
  );
};

export default Home;
