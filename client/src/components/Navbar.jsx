import "../styles/Navbar.css";

function Navbar() {
  return (
    <nav className="navbar">
      <h2>Mini CRM</h2>

      <ul>
        <li>Dashboard</li>
        <li>Leads</li>
        <li>Contact</li>
      </ul>
    </nav>
  );
}

export default Navbar;