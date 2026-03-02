import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/home";
import Matches from "./pages/matches";
import MatchDetail from "./pages/matchDetail";
import Teams from "./pages/teams";
import TeamDetail from "./pages/teamDetail";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="matches" element={<Matches />} />
        <Route path="matches/:id" element={<MatchDetail />} />
        <Route path="teams" element={<Teams />} />
        <Route path="teams/:id" element={<TeamDetail />} />
      </Route>
    </Routes>
  );
}

export default App;
