import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import moment from 'moment';

import { Container, Repository } from './styles';

const formatCurrency = value =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);

const CompareList = ({ removeRepository, cryptocurrencies }) => (
  <Container>
    { cryptocurrencies.map(cryptocurrency => (
      <Repository key={cryptocurrency.id}>
        <header>
          <button
            type="button"
            onClick={() => removeRepository(cryptocurrency.id)}
          >
            <i className="fa fa-close" />
          </button>
          <div>
            <span>{cryptocurrency.symbol}</span>
          </div>
          <strong>{cryptocurrency.name}</strong>
          <small>{formatCurrency(cryptocurrency.quotes.USD.price)}</small>
        </header>

        <ul>
          <li className={
            classNames(
              { up: cryptocurrency.quotes.USD.percent_change_24h > 0 },
              { down: cryptocurrency.quotes.USD.percent_change_24h < 0 },
            )}
          >
            <i className="fa fa-line-chart" /> {cryptocurrency.quotes.USD.percent_change_24h}% <small>change (24h)</small>
          </li>
          <li>
            <i className="fa fa-clock-o" /> {moment.unix(cryptocurrency.last_updated).fromNow()} <small>last update</small>
          </li>
        </ul>
      </Repository>
    )) }
  </Container>
);

CompareList.propTypes = {
  removeRepository: PropTypes.func.isRequired,
  cryptocurrencies: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    symbol: PropTypes.string,
    quotes: PropTypes.shape({
      USD: PropTypes.shape({
        price: PropTypes.number,
        percent_change_24h: PropTypes.number,
      }),
    }),
    last_updated: PropTypes.number,
  })).isRequired,
};

export default CompareList;
