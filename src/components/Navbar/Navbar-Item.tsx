import { NavLink, Params } from "react-router-dom";
import { useTranslation } from "react-i18next";

interface NavbarItemProps {
  title: string;
  to: string;
  icon: React.ReactNode;
  params: Readonly<Params<string>>;
}

const NavbarItem = (props: NavbarItemProps) => {
  const { title, to, icon, params } = props;
  const { t } = useTranslation();

  const getNavLinkClass = (isActive: boolean) =>
    `flex items-center space-x-2 text-lg px-4 py-4 rounded-e-md min-w-[200px] hover:bg-primary hover:text-white mr-2 ${
      isActive ? "bg-primary text-colorTextSecondary" : ""
    }`;

  // const navigateTo = (to: string) => {
  //   if (params["idBranch"]) {
  //     return `branch/${params["idBranch"]}/${to}`;
  //   }
  // };

  return (
    <NavLink to={`/branch/${params['idBranch']}${to}`} className={({ isActive }) => getNavLinkClass(isActive)}>
      <div>{icon}</div>
      <span>{t(title)}</span>
    </NavLink>
  );
};

export default NavbarItem;
