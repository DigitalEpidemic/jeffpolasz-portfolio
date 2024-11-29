interface NavItemProps {
  label: string;
  href?: string;
  subLabel?: string;
  children?: Array<NavItemProps>;
}

export const NAV_ITEMS: Array<NavItemProps> = [
  {
    label: "Game Projects",
  },
  {
    label: "Web Projects",
  },
  {
    label: "Resume",
    href: "/resume",
  },
  {
    label: "Contact Me",
  },
];
