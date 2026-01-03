import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Login from "./auth/Login";
import Register from "./auth/Register";
import ForgotPassword from "./auth/ForgotPassword";
import ResetPassword from "./auth/ResetPassword";
import Feed from "./feed/Feed";
import ProtectedRoute from "./components/ProtectedRoute";
import Profile from "./profile/Profile";
import FollowersList from "./profile/FollowersList";
import FollowingList from "./profile/FollowingList";
import Notifications from "./notifications/Notifications";


function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password/:uid/:token" element={<ResetPassword />} />

          <Route
            path="/"
            element={
              <ProtectedRoute>
<Feed />             
 </ProtectedRoute>
            }
          />
          <Route
  path="/profile"
  element={
    <ProtectedRoute>
      <Profile />
    </ProtectedRoute>
  }
/>

<Route
  path="/followers"
  element={
    <ProtectedRoute>
      <FollowersList />
    </ProtectedRoute>
  }
/>

<Route
  path="/following"
  element={
    <ProtectedRoute>
      <FollowingList />
    </ProtectedRoute>
  }
/>
<Route
  path="/notifications"
  element={
    <ProtectedRoute>
      <Notifications />
    </ProtectedRoute>
  }
/>

        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
