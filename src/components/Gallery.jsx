/* eslint-disable react/prop-types */
import { ContactContext } from "@/contexts/ContactContext";
import CardContact from "./Contact/CardContact";
import ilustracao from "/ilustracao.png";
import { useContext } from "react";


const Gallery = () => {
    const { contacts } = useContext(ContactContext);

    return (
      <div className="flex flex-grow justify-center items-center text-3xl font-bold flex-col gap-3">

        
        <div className="flex justify-center flex-row flex-wrap gap-8">
          {contacts.length !== 0 ? (
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
    );
}
 
export default Gallery;