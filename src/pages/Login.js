import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { setEmailValue } from '../actions';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.submitLogin = this.submitLogin.bind(this);
    this.disableButton = this.disableButton.bind(this);
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState({ [name]: value },
      this.disableButton);
  }

  submitLogin() {
    const { history, userDispatch } = this.props;
    const { email } = this.state;

    userDispatch(email);

    history.push('/carteira');
  }

  disableButton() {
    const LIMIT_PASSWORD = 6;
    const { email, password } = this.state;
    if (email.includes('@') && password.length >= LIMIT_PASSWORD
    && email.includes('.com')) {
      return false;
    }
    return true;
  }

  render() {
    const { email, password } = this.state;
    return (
      <div>
        <form>
          <input
            type="email"
            name="email"
            value={ email }
            onChange={ this.handleChange }
            data-testid="email-input"
          />
          <input
            type="password"
            name="password"
            value={ password }
            onChange={ this.handleChange }
            data-testid="password-input"
          />
          <button
            type="button"
            onClick={ this.submitLogin }
            disabled={ this.disableButton() }
          >
            Entrar

          </button>
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  userDispatch: (state) => dispatch(setEmailValue(state)),
});

Login.propTypes = {
  userDispatch: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default connect(null, mapDispatchToProps)(Login);
