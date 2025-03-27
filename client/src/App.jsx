import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Podcasts from "./pages/Podcasts";
import { ToastContainer } from "react-toastify";
import Projects from "./pages/Projects";
import AddPodcast from "./components/AddPodcast";
import ViewPodcast from "./components/ViewPodcast";
import Repurpose from "./components/Repurpose";
import Widget from "./components/Widget";
import Upgrade from "./components/Upgrade";
import Account from "./components/Account";
const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/podcasts" element={<Podcasts />}>
            <Route path="add" element={<AddPodcast />} />
            <Route path="view" element={<ViewPodcast />} />
            <Route path="repurpose" element={<Repurpose />} />
            <Route path="widget" element={<Widget />} />
            <Route path="upgrade" element={<Upgrade />} />
            <Route path="account" element={<Account />} />
          </Route>
        </Routes>
      </BrowserRouter>
      <ToastContainer />
    </div>
  );
};
export default App;
