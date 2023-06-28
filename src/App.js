import React from 'react';
import { Link, Routes, Route, Outlet, useLocation } from 'react-router-dom';
import NavBar from "./components/Nav";
import Example from "./routes/Example";
import Example2 from "./routes/Example2";
import "./index.css";

const Navbar = () => {
  const location = useLocation();

  return (
    <nav>
      <NavBar />
      <Outlet /> {/* Renders the matched child component */}
    </nav>
  );
};

const App = () => {
  return (
    <Routes>
      <Route index element={<Example />} />
      <Route path="example2" element={<Example2 />} />
    </Routes>
  );
};

export default App;
