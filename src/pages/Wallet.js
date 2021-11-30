/* eslint-disable no-labels */
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { setCurrencies, setExpencies } from '../actions';
import Table from '../components/Table';

class Wallet extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
    };
    this.handleChange = this.handleChange.bind(this);
    this.addCurrencies = this.addCurrencies.bind(this);
    this.valueAndDescrip = this.valueAndDescrip.bind(this);
    this.currenciesOptions = this.currenciesOptions.bind(this);
    this.submitButton = this.submitButton.bind(this);
    this.fetchApi = this.fetchApi.bind(this);
  }

  componentDidMount() {
    this.addCurrencies();
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState({ [name]: value },
      this.disableButton);
  }

  async fetchApi() {
    const response = await fetch('https://economia.awesomeapi.com.br/json/all');
    return response.json();
  }

  // ajuda com o repositório do Leandro Oliveira https://github.com/tryber/sd-015-b-project-trybewallet/pull/35

  async addCurrencies() {
    const { dispatchCurr } = this.props;
    const allCurrencies = await this.fetchApi();
    const currenciesArr = Object.keys(allCurrencies);
    const curr = currenciesArr.filter((currency) => {
      if (currency !== 'USDT') {
        return currency;
      }
      return false;
    });
    dispatchCurr(curr);
  }

  async submitButton() {
    const { dispatchExpenses, expenses } = this.props;
    const { value, description, method, tag, currency } = this.state;
    const id = expenses.length;
    const exchangeRates = await this.fetchApi();
    const wallet = { value, description, method, tag, currency, id, exchangeRates };
    dispatchExpenses(wallet);
    this.setState({ value: '', description: '' });
  }

  valueAndDescrip() {
    const { value, description } = this.state;
    return (
      <>
        <input
          type="number"
          value={ value }
          name="value"
          data-testid="value-input"
          onChange={ this.handleChange }
        />
        <input
          name="description"
          value={ description }
          type="text"
          data-testid="description-input"
          onChange={ this.handleChange }
        />
      </>);
  }

  currenciesOptions() {
    const { currency } = this.state;
    const { currencies } = this.props;
    return (
      <label htmlFor="currency-input">
        Moeda:
        <select
          id="currency-input"
          onChange={ this.handleChange }
          value={ currency }
          name="currency"
          data-testid="currency-input"
        >
          {currencies.map((curr) => (
            <option
              data-testid={ curr }
              key={ curr }
              value={ curr }
            >
              {curr}
            </option>))}
        </select>
      </label>
    );
  }

  tagAndMethod() {
    const tagArr = ['Alimentação', 'Lazer', 'Trabalho', 'Transporte', 'Saúde'];
    const { method, tag } = this.state;
    return (
      <>
        <select
          value={ method }
          onChange={ this.handleChange }
          name="method"
          data-testid="method-input"
        >
          <option value="Dinheiro">Dinheiro</option>
          <option value="Cartão de crédito">Cartão de crédito</option>
          <option value="Cartão de débito">Cartão de débito</option>
        </select>
        <select
          value={ tag }
          onChange={ this.handleChange }
          name="tag"
          data-testid="tag-input"
        >
          {tagArr.map((t) => <option value={ t } key={ t }>{t}</option>)}
        </select>
      </>);
  }

  render() {
    const { email, expenses } = this.props;
    let total = 0;

    expenses.forEach((expense) => {
      total += expense.value * expense.exchangeRates[expense.currency].ask;
    });
    return (
      <div>
        <header>
          <p data-testid="email-field">{ email }</p>
          <p data-testid="total-field">{ total }</p>
          <p data-testid="header-currency-field">BRL</p>
        </header>
        <form>
          {this.valueAndDescrip()}
          {this.currenciesOptions()}
          {this.tagAndMethod()}
        </form>
        <button onClick={ this.submitButton } type="button">
          Adicionar despesa
        </button>
        <Table />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
  currencies: state.wallet.currencies,
  expenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  dispatchExpenses: (state) => dispatch(setExpencies(state)),
  dispatchCurr: (values) => dispatch(setCurrencies(values)),
});

Wallet.propTypes = {
  email: PropTypes.string.isRequired,
  dispatchExpenses: PropTypes.func.isRequired,
  dispatchCurr: PropTypes.func.isRequired,
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
  expenses: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
