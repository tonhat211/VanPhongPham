import React from 'react';
import ReactDOM from 'react-dom/client';
import './i18n'; // da ngon ngu
import App from './App';
import reportWebVitals from './reportWebVitals';
import GlobalStyles from '~/components/GlobalStyles';
import { FEProvider } from './context/FEProvider';
import { DataProvider } from './context/DataContext';
import { Provider } from 'react-redux';
import { store } from '~/store';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <Provider store={store}>
        <GlobalStyles>
            <FEProvider>
                <DataProvider>
                    <App />
                </DataProvider>
            </FEProvider>
        </GlobalStyles>
        </Provider>
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
