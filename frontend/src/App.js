import './App.css';
import AuthPage from './components/AuthPage';
import Dashboard from './components/dashboard/Dashboard'; // Import Dashboard
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AuthPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
