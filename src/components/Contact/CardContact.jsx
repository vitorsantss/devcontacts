/* eslint-disable react/prop-types */
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { IoLogoWhatsapp } from "react-icons/io5";
import { FaGithub } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { Link } from "react-router-dom";
import EditContact from "./EditContact";
import { Badge } from "../ui/badge";

const CardContact = ({ contact }) => {
  const extractName = (fullName) => {
    const parts = fullName.split(" ");
    if (parts.length <= 2) {
      return fullName;
    } else {
      return `${parts[0]} ${parts[parts.length - 1]}`;
    }
  };

  const generateInitials = (fullName) => {
    const [firstName, ...restOfName] = fullName.split(" ");
    const lastName = restOfName.pop() || firstName;
    return (firstName.charAt(0) + lastName.charAt(0)).toUpperCase();
  };

  const formatPhoneNumber = (phoneNumber) => {
    return phoneNumber.replace(/^(\d{2})(\d{5})(\d{4})$/, "($1) $2-$3");
  };

  return (
    <div>
      <Card className="w-[300px]">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex gap-3">
              <Avatar className="text-lg">
                <AvatarImage
                  src={
                    contact.github && contact.github !== " "
                      ? `https://github.com/${contact.github}.png`
                      : null
                  }
                />
                <AvatarFallback>
                  {contact.nome ? generateInitials(contact.nome) : ""}
                </AvatarFallback>
              </Avatar>
              <CardTitle className="flex items-center text-2xl">
                {contact.nome ? extractName(contact.nome) : ""}
              </CardTitle>
            </div>
          </div>
          <CardDescription>
            {contact.telefone ? formatPhoneNumber(contact.telefone) : ""}
          </CardDescription>
          <div>
            {contact.cargo ? (
              <Badge className="font-bold">{contact.cargo}</Badge>
            ) : (
              ""
            )}
          </div>
        </CardHeader>
        <CardContent className="flex flex-row items-center justify-between">
          <div className="flex flex-row gap-2">
            <Link
              target="_blank"
              reloadDocument
              to={`https:\\wa.me/55${contact.telefone}`}>
              <IoLogoWhatsapp size={25} />
            </Link>

            {contact.github && contact.github !== " " ? (
              <Link
                target="_blank"
                reloadDocument
                to={`https:\\github.com/${contact.github}`}>
                <FaGithub size={25} />
              </Link>
            ) : (
              ""
            )}

            <Link target="_blank" reloadDocument to={`mailto:${contact.email}`}>
              <MdEmail size={25} />
            </Link>
          </div>
          <EditContact contact={contact} />
        </CardContent>
      </Card>
    </div>
  );
};

export default CardContact;
