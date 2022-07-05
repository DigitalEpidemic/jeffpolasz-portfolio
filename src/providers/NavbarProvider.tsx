import React, { useContext, createContext } from "react";
import { useDisclosure } from "@chakra-ui/hooks";

const NavbarContext = createContext<NavbarState>({
  isOpen: false,
  onToggle: () => {
    /**/
  },
  onClose: () => {
    /**/
  },
});

interface NavbarState {
  onToggle: () => void;
  onClose: () => void;
  isOpen: boolean;
}

export const NavbarProvider: React.FC = ({ children }) => {
  const navbarState = useDisclosure();
  return (
    <NavbarContext.Provider value={navbarState}>
      {children}
    </NavbarContext.Provider>
  );
};

export const useNavbar = () => {
  return useContext(NavbarContext);
};
