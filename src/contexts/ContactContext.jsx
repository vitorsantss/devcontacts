/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { createContext, useState } from "react";

export const ContactContext = createContext();

ContactContext.displayName = "ContactContext";

export const ContactProvider = ({ children }) => {
  const [contacts, setContacts] = useState([]);

  return (
    <ContactContext.Provider
      value={{
        contacts,
        setContacts,
      }}>
      {children}
    </ContactContext.Provider>
  );
};
