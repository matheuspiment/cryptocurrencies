import { injectGlobal } from 'styled-components';
import 'font-awesome/css/font-awesome.css';

injectGlobal`
  * {
    box-sizing: border-box;
    margin: 0;
    outline: 0;
    padding: 0;
  }

  body {
    background: #3689e6;
    font-family: sans-serif;
    text-rendering: optimizeLegibility !important;
    -webkit-font-smoothing: antialiased !important;

    button {
      cursor: pointer;
    }
  }
`;
