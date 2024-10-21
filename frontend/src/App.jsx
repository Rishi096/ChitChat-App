// import Login from "./pages/login/Login";
import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/home/Home";
import SignUp from "./pages/signup/SignUp";
import Login from "./pages/login/Login";
import { Toaster } from "react-hot-toast";
import { useAuthContext } from "./context/AuthContext";

function App() {
  const {authUser} = useAuthContext();

  return (
   <div className="p-4 h-[100vh] flex items-center justify-center">
    <Routes>
      <Route path='/' element={authUser ? <Home/> : <Login/>} />
      <Route path="/login"  element={ authUser ? <Navigate to='/'/> : <Login/>}/>
      <Route path="/signup" element={ authUser ? <Navigate to='/'/> : <SignUp/>}/>
    </Routes>
    <Toaster/>
   </div>
  )
}
export default App
