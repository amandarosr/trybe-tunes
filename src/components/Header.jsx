import { Component } from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from './Loading';

class Header extends Component {
  state = {
    loading: false,
    userName: '',
  };

  async componentDidMount() {
    this.setState({
      loading: true,
    });
    const user = await getUser();
    this.setState({
      userName: user.name,
    }, () => this.setState({
      loading: false,
    }));
  }

  render() {
    const { loading, userName } = this.state;
    return (
      <header data-testid="header-component">
        { loading ? <Loading /> : <h3 data-testid="header-user-name">{ userName }</h3> }
        <Link to="/search" data-testid="link-to-search"> Pesquisar </Link>
        <Link to="/favorites" data-testid="link-to-favorites"> Favoritos </Link>
        <Link to="/profile" data-testid="link-to-profile"> Perfil </Link>
      </header>
    );
  }
}

export default Header;
