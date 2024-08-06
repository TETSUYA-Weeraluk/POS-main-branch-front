import MenuLanguageComponent from "./components/MenuLanguage.component";
import MenuThemeComponent from "./components/MenuTheme.component";

const HeaderDefault = () => {
  return (
    <div className="p-4 border-b w-full flex items-center justify-between">
      <span>Poring SHOP</span>
      <div className="flex items-center gap-4">
        <MenuThemeComponent />
        <MenuLanguageComponent />
      </div>
    </div>
  );
};

export default HeaderDefault;
