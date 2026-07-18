import { BrowserRouter, Routes, Route } from "react-router-dom";

import Landing from "./pages/Landing";
import Login from "./pages/Login";

import Chat from "./pages/Chat";
import Upload from "./pages/Upload";
import Library from "./pages/Library";
import Profile from "./pages/Profile";
import DataVault from "./pages/DataVault";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/workspace" element={<Chat />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/vault" element={<DataVault />} />
        <Route path="/upload" element={<Upload />} />
        <Route path="/library" element={<Library />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;