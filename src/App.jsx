import { Outlet } from "react-router";
import Navigation from "./components/navigation/Navigation";
import "./App.css";
import Footer from "./components/footer/Footer";

function App() {
  return (
    <>

    <main>
      <Navigation />
      <Outlet />
    </main>
    <Footer/>
    </>
  );
}

export default App;
