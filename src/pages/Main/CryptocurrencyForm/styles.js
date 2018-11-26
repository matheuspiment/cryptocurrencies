import styled from 'styled-components';

export const Container = styled.div`
  display: ${props => (props.isOpen ? 'flex' : 'none')};
  align-items: center;
  justify-content: center;
  position: fixed;
  top: 0;
  height: 100%;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.4);
  z-index: 1;
`;

export const Content = styled.div`
  width: fit-content;
  height: fit-content;
  padding: 20px;
  background-color: #FFF;
  border-radius: 3px;

  header {
    align-items: center;
    display: flex;
    flex-direction: column;

    button {
      align-self: flex-end;
      background: #ff4c4c;
      border: none;
      border-radius: 50%;
      margin-right: -10px;
      margin-top: -10px;
      padding: 4px 6px;

      &:hover {
        background: #ea4444;
      }

      i {
        color: #FFF;
      }
    }
  }
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  margin-top: 20px;
  max-width: 400px;
  width: 100%;

  input {
    background: #FFF;
    border: ${props => (props.withError ? '2px solid #F00' : '2px solid #E2E2E2')};
    border-radius: 3px;
    color: #444;
    flex: 1;
    font-size: 18px;
    height: 55px;
    padding: 0 20px;
  }

  button {
    background: #63F5B8;
    border: 0;
    border-radius: 3px;
    color: #FFF;
    font-size: 20px;
    font-weight: bold;
    height: 55px;
    margin-top: 15px;
    padding: 0 20px;

    &:hover {
      background: #52D89F;
    }
  }
`;
