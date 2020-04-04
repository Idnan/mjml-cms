import './index.css';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import { appTheme } from './assets/theme';
import ThemeProvider from '@chakra-ui/core/dist/ThemeProvider';

ReactDOM.render(
    <React.StrictMode>
        <ThemeProvider theme={ appTheme }>
            <App />
        </ThemeProvider>
    </React.StrictMode>,
    document.getElementById('root')
);
