import Link from "next/link";

export function TopNav() {
  return (
    <header className="topnav">
      <div className="topnav__row">
        <Link href="/" className="brand">
          <span className="brand__mark">STREET</span>
          <span className="brand__sub">Retailer Guide</span>
        </Link>
        <a className="topnav__meta" href="https://retailer.street.london">
          Open Partner app
        </a>
      </div>
    </header>
  );
}
