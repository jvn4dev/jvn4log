import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  html, body, textarea {
    padding: 0;
    margin: 0;
  }
  
  * {
      box-sizing: border-box;
  }
  
  a {
    cursor: pointer;
    text-decoration: none;
    transition: .25s;
      color: #000;
  }
  
  ol, ul {
    list-style: none;
    margin: 0;
    padding: 0;
  }
`;

export default GlobalStyles;