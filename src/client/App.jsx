import { useContext } from "react";
import "./App.css";
import { Route, Routes, Navigate } from "react-router-dom";
import AuthScreen from "./components/AuthScreen";
import ForumScreen from "./components/ForumScreen";
import HomeScreen from "./components/HomeScreen";
import Header from "./components/Header";
import AuthContext from "./state/AuthContext";

function App() {
  const { state } = useContext(AuthContext);

  return (
    <div className="App">
      <Header />
      <Routes>
        <Route
          path="/"
          element={!state.token ? <AuthScreen /> : <Navigate to="/home" />}
        />
        <Route
          path="/home"
          element={state.token ? <HomeScreen /> : <Navigate to="/" />}
        />
        <Route
          path="/forum/:forumId"
          element={state.token ? <ForumScreen /> : <Navigate to="/" />}
        />
      </Routes>
    </div>
  );
}

export default App;
