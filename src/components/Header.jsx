import { Component } from "react";
import { Link } from "react-router-dom";
import { withRouter } from "react-router-dom/cjs/react-router-dom.min";
import PropTypes from "prop-types";
import music from "../extra/wave-sound.png";
import "../style/Header.css";

class Header extends Component {
  render() {
    const { path } = this.props.match;
    return (
      <header data-testid="header-component">
        <div className="username-title">
          <img alt="logo" src={music} className="header-logo" />
          <h3 className="header-username">noTunes</h3>
        </div>
        <nav>
          <Link
            to="/search"
            className={path === "/search" ? "link current-page" : "link link-search"}
          >
            Pesquisar
          </Link>
          <Link
            to="/favorites"
            className={path === "/favorites" ? "link current-page" : "link link-fav"}
          >
            Favoritos
          </Link>
          <Link 
          to="/profile" 
          className={path === "/profile" ? "link current-page" : "link link-fav"}
          >
          Perfil
        </Link>
        </nav>
      </header>
    );
  }
}

Header.propTypes = {
  match: PropTypes.shape({
    path: PropTypes.string,
  }),
};

export default withRouter(Header);
