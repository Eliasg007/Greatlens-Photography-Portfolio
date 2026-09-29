import "./styles/App.css";
import Nav from "./components/Nav";
import Home from "./components/Home";
import Work from "./components/Work";
import Stories from "./components/Stories";
import Journal from "./components/Journal";
import About from "./components/About";
import Services from "./components/Services";
import Contact from "./components/Contact";
import { useActiveSection } from "./hooks/useActiveSection";

export default function App() {
  const { active, navigate } = useActiveSection();

  return (
    <div className="app">
      <Nav active={active} onNavigate={navigate} />
      <main>
        <Home />
        <Work />
        <Stories />
        <Journal />
        <About />
        <Services />
        <Contact />
      </main>
      <footer className="footer">
        <span>&copy; {new Date().getFullYear()} GREATLENS</span>
        <button onClick={() => navigate("home")}>Back to top</button>
      </footer>
    </div>
  );
}
