import About from '../../components/About';
import AnimatedThemeWrapper from '../../components/AnimatedThemeWrapper';
import CommandPalette from '../../components/CommandPalette';
import Contact from '../../components/Contact';
import GithubStats from '../../components/GithubStats';
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
        <CommandPalette />
        <Home />
        <About />
        <Skills />
        <GithubStats />
        <Projects />
        <Contact />
      </AnimatedThemeWrapper>
    </CustomThemeProvider>
  );
}