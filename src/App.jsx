import { Outlet } from "react-router";
import "./App.css";
import Footer from "./components/footer/Footer";

function App() {
  return (
    <>

    <main>
      <Outlet />
    </main>
    <Footer/>
    </>
  );
}

export default App;
