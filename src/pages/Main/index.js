import React, { Component } from 'react';
import _ from 'lodash';

import { Container, FloatButton } from './styles';

import api from '../../services/api';
import CompareList from '../../components/CompareList';
import logo from '../../assets/logo-24.png';
import handleNotification from '../../utils/handleNotification';
import CryptocurrencyForm from './CryptocurrencyForm';

export default class Main extends Component {
  state = {
    loading: false,
    cryptocurrencyError: false,
    cryptocurrencyInput: '',
    cryptocurrencies: [],
    targetCryptocurrencies: [],
    isFormOpen: false,
  }

  async componentDidMount() {
    this.update = setInterval(this.updateTargetCryptocurrencies, 30000);

    try {
      const { data } = await api.get('/url/?url=https://sandbox-api.coinmarketcap.com/v1/cryptocurrency/map');

      this.setState({
        cryptocurrencies: [...this.state.cryptocurrencies, ...data.data],
      });
    } catch (err) {
      this.setState({ cryptocurrencyError: true });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.targetCryptocurrencies !== prevState.targetCryptocurrencies) {
      const cryptocurrenciesUpdated = _.differenceBy(
        this.state.targetCryptocurrencies,
        prevState.targetCryptocurrencies,
        'quote.USD.price',
      );

      const toNotify = cryptocurrenciesUpdated.filter(cryptocurrency =>
        cryptocurrency.quote.USD.percent_change_24h <= -10
        || cryptocurrency.quote.USD.percent_change_24h >= 0.2);

      const notifications = toNotify.map(cryptocurrency =>
        ({
          title: cryptocurrency.name,
          options: {
            lang: 'en-US',
            icon: logo,
            badge: logo,
            body: cryptocurrency.quote.USD.percent_change_24h < 0
              ? `This cryptocurrency fell ${Math.abs(cryptocurrency.quote.USD.percent_change_24h)}% in 24h`
              : `This cryptocurrency rose ${Math.abs(cryptocurrency.quote.USD.percent_change_24h)}% in 24h`,
          },
        }));

      _.forEach(notifications, (notification) => {
        handleNotification(notification);
      });
    }
  }

  componentWillUnmount() {
    clearInterval(this.update);
  }

  getCryptocurrency = cryptocurrencyQuery =>
    this.state.cryptocurrencies.filter(cryptocurrency =>
      cryptocurrency.name === cryptocurrencyQuery
      || cryptocurrency.website_slug === cryptocurrencyQuery
      || cryptocurrency.symbol === cryptocurrencyQuery);

  updateTargetCryptocurrencies = async () => {
    const responses = await Promise.all(this.state.targetCryptocurrencies.map(cryptocurrency =>
      api.get(`/url/?url=https://sandbox-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest?id=${cryptocurrency.id}`)));

    this.setState({
      targetCryptocurrencies: responses.map((response) => {
        const id = _.keys(response.data.data)[0];
        return { ...response.data.data[id] };
      }),
    });
  }

  hasCryptocurrency = (cryptocurrenciesList, cryptocurrencyQuery) =>
    cryptocurrenciesList.findIndex(cryptocurrency =>
      cryptocurrency.id === cryptocurrencyQuery
      || cryptocurrency.name === cryptocurrencyQuery
      || cryptocurrency.website_slug === cryptocurrencyQuery
      || cryptocurrency.symbol === cryptocurrencyQuery);

  handleAddCryptocurrency = async (e) => {
    e.preventDefault();

    this.setState({ loading: true });

    try {
      if (this.state.cryptocurrencyInput.length === 0) {
        this.setState({ cryptocurrencyError: true });

        return;
      }

      if (this.hasCryptocurrency(
        this.state.cryptocurrencies,
        this.state.cryptocurrencyInput,
      ) === -1) {
        this.setState({ cryptocurrencyError: true });

        return;
      }

      if (this.hasCryptocurrency(
        this.state.targetCryptocurrencies,
        this.state.cryptocurrencyInput,
      ) !== -1) {
        this.setState({ cryptocurrencyError: true });

        return;
      }

      const cryptocurrency = this.getCryptocurrency(this.state.cryptocurrencyInput);

      if (cryptocurrency.length === 0) {
        this.setState({ cryptocurrencyError: true });

        return;
      }

      const { data } = await api.get(`/url/?url=https://sandbox-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest?id=${cryptocurrency[0].id}`);

      this.toogleForm();

      this.setState({
        cryptocurrencyError: false,
        cryptocurrencyInput: '',
        targetCryptocurrencies: [
          ...this.state.targetCryptocurrencies,
          { ...data.data[cryptocurrency[0].id] },
        ],
      });
    } catch (err) {
      this.setState({ cryptocurrencyError: true });
    } finally {
      this.setState({ loading: false });
    }
  }

  handleRemoveCryptocurrency = (cryptocurrencyId) => {
    const targetCryptocurrencies = this.state.targetCryptocurrencies.filter(cryptocurrency =>
      cryptocurrency.id !== cryptocurrencyId);

    this.setState({
      targetCryptocurrencies,
    });
  }

  toogleForm = () => {
    this.setState({
      isFormOpen: !this.state.isFormOpen,
    });
  }

  render() {
    if (this.state.cryptocurrencies.length === 0) {
      return (
        <Container>
          <i className="fa fa-spinner fa-pulse" />
        </Container>
      );
    }

    return (
      <Container>
        <h1>Cryptocurrencies</h1>

        <CompareList
          removeCryptocurrency={this.handleRemoveCryptocurrency}
          cryptocurrencies={this.state.targetCryptocurrencies}
        />

        <CryptocurrencyForm
          isOpen={this.state.isFormOpen}
          onSubmit={this.handleAddCryptocurrency}
          onChange={e => this.setState({ cryptocurrencyInput: e.target.value })}
          value={this.state.cryptocurrencyInput}
          withError={this.state.cryptocurrencyError}
          isLoading={this.state.loading}
          toogleForm={() => this.toogleForm()}
        />

        <FloatButton onClick={() => this.toogleForm()}>
          <i className="fa fa-plus" />
        </FloatButton>
      </Container>
    );
  }
}
