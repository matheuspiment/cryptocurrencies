import styled from 'styled-components';

export const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  grid-template-rows: 303px;
  grid-column-gap: 20px;
  grid-row-gap: 20px;
  margin-top: 60px;
  width: 85%;
  max-width: 1240px;
`;

export const Cryptocurrency = styled.div`
  background: #FFF;
  border-radius: 3px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  header {
    align-items: center;
    display: flex;
    flex-direction: column;
    padding: 30px;

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

    div {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 64px;
      width: 64px;
      color: #fff;
      background-color: #f67d4b
      border-radius: 50%;

      span {
        font-weight: bold;
      }
    }

    strong {
      font-size: 24px;
      margin-top: 10px;
      text-align: center;
    }

    small {
      color: #666;
      font-size 14px;
    }
  }

  ul {
    list-style: none;

    li {
      font-weight: bold;
      padding: 12px 20px;

      &.up {
        color: #63F5B8;
      }

      &.down {
        color: #ff4c4c;
      }

      i {
        margin-right: 10px;
        text-align: center;
        width: 16px;
      }

      small {
        color: #999;
        font-size: 12px;
        font-style: italic;
        font-weight normal;
      }

      &:nth-child(2n - 1) {
        background: #F5F5F5;
      }
    }
  }
`;
