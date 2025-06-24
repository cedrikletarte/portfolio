import About from '../../components/About';
import AnimatedThemeWrapper from '../../components/AnimatedThemeWrapper';
import Contact from '../../components/Contact';
import Home from '../../components/Home';
import Navbar from '../../components/Navbar';
import Projects from '../../components/Projects';
import Skills from '../../components/Skills';
import { CustomThemeProvider } from '../../theme/ThemeContext';

export default function App() {
  return (
    <CustomThemeProvider>
      <AnimatedThemeWrapper>
        <Navbar />
        <Home />
        <About />
        <Skills />
        <Projects />
        <Contact />
      </AnimatedThemeWrapper>
    </CustomThemeProvider>
  );
}