import { Route, Routes } from "react-router-dom"
import Home from "../pages/Home"
import Signup from "../pages/Signup"
import SignIn from "../pages/SignIn"
import VerifyEmail from "../components/VerifyEmail"
import ResetPassword from "../components/ResetPassword"
import { useDispatch, useSelector } from "react-redux"
import type { AppDispatch, RootState } from "../store/store"
import { useEffect } from "react"
import { getMe } from "../store/actions/auth.actions"
import { ProtectedRoute } from "../components/ProtectedRoute"
import { PublicRoutes } from "../components/PublicRoutes"

const AppRoutes = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { authChecked } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    dispatch(getMe());
  }, [dispatch]);

  if (!authChecked) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background text-text">
        <p className="text-sm font-medium">Loading session...</p>
      </div>
    );
  }

  return (
    <Routes>
      <Route element={<ProtectedRoute />}>
        <Route path="/" element={<Home />} />
      </Route>

      <Route element={<PublicRoutes />}>
        <Route path="/signup" element={<Signup />} />
        <Route path="/signIn" element={<SignIn />} />
      </Route>

      <Route path="/verify-email/:token" element={<VerifyEmail />} />
      <Route path="/reset-password/:token" element={<ResetPassword />} />
    </Routes>
  );
};

export default AppRoutes;