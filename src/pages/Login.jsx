import { Component } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { createUser } from '../services/userAPI';
import Loading from '../components/Loading';

class Login extends Component {
  state = {
    nameInput: '',
    loading: false,
    redirect: false,
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  };

  onSaveInput = async (input) => {
    this.setState({
      loading: true,
    });
    await createUser({ name: input });
    this.setState({
      loading: false,
    }, () => this.setState({
      redirect: true,
    }));
  };

  render() {
    const { nameInput, loading, redirect } = this.state;
    const num = 3;
    return (
      <div data-testid="page-login">
        <form onSubmit={ (e) => e.preventDefault() }>
          <input
            name="nameInput"
            value={ nameInput }
            type="text"
            data-testid="login-name-input"
            onChange={ this.handleChange }
          />
          <button
            type="submit"
            data-testid="login-submit-button"
            disabled={ nameInput.length < num }
            onClick={ () => this.onSaveInput('Name') }
          >
            Entrar
          </button>
          { loading ? <Loading /> : <span />}
        </form>
        { redirect ? <Redirect to="/search" /> : null }
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default Login;
