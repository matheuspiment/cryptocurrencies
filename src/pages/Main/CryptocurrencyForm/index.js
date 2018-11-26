import React from 'react';
import PropTypes from 'prop-types';

import { Container, Content, Form } from './styles';

const CryptocurrencyForm = ({
  onSubmit, onChange, isLoading, isOpen, value, withError, toogleForm,
}) => (
  <Container isOpen={isOpen}>
    <Content>
      <header>
        <button
          type="button"
          onClick={toogleForm}
        >
          <i className="fa fa-close" />
        </button>
        <strong>Add Cryptocurrency</strong>
      </header>
      <Form withError={withError} onSubmit={onSubmit}>
        <input
          type="text"
          placeholder="Cryptocurrency name/slug"
          value={value}
          onChange={onChange}
        />
        <button type="submit">
          {isLoading ? <i className="fa fa-spinner fa-pulse" /> : 'OK'}
        </button>
      </Form>
    </Content>
  </Container>
);

CryptocurrencyForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  isOpen: PropTypes.bool.isRequired,
  value: PropTypes.string.isRequired,
  withError: PropTypes.bool.isRequired,
  toogleForm: PropTypes.func.isRequired,
};

export default CryptocurrencyForm;
