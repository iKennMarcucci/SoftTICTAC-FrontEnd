import { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

import LogoFull from "../../public/Logos/LogoFull.webp";
import { useAuth } from "../Contextos/AuthContext";

function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const showNavbar =
    location.pathname !== "/login" &&
    !location.pathname.startsWith("/controlpanel");

  const [cursorEnter, setcursorEnter] = useState(false);
  const [toggled, setToggled] = useState(false);
  const [menuClicked, setMenuClicked] = useState(false);
  const menuButtonRef = useRef(null);
  const menuRef = useRef(null);

  const { isAuthenticated, logout } = useAuth();

  const cerrarSesion = async () => {
    const res = await logout();
    if (res.status === 200) {
      navigate("/login");
    }
  };

  const handleToggle = () => {
    setToggled(!toggled);
  };

  const toggleCursorEnter = () => {
    setcursorEnter(true);
  };

  const toggleMenu = () => {
    setMenuClicked(!menuClicked);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target) &&
        menuButtonRef.current &&
        !menuButtonRef.current.contains(event.target)
      ) {
        setMenuClicked(false);
      }
    };

    // Agregar el event listener al documento
    document.addEventListener("mousedown", handleClickOutside);

    // Limpiar el event listener cuando el componente se desmonta
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuRef, menuButtonRef]);

  return (
    showNavbar && (
      <>
        <nav className="sticky top-0 z-40 flex h-24 w-full items-center justify-between space-x-10 bg-blue-100 px-10 max-sm:px-2">
          <div className="flex h-full items-center">
            <Link to={"/"} className="mr-10 max-lg:mr-0">
              <img src={LogoFull} alt="Logo" width={150} />
            </Link>
            <ul className="flex h-full space-x-4 max-lg:hidden">
              <li className="flex h-full items-center px-2">
                <Link
                  to={"/"}
                  className="flex h-full items-center font-medium hover:text-blue-500"
                >
                  Modelo TIC TAC
                </Link>
              </li>
              <li
                className="flex h-full items-center px-2"
                onMouseEnter={toggleCursorEnter}
                onMouseLeave={() => setcursorEnter(false)}
              >
                <div className="flex h-full cursor-pointer items-center font-medium">
                  Módulos <p className="pl-0.5">▾</p>
                </div>
              </li>
              <li className="flex h-full items-center px-2">
                <Link
                  to={"/"}
                  className="flex h-full items-center font-medium hover:text-blue-500"
                >
                  Estadísticas
                </Link>
              </li>
            </ul>
          </div>
          <div className="flex items-center space-x-2">
            {isAuthenticated ? (
              <div className="relative ml-3">
                <button
                  className="relative flex h-8 w-8 items-center justify-center gap-2.5 rounded-full bg-blue-700 p-1"
                  onClick={toggleMenu}
                  ref={menuButtonRef}
                  aria-expanded={menuClicked ? "true" : "false"}
                  aria-haspopup="true"
                  id="user-menu-button"
                >
                  <svg
                    viewBox="0 0 24 24"
                    strokeWidth={1}
                    className="h-5 w-5 fill-white stroke-white"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                    />
                  </svg>
                </button>
                {menuClicked && (
                  <div
                    className="absolute right-0 z-50 mt-2 origin-top-right whitespace-nowrap rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                    role="menu"
                    aria-orientation="vertical"
                    aria-labelledby="user-menu-button"
                    tabIndex="-1"
                    ref={menuRef}
                  >
                    {/* TODO:  */}
                    {/* <Link
                      to="/profile"
                      className="flex px-4 py-2 text-sm font-normal not-italic text-gray-700"
                      role="menuitem"
                      tabIndex="-1"
                      id="user-menu-item-0"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="h-5 w-5"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                        />
                      </svg>
                      <p className="ml-1.5">Mi Perfil</p>
                    </Link> */}
                    <Link
                      to="/controlpanel"
                      className="flex px-4 py-2 text-sm font-normal not-italic text-gray-700"
                      role="menuitem"
                      tabIndex="-1"
                      id="user-menu-item-0"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="1em"
                        height="1em"
                        viewBox="0 0 1024 1024"
                        className="h-5 w-5"
                      >
                        <path
                          fill="currentColor"
                          d="M600.704 64a32 32 0 0 1 30.464 22.208l35.2 109.376c14.784 7.232 28.928 15.36 42.432 24.512l112.384-24.192a32 32 0 0 1 34.432 15.36L944.32 364.8a32 32 0 0 1-4.032 37.504l-77.12 85.12a357.12 357.12 0 0 1 0 49.024l77.12 85.248a32 32 0 0 1 4.032 37.504l-88.704 153.6a32 32 0 0 1-34.432 15.296L708.8 803.904c-13.44 9.088-27.648 17.28-42.368 24.512l-35.264 109.376A32 32 0 0 1 600.704 960H423.296a32 32 0 0 1-30.464-22.208L357.696 828.48a351.616 351.616 0 0 1-42.56-24.64l-112.32 24.256a32 32 0 0 1-34.432-15.36L79.68 659.2a32 32 0 0 1 4.032-37.504l77.12-85.248a357.12 357.12 0 0 1 0-48.896l-77.12-85.248A32 32 0 0 1 79.68 364.8l88.704-153.6a32 32 0 0 1 34.432-15.296l112.32 24.256c13.568-9.152 27.776-17.408 42.56-24.64l35.2-109.312A32 32 0 0 1 423.232 64H600.64zm-23.424 64H446.72l-36.352 113.088l-24.512 11.968a294.113 294.113 0 0 0-34.816 20.096l-22.656 15.36l-116.224-25.088l-65.28 113.152l79.68 88.192l-1.92 27.136a293.12 293.12 0 0 0 0 40.192l1.92 27.136l-79.808 88.192l65.344 113.152l116.224-25.024l22.656 15.296a294.113 294.113 0 0 0 34.816 20.096l24.512 11.968L446.72 896h130.688l36.48-113.152l24.448-11.904a288.282 288.282 0 0 0 34.752-20.096l22.592-15.296l116.288 25.024l65.28-113.152l-79.744-88.192l1.92-27.136a293.12 293.12 0 0 0 0-40.256l-1.92-27.136l79.808-88.128l-65.344-113.152l-116.288 24.96l-22.592-15.232a287.616 287.616 0 0 0-34.752-20.096l-24.448-11.904L577.344 128zM512 320a192 192 0 1 1 0 384a192 192 0 0 1 0-384zm0 64a128 128 0 1 0 0 256a128 128 0 0 0 0-256z"
                        />
                      </svg>
                      <p className="ml-1.5">Panel de Control</p>
                    </Link>
                    <div
                      onClick={cerrarSesion}
                      className="flex cursor-pointer px-4 py-2 text-sm font-normal not-italic text-gray-700"
                      role="menuitem"
                      tabIndex="-1"
                      id="user-menu-item-2"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="h-5 w-5"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9"
                        />
                      </svg>
                      <p className="ml-1.5">Cerrar Sesión</p>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <Link
                to={"/login"}
                className="truncate rounded-md bg-blue-300 p-2 font-light hover:bg-blue-400"
              >
                Iniciar Sesión
              </Link>
            )}

            <label className="hamburger lg:hidden">
              <input type="checkbox" onClick={() => handleToggle()} />
              <svg viewBox="0 0 32 32">
                <path
                  className="line line-top-bottom"
                  d="M27 10 13 10C10.8 10 9 8.2 9 6 9 3.5 10.8 2 13 2 15.2 2 17 3.8 17 6L17 26C17 28.2 18.8 30 21 30 23.2 30 25 28.2 25 26 25 23.8 23.2 22 21 22L7 22"
                ></path>
                <path className="line" d="M7 16 27 16"></path>
              </svg>
            </label>
          </div>
        </nav>
        {cursorEnter && (
          <>
            <nav
              className="fixed top-24 z-30 flex w-full justify-center border-t-2 border-blue-200 bg-blue-100 px-10 py-5 max-lg:hidden"
              onMouseEnter={toggleCursorEnter}
              onMouseLeave={() => setcursorEnter(false)}
            >
              <ul className="flex">
                <li className="px-4">
                  <Link
                    to="/modulo/herramientas-pedagogicas"
                    className="hover:text-blue-500"
                  >
                    Herramientas Pedagógicas
                  </Link>
                </li>
                <li className="px-4">
                  <Link
                    to="/modulo/contenidos-digitales"
                    className="hover:text-blue-500"
                  >
                    Contenidos Digitales
                  </Link>
                </li>
                <li className="px-4">
                  <Link to="/modulo/planes-trabajo"
                   className="hover:text-blue-500">
                    Planes de Trabajo
                  </Link>
                </li>
                <li className="px-4">
                  <Link to="/" className="hover:text-blue-500">
                    Proyectos de Aula
                  </Link>
                </li>
              </ul>
            </nav>
          </>
        )}
        {toggled && (
          <>
            <nav className="fixed top-24 z-40 flex w-full justify-center border-t-2 border-blue-200 bg-blue-100 px-10 py-5 text-center lg:hidden">
              <ul className="flex flex-col space-y-2">
                <li className="px-4">
                  <Link to="/" className="hover:text-blue-500">
                    Modelo TIC TAC
                  </Link>
                </li>
                <li className="px-4">
                  <Link
                    to="/modulo/herramientas-pedagogicas"
                    className="hover:text-blue-500"
                  >
                    Herramientas Pedagógicas
                  </Link>
                </li>
                <li className="px-4">
                  <Link
                    to="/modulo/contenidos-digitales"
                    className="hover:text-blue-500"
                  >
                    Contenidos Digitales
                  </Link>
                </li>
                <li className="px-4">
                  <Link to="/" className="hover:text-blue-500">
                    Planes de Trabajo
                  </Link>
                </li>
                <li className="px-4">
                  <Link to="/" className="hover:text-blue-500">
                    Proyectos de Aula
                  </Link>
                </li>
                <li className="px-4">
                  <Link to="/" className="hover:text-blue-500">
                    Estadísticas
                  </Link>
                </li>
              </ul>
            </nav>
          </>
        )}
      </>
    )
  );
}

export default Navbar;
