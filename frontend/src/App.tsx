import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/home";
import Matches from "./pages/matches";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="matches" element={<Matches />} />
      </Route>
    </Routes>
  );
}

export default App;
