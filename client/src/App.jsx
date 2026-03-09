import { BrowserRouter, Routes, Route } from "react-router-dom";

import Register from "./pages/Register";
import Login from "./pages/Login";
import VerifyEmail from "./pages/VerifyEmail";
import Profile from "./pages/Profile";
import ChooseUsername from "./pages/ChooseUsername";
import LinkGoogle from "./pages/LinkGoogle";
import OAuthSuccess from "./pages/OAuthSuccess";
import LinkAccount from "./pages/LinkAccount";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/verify-email" element={<VerifyEmail />} />
        <Route path="/profile" element={<ProtectedRoute> <Profile /> </ProtectedRoute> }/> // Protected route for profile page
        <Route path="/choose-username" element={<ChooseUsername />} /> {/* New route for choosing username after Google login */}
        <Route path="/link-google" element={<LinkGoogle />} /> {/* New route for linking Google accounts */}
        <Route path="/oauth-success" element={<OAuthSuccess />} /> {/* New route for handling OAuth success */}
        <Route path="/link-account" element={<LinkAccount />} /> {/* New route for linking existing accounts with OAuth */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;