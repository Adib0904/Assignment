import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import UserForm from './UserForm';
import SecondPage from './SecondPage';

const AppRoutes: React.FC = () => (
  <Router>
    <Routes>
      <Route path="/" element={<UserForm />} />
      <Route path="/second" element={<SecondPage />} />
    </Routes>
  </Router>
);

export default AppRoutes;
