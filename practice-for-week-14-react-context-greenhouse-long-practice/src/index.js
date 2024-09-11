import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App';
import ThemeProvider from './context/ThemeContext';
// Phase 3 - Climate Context - Import climate context to wrap application and provide climate data to child components
import ClimateProvider from './context/ClimateContext';

function Root() {
  return (
      <ThemeProvider>
        <ClimateProvider>   {/* Phase 3 - Wrap application in climate provider to provide context data to child components */}
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </ClimateProvider>
      </ThemeProvider>
  );
}

ReactDOM.render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>,
  document.getElementById('root')
);
