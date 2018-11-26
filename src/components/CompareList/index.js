import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import moment from 'moment';

import { Container, Cryptocurrency } from './styles';

const formatCurrency = value =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);

const CompareList = ({ removeCryptocurrency, cryptocurrencies }) => (
  <Container>
    { cryptocurrencies.map(cryptocurrency => (
      <Cryptocurrency key={cryptocurrency.id}>
        <header>
          <button
            type="button"
            onClick={() => removeCryptocurrency(cryptocurrency.id)}
          >
            <i className="fa fa-close" />
          </button>
          <div>
            <span>{cryptocurrency.symbol}</span>
          </div>
          <strong>{cryptocurrency.name}</strong>
          <small>{formatCurrency(cryptocurrency.quote.USD.price)}</small>
        </header>

        <ul>
          <li className={
            classNames(
              { up: cryptocurrency.quote.USD.percent_change_24h > 0 },
              { down: cryptocurrency.quote.USD.percent_change_24h < 0 },
            )}
          >
            <i className="fa fa-line-chart" /> {cryptocurrency.quote.USD.percent_change_24h}% <small>change (24h)</small>
          </li>
          <li>
            <i className="fa fa-clock-o" /> {moment(cryptocurrency.last_updated).fromNow()} <small>last update</small>
          </li>
        </ul>
      </Cryptocurrency>
    )) }
  </Container>
);

CompareList.propTypes = {
  removeCryptocurrency: PropTypes.func.isRequired,
  cryptocurrencies: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    symbol: PropTypes.string,
    quote: PropTypes.shape({
      USD: PropTypes.shape({
        price: PropTypes.number,
        percent_change_24h: PropTypes.number,
      }),
    }),
    last_updated: PropTypes.string,
  })).isRequired,
};

export default CompareList;
