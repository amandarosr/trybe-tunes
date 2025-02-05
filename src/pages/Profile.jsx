import { Component } from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Header from '../components/Header';
import Loading from '../components/Loading';
import '../style/Profile.css';

class Profile extends Component {
  state = {
    loading: false,
    user: '',
  };

  async componentDidMount() {
    this.setState({
      loading: true,
    });
    const user = await getUser();
    this.setState({
      user,
    }, () => this.setState({
      loading: false,
    }));
  }

  render() {
    const { user, loading } = this.state;
    return (
      <div data-testid="page-profile">
        <Header />
        <Link to="/profile/edit">Editar perfil</Link>
        { loading && !user.length ? <Loading /> : (
          <div>
            <img src={ user.image } alt={ user.name } data-testid="profile-image" />
            <h2>{ user.name }</h2>
            <p>{ user.email }</p>
            <p>{ user.description }</p>
          </div>
        ) }
      </div>
    );
  }
}

export default Profile;
