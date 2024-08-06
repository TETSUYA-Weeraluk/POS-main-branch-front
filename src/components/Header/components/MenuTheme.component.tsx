import { Button, Menu, MenuItem } from "@mui/material";
import { useState } from "react";
import { MdOutlineColorLens } from "react-icons/md";

const MenuThemeComponent = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const changeTheme = (newColor: string) => {
    document.documentElement.style.setProperty("--color-primary", newColor);
    document.documentElement.style.setProperty("--color-text-color", newColor);
    handleClose();
  };

  const listMenuTheme = [
    {
      id: 1,
      name: "Blue",
      color: "#279eff",
    },
    {
      id: 2,
      name: "Orange",
      color: "#E3651D",
    },
    {
      id: 3,
      name: "Red",
      color: "#750E21",
    },
    {
      id: 4,
      name: "Purple",
      color: "#430A5D",
    },
  ];

  return (
    <>
      <Button
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        className="flex gap-2"
        variant="text"
        sx={{
          color: "black",
          textTransform: "none",
        }}
      >
        <MdOutlineColorLens size={20} className="text-colorText" />
        <span className="text-colorText">Theme</span>
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        {listMenuTheme.map((item) => (
          <MenuItem
            key={item.id}
            className="gap-2"
            onClick={() => changeTheme(item.color)}
          >
            <div
              className="text-colorText"
              style={{
                width: "20px",
                height: "20px",
                backgroundColor: item.color,
                borderRadius: "25%",
              }}
            ></div>
            <span className="text-colorText">{item.name}</span>
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};

export default MenuThemeComponent;
