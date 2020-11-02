import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
    *,
    *::before,
    *::after {
        margin: 0;
        padding: 0;
        box-sizing: inherit;
    }

    html {
        box-sizing: border-box;
        font-size: 62.5%;
    }

    @media only screen and (max-width: 75em) {
        html {
            font-size: 56.25%;
        }
    }

    @media only screen and (max-width: 56.25em) {
        html {
            font-size: 50%;
        }
    }

    @media only screen and (min-width: 112.5em) {
        html {
            font-size: 75%;
        }
    }

`;

export default GlobalStyle;
