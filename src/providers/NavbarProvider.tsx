import React, {
  useContext,
  createContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useDisclosure, UseDisclosureProps } from "@chakra-ui/hooks";
import { Events } from "react-scroll";

const initialState = {
  isOpen: false,
  onToggle: () => {
    /**/
  },
  onClose: () => {
    /**/
  },
  isAnimating: false,
};

const NavbarContext = createContext<NavbarState>({
  ...initialState,
});

interface NavbarState extends UseDisclosureProps {
  onToggle: () => void;
  onClose: () => void;
  isOpen: boolean;
  isAnimating: boolean;
}

export const NavbarProvider: React.FC = ({ children }) => {
  const [state, setState] = useState<NavbarState>(initialState);
  const disclosureState = useDisclosure();

  useEffect(() => {
    Events.scrollEvent.register("begin", () => {
      setState({ ...state, isAnimating: true });
    });
    Events.scrollEvent.register("end", () => {
      setState({ ...state, isAnimating: false });
    });

    return () => {
      Events.scrollEvent.remove("begin");
      Events.scrollEvent.remove("end");
    };
  }, []);

  const value = useMemo(
    () => ({ ...state, ...disclosureState }),
    [state, disclosureState]
  );

  return (
    <NavbarContext.Provider value={value}>{children}</NavbarContext.Provider>
  );
};

export const useNavbar = () => {
  return useContext(NavbarContext);
};
