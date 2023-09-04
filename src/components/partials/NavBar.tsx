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
        <Link to="/">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            version="1.0"
            viewBox="0 130 500 200"
            preserveAspectRatio="xMidYMid meet"
          >
            <g
              transform="translate(0.000000,500.000000) scale(0.100000,-0.100000)"
              fill="#FFFFFF"
              stroke="none"
            >
              <path d="M1793 3509 c-155 -81 -362 -248 -594 -479 -131 -131 -312 -334 -370 -417 -11 -17 -42 -28 -134 -48 -156 -35 -331 -86 -469 -137 -181 -67 -196 -74 -196 -101 0 -27 39 -67 66 -69 11 -1 73 19 139 44 191 73 453 153 464 143 2 -3 -23 -46 -56 -97 -147 -228 -298 -516 -288 -548 8 -24 52 -60 74 -60 11 0 29 25 50 68 88 182 225 411 351 589 63 89 67 93 115 103 90 19 268 40 397 46 l128 7 -41 -114 c-48 -135 -79 -258 -79 -314 0 -22 9 -58 19 -80 29 -65 121 -100 121 -47 0 10 -9 27 -20 37 -11 10 -20 30 -20 44 0 39 65 258 112 378 l42 105 95 -7 c102 -7 178 -19 188 -28 3 -4 -1 -24 -10 -45 -9 -21 -23 -74 -32 -117 -15 -76 -15 -80 3 -104 10 -15 30 -30 44 -35 23 -8 35 -1 110 66 81 72 183 146 282 203 43 25 48 26 42 9 -13 -45 -36 -151 -36 -172 0 -29 42 -72 70 -72 12 0 59 26 103 58 112 80 105 78 103 31 -1 -35 5 -46 36 -75 44 -40 81 -44 147 -14 l43 20 19 -24 c11 -14 28 -28 39 -31 29 -9 103 33 225 129 61 47 112 86 115 86 3 0 4 -21 2 -47 -4 -59 21 -108 69 -141 42 -29 113 -27 179 6 l43 21 27 -30 c46 -48 69 -40 110 38 41 77 150 198 218 242 54 34 68 37 96 16 18 -13 17 -18 -25 -126 -24 -62 -42 -121 -42 -132 3 -28 42 -67 68 -67 17 0 32 16 61 67 48 83 179 222 239 254 44 23 45 23 76 5 27 -16 33 -17 46 -3 13 13 13 18 -1 45 -38 73 -123 93 -207 49 l-44 -24 -27 29 c-36 39 -64 37 -85 -7 l-16 -34 -34 29 c-44 39 -108 41 -170 6 l-43 -25 -30 30 c-52 52 -68 40 -116 -86 -46 -121 -47 -122 -169 -180 -102 -49 -115 -51 -115 -23 0 13 9 52 20 86 28 90 26 115 -12 147 -25 21 -38 25 -63 21 -23 -5 -36 -2 -45 9 -23 28 -68 45 -118 45 -84 0 -152 -59 -247 -211 -14 -23 -39 -41 -85 -60 l-65 -27 -8 39 c-10 48 -57 96 -101 105 -30 5 -78 -10 -137 -43 -3 -2 -1 18 4 45 17 82 -26 142 -103 142 -36 0 -159 -64 -263 -136 l-78 -55 16 36 c13 32 13 40 0 65 -8 15 -22 31 -32 35 -36 14 -176 45 -231 51 -98 9 -103 11 -93 37 5 12 74 159 154 327 151 317 174 384 158 453 -11 47 -47 87 -77 87 -13 0 -58 -18 -101 -41z m-48 -351 c-59 -128 -135 -292 -168 -364 l-60 -131 -136 -7 c-139 -7 -308 -22 -348 -31 -13 -3 -23 -1 -23 4 0 5 49 65 110 134 174 199 452 451 629 572 52 36 97 63 99 60 3 -2 -44 -109 -103 -237z m1395 -598 c0 -5 -5 -10 -11 -10 -5 0 -7 5 -4 10 3 6 8 10 11 10 2 0 4 -4 4 -10z"></path>
              <path d="M4707 2918 c-20 -46 -39 -95 -42 -111 -4 -15 -11 -30 -17 -33 -5 -3 -54 2 -109 12 -54 9 -102 14 -105 11 -11 -10 18 -68 40 -82 12 -7 49 -19 84 -26 36 -8 61 -18 58 -24 -2 -6 -11 -46 -21 -89 -17 -76 -17 -79 2 -104 11 -15 33 -31 48 -37 33 -12 29 -20 65 120 l25 100 105 6 c58 4 111 7 118 8 22 2 13 48 -15 76 -27 26 -31 27 -95 21 -46 -4 -68 -3 -68 5 0 6 14 44 31 84 33 80 31 98 -13 129 -42 29 -54 21 -91 -66z"></path>
            </g>
          </svg>
        </Link>
      </div>

      <div className="links">
        <Link to="/movies" className="AppHeader-context-item">
          <img
            src="https://img.icons8.com/?size=100&id=1427&format=png&color=FFFFFF"
            width="16px"
            alt=""
          />
          <span>Movies</span>
        </Link>
        <Link to="/tv-shows" className="AppHeader-context-item">
          <img
            src="https://img.icons8.com/?size=100&id=2987&format=png&color=FFFFFF"
            width="16px"
            alt=""
          />
          <span>TV Shows</span>
        </Link>
        <Link to="/search" className="AppHeader-context-item">
          <svg
            aria-hidden="true"
            height="16"
            viewBox="0 0 16 16"
            version="1.1"
            width="16"
            data-view-component="true"
            className="octicon octicon-search"
          >
            <path
              d="M10.68 11.74a6 6 0 0 1-7.922-8.982 6 6 0 0 1 8.982 7.922l3.04 3.04a.749.749 0 0 1-.326 1.275.749.749 0 0 1-.734-.215ZM11.5 7a4.499 4.499 0 1 0-8.997 0A4.499 4.499 0 0 0 11.5 7Z"
              fill="#fff"
            ></path>
          </svg>
          <span>Search</span>
        </Link>
      </div>
    </nav>
  );
}
