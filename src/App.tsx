import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Routes from './router/Routes';
import UserWayWidget from './components/UserWayWidget';

const App: React.FC = () => {
  return (
    <BrowserRouter>
    <UserWayWidget />
        <Routes />
    </BrowserRouter>
  );
};

export default App;
