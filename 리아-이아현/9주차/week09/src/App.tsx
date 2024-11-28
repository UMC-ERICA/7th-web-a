import React from "react";
import { Provider } from "react-redux";
import store from "./store/store";
import CartContainer from "./components/CartContainer";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <Navbar />
      <CartContainer />
      <Footer />
    </Provider>
  );
};

export default App;
