// navigation
import { Routes, Route } from "react-router-dom";

// pages
import Home from "./routes/home/home.component";
import Authentication from "./routes/authentication/authentication.component";
// components
import Navigation from "./routes/navigation/navigation.component";


const Shop = () => {
  return (
    <div>
      <h1>I am the shopping cart</h1>
    </div>
  );
};

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigation />}>
        <Route index element={<Home />}></Route>
        <Route path="shop" element={<Shop />}></Route>
        <Route path="auth" element={<Authentication />}></Route>
      </Route>
    </Routes>
  );
};

export default App;
