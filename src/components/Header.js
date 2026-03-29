import { Link } from "react-router-dom";

function Header() {
  return (<header>
    <div className="flexbox_homepage_header">
        <img
          width="2%"
          height="2%"
          
          src="public\logo.jpeg"/>
        <b>Sweet Scoop Ice Cream</b>
        </div>
        <div className = "homepage_menu">
        <Link to="/">Homepage</Link>
        <Link to="/flavors">Flavors</Link>
        <Link to="/login">Login</Link>
    </div>
    </header>
    
      );
}

export default Header;