import React, { useState } from "react";
import "./Header.css";
import { BiMenuAltRight } from "react-icons/bi";
import { getMenuStyles } from "../../utils/common";
import useHeaderColor from "../../hooks/useHeaderColor";
import OutsideClickHandler from "react-outside-click-handler";
import { Link, NavLink, useNavigate } from "react-router-dom";
import AddPropertyModal from "../AddPropertyModal/AddPropertyModal";

const Header = () => {
  const [menuOpened, setMenuOpened] = useState(false);
  const headerColor = useHeaderColor();
  const [modalOpened, setModalOpened] = useState(false);
  const navigate = useNavigate();

  // ✅ STEP-5 LOGIN REQUIRED FIX
  const handleAddPropertyClick = () => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");

    if (!isLoggedIn) {
      navigate("/login");
      return;
    }

    setModalOpened(true);
  };

  // ✅ OPTIONAL LOGOUT (STEP-6)
  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    navigate("/login");
  };

  const isLoggedIn = localStorage.getItem("isLoggedIn");

  return (
    <section className="h-wrapper" style={{ background: headerColor }}>
      <div className="flexCenter innerWidth paddings h-container">
        {/* logo */}
        <Link to="/">
          <img src="./logo.png" alt="logo" width={100} />
        </Link>

        {/* menu */}
        <OutsideClickHandler
          onOutsideClick={() => {
            setMenuOpened(false);
          }}
        >
          <div
            className="flexCenter h-menu"
            style={getMenuStyles(menuOpened)}
          >
            <NavLink to="/properties">Properties</NavLink>

            <a href="mailto:kumarpraduman904@gmail.com">Contact</a>

            {/* ✅ ADD PROPERTY */}
            <div onClick={handleAddPropertyClick} style={{ cursor: "pointer" }}>
              Add Property
            </div>

            <AddPropertyModal
              opened={modalOpened}
              setOpened={setModalOpened}
            />

            {/* ✅ LOGIN / LOGOUT */}
            {!isLoggedIn ? (
              <button
                className="button"
                onClick={() => navigate("/login")}
              >
                Login
              </button>
            ) : (
              <button className="button" onClick={handleLogout}>
                Logout
              </button>
            )}
          </div>
        </OutsideClickHandler>

        {/* mobile menu icon */}
        <div
          className="menu-icon"
          onClick={() => setMenuOpened((prev) => !prev)}
        >
          <BiMenuAltRight size={30} />
        </div>
      </div>
    </section>
  );
};

export default Header;
