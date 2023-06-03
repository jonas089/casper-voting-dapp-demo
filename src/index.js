import { render } from "react-dom";
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import Example from "./Example";
import Example2 from "./Example2";
import "./index.css";

const rootElement = document.getElementById("root");
render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Example />} />
      <Route path="example2" element={<Example2 />} />
    </Routes>
  </BrowserRouter>,
  rootElement
);
