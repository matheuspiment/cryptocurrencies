import React, { Component } from 'react';
import _ from 'lodash';
import Notify from 'notifyjs';

import { Container, Form } from './styles';

import api from '../../services/api';
import CompareList from '../../components/CompareList';

export default class Main extends Component {
  state = {
    loading: false,
    cryptocurrencyError: false,
    cryptocurrencyInput: '',
    cryptocurrencies: [],
    targetCryptocurrencies: [],
  }

  async componentDidMount() {
    this.update = setInterval(this.updateTargetCryptocurrencies, 30000);

    try {
      const { data } = await api.get('/url/?url=https://api.coinmarketcap.com/v2/listings/');

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
        'quotes.USD.price',
      );

      const toNotify = cryptocurrenciesUpdated.filter(cryptocurrency =>
        cryptocurrency.quotes.USD.percent_change_24h <= -10
        || cryptocurrency.quotes.USD.percent_change_24h >= 0.2);

      const notifications = toNotify.map(cryptocurrency =>
        new Notify(
          cryptocurrency.name,
          {
            body: cryptocurrency.quotes.USD.percent_change_24h < 0
              ? `This cryptocurrency fell ${Math.abs(cryptocurrency.quotes.USD.percent_change_24h)}% in 24h`
              : `This cryptocurrency rose ${Math.abs(cryptocurrency.quotes.USD.percent_change_24h)}% in 24h`,
          },
        ));

      _.forEach(notifications, (notification) => {
        this.handleNotification(notification);
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
      api.get(`/url/?url=https://api.coinmarketcap.com/v2/ticker/${cryptocurrency.id}`)));

    this.setState({
      targetCryptocurrencies: responses.map(response => ({ ...response.data.data })),
    });
  }

  hasCryptocurrency = (cryptocurrenciesList, cryptocurrencyQuery) =>
    cryptocurrenciesList.findIndex(cryptocurrency =>
      cryptocurrency.id === cryptocurrencyQuery
      || cryptocurrency.name === cryptocurrencyQuery
      || cryptocurrency.website_slug === cryptocurrencyQuery
      || cryptocurrency.symbol === cryptocurrencyQuery);


  handleNotification = (notification) => {
    if (!Notify.needsPermission) {
      notification.show();
    } else if (Notify.isSupported()) {
      Notify.requestPermission(console.log('A'), console.log('B'));
    }
  }

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

      const { data } = await api.get(`/url/?url=https://api.coinmarketcap.com/v2/ticker/${cryptocurrency[0].id}`);

      this.setState({
        cryptocurrencyError: false,
        cryptocurrencyInput: '',
        targetCryptocurrencies: [...this.state.targetCryptocurrencies, { ...data.data }],
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

        <Form withError={this.state.cryptocurrencyError} onSubmit={this.handleAddCryptocurrency}>
          <input
            type="text"
            placeholder="cryptocurrency name/slug"
            value={this.state.cryptocurrencyInput}
            onChange={e => this.setState({ cryptocurrencyInput: e.target.value })}
          />
          <button type="submit">
            {this.state.loading ? <i className="fa fa-spinner fa-pulse" /> : 'OK'}
          </button>
        </Form>

        <CompareList
          removeCryptocurrency={this.handleRemoveCryptocurrency}
          cryptocurrencies={this.state.targetCryptocurrencies}
        />
      </Container>
    );
  }
}
