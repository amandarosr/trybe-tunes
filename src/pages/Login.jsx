import { Component } from "react";
import PropTypes from "prop-types";
import { Redirect } from "react-router-dom";
import { createUser } from "../services/userAPI";
import Loading from "../components/Loading";
import "../style/Login.css";

class Login extends Component {
  state = {
    nameInput: "",
    emailInput: "",
    loading: false,
    redirect: false,
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  };

  onSaveInput = async (input1, input2) => {
    this.setState({
      loading: true,
    });
    await createUser({ name: input1, email: input2 });
    this.setState(
      {
        loading: false,
      },
      () =>
        this.setState({
          redirect: true,
        })
    );
  };

  render() {
    const { nameInput, emailInput, loading, redirect } = this.state;
    const num = 3;
    return (
      <div className="page-login">
        <h1>noTunes</h1>
        <form onSubmit={(e) => e.preventDefault()}>
          <input
            name="nameInput"
            value={nameInput}
            placeholder="Insira o seu nome"
            type="text"
            className="login-name-input"
            onChange={this.handleChange}
          />
          <input
            name="emailInput"
            value={emailInput}
            placeholder="Insira o seu email"
            type="text"
            className="login-email-input"
            onChange={this.handleChange}
          />
          <button
            type="submit"
            data-testid="login-submit-button"
            disabled={emailInput.length < num}
            onClick={() => this.onSaveInput(nameInput, emailInput)}
          >
            Entrar
          </button>
          {loading ? <Loading /> : <span />}
        </form>
        {redirect ? <Redirect to="/search" /> : null}
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
