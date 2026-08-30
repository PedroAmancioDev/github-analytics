import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/home";
import UserProfile from "./pages/userProfile";

export default function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/user/:username" element={<UserProfile />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}