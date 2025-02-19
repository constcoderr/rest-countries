import { createRoot } from "react-dom/client";
import App from "./App";
import { BrowserRouter, Routes, Route } from "react-router";
import Home from "./components/Home";
import CountryDetails from "./components/CountryDetails";

const root = createRoot(document.querySelector("#root"));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}>
        <Route path="/" element={<Home />} />
        <Route path="/:country" element={<CountryDetails />} />
      </Route>
    </Routes>
  </BrowserRouter>
);
