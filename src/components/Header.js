
function Header() {
  return (<header>
    <div class="flexbox_homepage_header">
        <img
          width="2%"
          height="2%"
          src="/images/logo.jpeg"/>
        <b>Sweet Scoop Ice Cream</b>
        </div>
        <div class = "homepage_menu">
        <Link to="/">Homepage</Link>
        <Link to="/flavors">Flavors</Link>
        <Link to="/login">Login</Link>
    </div>
    </header>
    
      );
}

export default Header;