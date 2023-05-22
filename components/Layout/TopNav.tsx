import { useToggleCartModalOpen } from "@/hooks/useCartModal";
import { useCartSize } from "@/hooks/useCartStore";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import CartModal from "../cart/CartModal";

type HeaderType = {
  isErrorPage?: Boolean;
};

const arrayPaths = ["/"];
const Header = ({ isErrorPage }: HeaderType) => {
  const router = useRouter();

  const [onTop, setOnTop] = useState(
    !arrayPaths.includes(router.pathname) || isErrorPage ? false : true
  );
  const [menuOpen, setMenuOpen] = useState(false);
  const cartSize = useCartSize();

  const navRef = useRef(null);

  const toggleCartModal = useToggleCartModalOpen();

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
        <Link href="/">
          <h1 className="site-logo">Logo E-Shop</h1>
        </Link>
        <nav
          ref={navRef}
          className={`site-nav ${menuOpen ? "site-nav--open" : ""}`}
        >
          <Link href="/products">Products</Link>
          <a href="#">Inspiration</a>
          <a href="#">Rooms</a>
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
          <Link href="/sign-in">
            <button className="site-header__btn-avatar">
              <i className="icon-avatar"></i>
            </button>
          </Link>
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
