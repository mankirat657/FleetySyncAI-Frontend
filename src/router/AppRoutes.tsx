import { Route, Routes } from "react-router-dom"
import Home from "../pages/Home"
import Signup from "../pages/Signup"
import SignIn from "../pages/SignIn"
import VerifyEmail from "../components/VerifyEmail"
import ResetPassword from "../components/ResetPassword"

const AppRoutes = () => {
  return (
    <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signIn" element={<SignIn />} />
        <Route path="/verify-email/:token" element={<VerifyEmail />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
    </Routes>
  )
}

export default AppRoutes