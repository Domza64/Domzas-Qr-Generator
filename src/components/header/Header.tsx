function Header() {
  return (
    <header>
      <div className="header-container">
        <img
          className="title"
          src="/images/Qr-Gen-Logo.svg"
          alt="Domza's QR Generator logo"
        />
        <nav>
          <ul>
            <li>
              <a href="https://domza.xyz">My Website</a>
            </li>
            <li>
              <a href="https://github.com/Domza64/Domzas-Qr-Generator/">
                Project Source
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;
