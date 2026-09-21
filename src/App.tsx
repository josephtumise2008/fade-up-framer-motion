import "./App.css";
import Nav from "./components/Nav";
import Hero from "./sections/Hero";
import LiveDemo from "./sections/LiveDemo";
import HowItWorks from "./sections/HowItWorks";
import CodeSection from "./sections/CodeSection";
import SkillsSection from "./sections/SkillsSection";
import EvalDemo from "./sections/EvalDemo";
import Footer from "./sections/Footer";

function App() {
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
      </main>
      <Footer />
    </div>
  );
}

export default App;