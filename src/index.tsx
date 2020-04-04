import './index.css';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import { appTheme } from './assets/theme';
import ThemeProvider from '@chakra-ui/core/dist/ThemeProvider';
import { CSSReset } from '@chakra-ui/core/dist';

ReactDOM.render(
    <React.StrictMode>
        <ThemeProvider theme={ appTheme }>
            <CSSReset />
            <App />
        </ThemeProvider>
    </React.StrictMode>,
    document.getElementById('root')
);
