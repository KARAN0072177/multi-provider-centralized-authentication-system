import { BrowserRouter, Routes, Route } from "react-router-dom";

import Register from "./pages/Register";
import Login from "./pages/Login";
import VerifyEmail from "./pages/VerifyEmail";
import Profile from "./pages/Profile";
import ChooseUsername from "./pages/ChooseUsername";
import LinkGoogle from "./pages/LinkGoogle";
import OAuthSuccess from "./pages/OAuthSuccess";
import LinkAccount from "./pages/LinkAccount";
import Home from "./pages/Home";
import About from "./pages/About";
import VerifyEmailNotice from "./pages/VerifyEmailNotice";

import ProtectedRoute from "./components/ProtectedRoute";
import MainLayout from "./layouts/MainLayout";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Auth Pages (NO Navbar/Footer) */}
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/verify-email" element={<VerifyEmail />} />
        <Route path="/oauth-success" element={<OAuthSuccess />} />
        <Route path="/choose-username" element={<ChooseUsername />} />
        <Route path="/link-google" element={<LinkGoogle />} />
        <Route path="/link-account" element={<LinkAccount />} />
        <Route path="/verify-email-notice" element={<VerifyEmailNotice />} />

        {/* Main Layout (WITH Navbar/Footer) */}
        <Route element={<MainLayout />}>

          <Route path="/home" element={<Home />} />

          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />

          <Route path="/about" element={<About />} />

        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;