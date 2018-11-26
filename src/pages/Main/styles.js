import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 60px 0px;

  h1 {
    color: #FFF;
    font-weight: bold;
  }

  > i {
    justify-self: center;
    font-size: 32px;
    color: #FFF;
  }
`;

export const FloatButton = styled.button`
  bottom: 15px;
  right: 15px;
  position: fixed;
  width: 62px;
  height: 62px;
  border: none;
  border-radius: 100%;
  background-color: #27CE7A;
  box-shadow: 0 5px 4px 0 rgba(0,0,0,.26);

  > i {
    font-size: 24px;
    color: #FFF;
  }
`;
