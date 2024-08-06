import { MenuItem, Select, SelectChangeEvent } from "@mui/material";
import { useState } from "react";
import { useTranslation } from "react-i18next";

const MenuLanguageComponent = () => {
  const [language, setLanguage] = useState("EN");

  const { i18n } = useTranslation();

  const handleChange = (event: SelectChangeEvent) => {
    setLanguage(event.target.value as string);
    i18n.changeLanguage(event.target.value as string);
  };

  return (
    <>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={language}
        onChange={handleChange}
      >
        <MenuItem value={"EN"}>EN</MenuItem>
        <MenuItem value={"TH"}>TH</MenuItem>
      </Select>
    </>
  );
};

export default MenuLanguageComponent;
