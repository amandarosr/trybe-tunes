import { Component } from "react";
import { Link } from "react-router-dom";
import { getUser } from "../services/userAPI";
import Loading from "./Loading";
import vinyl from "../extra/vinyl-record.png";
import "../style/Header.css";

class Header extends Component {
  state = {
    loading: false,
    userName: "",
  };

  async componentDidMount() {
    this.setState({
      loading: true,
    });
    const user = await getUser();
    this.setState(
      {
        userName: user.name,
      },
      () =>
        this.setState({
          loading: false,
        })
    );
  }

  render() {
    const { loading, userName } = this.state;
    return (
      <header data-testid="header-component">
        {loading ? (
          <Loading />
        ) : (
          <div className="username-title">
            <img alt="logo" src={vinyl} className="header-logo" />
            <h3 className="header-username">{userName + "'s tunes"}</h3>
          </div>
        )}
        <nav>
          <Link to="/search" className="link link-to-search">
            Pesquisar
          </Link>
          <Link to="/favorites" className=" link link-to-favorites">
            Favoritos
          </Link>
          <Link to="/profile" className="link link-to-profile">
            Perfil
          </Link>
        </nav>
      </header>
    );
  }
}

export default Header;
