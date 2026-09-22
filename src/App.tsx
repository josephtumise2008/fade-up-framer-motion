import { useEffect } from "react";
import "./App.css";
import Nav from "./components/Nav";
import Hero from "./sections/Hero";
import LiveDemo from "./sections/LiveDemo";
import HowItWorks from "./sections/HowItWorks";
import CodeSection from "./sections/CodeSection";
import SkillsSection from "./sections/SkillsSection";
import EvalDemo from "./sections/EvalDemo";
import A11yDemo from "./sections/A11yDemo";
import Footer from "./sections/Footer";

function App() {
  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="page">
      <a className="skip-link" href="#demo">
        Skip to live demo
      </a>
      <Nav />
      <Hero />
      <main>
        <LiveDemo />
        <HowItWorks />
        <CodeSection />
        <SkillsSection />
        <EvalDemo />
        <A11yDemo />
      </main>
      <Footer />
    </div>
  );
}

export default App;