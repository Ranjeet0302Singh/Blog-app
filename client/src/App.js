import "./App.css";
import Layout from "./components/Layout";
import IndexPage from "./components/Pages/IndexPage";
import { Route, Routes } from "react-router-dom";
import LoginPage from "./components/Pages/LoginPage";
import RegisterPage from "./components/Pages/RegisterPage";
import { UserContextProvider } from "./context/UserContext";
import CreatePost from "./components/Pages/CreatePost";
function App() {
  return (
    <div className="App">
      <UserContextProvider>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<IndexPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/create" element={<CreatePost />} />
          </Route>
        </Routes>
      </UserContextProvider>
    </div>
  );
}

export default App;
