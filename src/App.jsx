
import './App.css';
import { Route, Routes } from "react-router-dom";
import Main from './components/Main.jsx'
import Show from './components/Show.jsx';
import RegisterPage from './components/RegisterPage.jsx';
import LoginPage from './components/LoginPage.jsx';
import UserContextProvider from "./components/UserContext.jsx";
import ProfilePage from './components/ProfilePage.jsx';

function App() {
  return (
    <UserContextProvider>
    <Routes>
      <Route path="/" element={<Main />}></Route>
      <Route path="/show" element={<Show />}></Route>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/account" element={<ProfilePage />} />
    </Routes>
    </UserContextProvider>
  );
}

export default App;
