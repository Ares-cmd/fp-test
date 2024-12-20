import React from 'react';
import { NavBar } from './components/NavBar';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { GitHubProvider } from './context/github-context';
import Home from './pages/Home';
import History from './pages/History';

function App() {
  return (
    <Router>
      <GitHubProvider children={null}>
      <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/history" element={<History />} />
        </Routes>
      </GitHubProvider>
    </Router>
  );
}

export default App;

