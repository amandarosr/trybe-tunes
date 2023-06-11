import { Component } from 'react';
import PropTypes from 'prop-types';
import { getUser, updateUser } from '../services/userAPI';
import Header from '../components/Header';
import Loading from '../components/Loading';

class ProfileEdit extends Component {
  state = {
    loading: false,
    user: '',
    name: '',
    email: '',
    description: '',
    image: '',
    emailValid: false,
    formValid: false,
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
      name: user.name,
      email: user.email,
      image: user.image,
      description: user.description,
    }));
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    }, this.validateForm);
  };

  handleEmailChange = ({ target }) => {
    const { value } = target;
    if (value.length && target.validity.valid) {
      this.setState({
        emailValid: true,
      });
    }
    this.setState({
      email: value,
    }, this.validateForm);
  };

  validateForm = () => {
    const { email, name, description, image, emailValid } = this.state;
    const validCases = [email.length, name.length, description.length,
      image.length, emailValid];
    const checkCases = validCases.every((i) => i);
    this.setState({
      formValid: checkCases,
    });
  };

  onButtonClick = async () => {
    this.setState({
      loading: true,
    });
    const { name, email, image, description } = this.state;
    const { history } = this.props;
    const obj = {
      name,
      email,
      image,
      description,
    };
    await updateUser(obj);
    history.push('/profile');
  };

  render() {
    const { user, loading, name, email, description, image,
      formValid } = this.state;
    return (
      <div data-testid="page-profile-edit">
        <Header />
        { loading && !user.length ? <Loading /> : (
          <form onSubmit={ (e) => e.preventDefault() }>
            <input
              name="name"
              type="text"
              data-testid="edit-input-name"
              value={ name }
              onChange={ this.handleChange }
              placeholder="Insira seu nome"
              required
            />
            <input
              name="email"
              type="email"
              data-testid="edit-input-email"
              value={ email }
              onChange={ this.handleEmailChange }
              placeholder="Insira seu e-mail"
              required
            />
            <textarea
              name="description"
              type="text"
              data-testid="edit-input-description"
              value={ description }
              onChange={ this.handleChange }
              placeholder="Escreva uma breve descrição sobre você"
              required
            />
            <input
              name="image"
              type="text"
              data-testid="edit-input-image"
              value={ image }
              onChange={ this.handleChange }
              placeholder="Insira uma imagem"
              required
            />
            <button
              type="submit"
              data-testid="edit-button-save"
              disabled={ !formValid }
              onClick={ this.onButtonClick }
            >
              Editar perfil
            </button>
          </form>
        ) }
      </div>
    );
  }
}

ProfileEdit.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default ProfileEdit;
