import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";

import conf from "../../config";

export default function NavBar() {
  const [scrolled, setScrolled] = useState<boolean>(false);
  const [mobiOpen, setMobiOpen] = useState<boolean>(false);

  const mobiWrap = useRef<HTMLDivElement | null>(null);

  function mobiClick() {
    if (mobiOpen) setMobiOpen(false);
  }

  useEffect(() => {
    function click(e: Event) {
      if (mobiWrap.current && !mobiWrap.current.contains(e.target as any)) {
        setMobiOpen(false);
      }
    }

    function scroll(e: Event) {
      window.scrollY > 10 ? setScrolled(true) : setScrolled(false);
    }

    window.addEventListener("click", click);
    window.addEventListener("scroll", scroll);

    return () => {
      window.removeEventListener("click", click);
      window.removeEventListener("scroll", scroll);
    };
  }, []);

  return (
    <nav className={scrolled ? "scrolled" : ""}>
      <div className="logo">
        <Link to="/"><img src="https://img.icons8.com/?size=160&id=57457&format=png&color=FFFFFF" alt="" width="30px"/></Link>
      </div>

      <div className="links">
        <Link to="/search" className="AppHeader-context-item">
          <svg
            aria-hidden="true"
            height="16"
            viewBox="0 0 16 16"
            version="1.1"
            width="16"
            data-view-component="true"
            className="octicon octicon-search">
            <path d="M10.68 11.74a6 6 0 0 1-7.922-8.982 6 6 0 0 1 8.982 7.922l3.04 3.04a.749.749 0 0 1-.326 1.275.749.749 0 0 1-.734-.215ZM11.5 7a4.499 4.499 0 1 0-8.997 0A4.499 4.499 0 0 0 11.5 7Z" fill="#fff"></path>
          </svg>
          <span>Search</span>
        </Link>
      </div>
    </nav>
  );
}
