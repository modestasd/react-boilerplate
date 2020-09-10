import React from 'react';
import { ThemeProvider } from 'styled-components';

import { theme } from './theme';

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <div>Hello world</div>
    </ThemeProvider>
  );
};

export default App;
