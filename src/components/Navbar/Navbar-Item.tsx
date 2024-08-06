import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";

interface NavbarItemProps {
  title: string;
  to: string;
  icon: React.ReactNode;
}

const NavbarItem = (props: NavbarItemProps) => {
  const { title, to, icon } = props;
  const { t } = useTranslation();

  const getNavLinkClass = (isActive: boolean) =>
    `flex items-center space-x-2 text-lg px-4 py-4 rounded-e-md min-w-[200px] hover:bg-primary hover:text-white mr-2 ${
      isActive ? "bg-primary text-colorTextSecondary" : ""
    }`;

  return (
    <NavLink to={to} className={({ isActive }) => getNavLinkClass(isActive)}>
      <div>{icon}</div>
      <span>{t(title)}</span>
    </NavLink>
  );
};

export default NavbarItem;
