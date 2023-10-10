import { useState } from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import AuthScreen from "./components/AuthScreen";
import ForumScreen from "./components/ForumScreen";
import HomeScreen from "./components/HomeScreen";
import Header from "./components/Header";

function App() {


  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<AuthScreen />} />
        <Route path='/home' element={<HomeScreen />} />
        <Route path='/forum/:forumId' element={<ForumScreen />} />
      </Routes>
    </div>
  );
}

export default App;
