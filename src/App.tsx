import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Home from './home';
import './App.global.css';

import OverlaySettings from './OverlaySettings/OverlaySettings';

export default function App() {
  return (
    <Router>
      <Switch>
        <Route path="/settings" component={OverlaySettings} />
        <Route path="/" component={Home} />
      </Switch>
    </Router>
  );
}
