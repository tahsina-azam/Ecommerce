import { useToggleCartModalOpen } from "@/hooks/useCartModal";
import { useCartSize } from "@/hooks/useCartStore";
import { useClearCurrentUser, useCurrentUser } from "@/hooks/useCurrentUser";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import CartModal from "../cart/CartModal";
import { UserAccountNav } from "../user-account-nav";

type HeaderType = {
  isErrorPage?: Boolean;
};

const arrayPaths = ["/"];
const Header = ({ isErrorPage }: HeaderType) => {
  const router = useRouter();
  const handleSignOut = useClearCurrentUser();

  const [onTop, setOnTop] = useState(
    !arrayPaths.includes(router.pathname) || isErrorPage ? false : true
  );
  const [menuOpen, setMenuOpen] = useState(false);
  const cartSize = useCartSize();

  const navRef = useRef(null);

  const toggleCartModal = useToggleCartModalOpen();
  const { name, email } = useCurrentUser();

  const headerClass = () => {
    if (window.pageYOffset === 0) {
      setOnTop(true);
    } else {
      setOnTop(false);
    }
  };

  useEffect(() => {
    if (!arrayPaths.includes(router.pathname) || isErrorPage) {
      return;
    }

    headerClass();
    window.onscroll = function () {
      headerClass();
    };
  }, []);

  return (
    <header className={`site-header ${!onTop ? "site-header--fixed" : ""}`}>
      <div className="container">
        <a
          href="#"
          className="flex items-center whitespace-nowrap text-2xl font-black"
        >
          <span className="mr-2 text-4xl text-gray-800">
            <Image
              src="/images/abstract-shape.png"
              width={24}
              height={24}
              alt="Picture of the author"
            />
          </span>
          Shoppers
        </a>
        <nav
          ref={navRef}
          className={`site-nav ${menuOpen ? "site-nav--open" : ""}`}
        >
          <button className="site-nav__btn">
            <p>Account</p>
          </button>
        </nav>

        <div className="site-header__actions">
          <div onClick={toggleCartModal}>
            <button className="btn-cart">
              <i className="icon-cart"></i>
              {cartSize > 0 && (
                <span className="btn-cart__count">{cartSize}</span>
              )}
            </button>
          </div>

          <UserAccountNav
            user={{
              name: name,
              image: "",
              email: email,
            }}
          />

          <button
            onClick={() => setMenuOpen(true)}
            className="site-header__btn-menu"
          >
            <i className="btn-hamburger">
              <span></span>
            </i>
          </button>
        </div>
      </div>
      <CartModal />
    </header>
  );
};

export default Header;
