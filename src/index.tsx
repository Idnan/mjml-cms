import React from 'react';
import ReactDOM from 'react-dom';
// import App from './components/app';
import { appTheme } from './theme';
import ThemeProvider from '@chakra-ui/core/dist/ThemeProvider';
import { CSSReset } from '@chakra-ui/core/dist';
import { App } from './app';

ReactDOM.render(
    <React.StrictMode>
        <ThemeProvider theme={ appTheme }>
            <CSSReset />
            <App />
        </ThemeProvider>
    </React.StrictMode>,
    document.getElementById('root')
);
