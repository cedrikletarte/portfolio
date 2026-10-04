import About from '../../components/sections/About';
import CommandPalette from '../../components/ui/CommandPalette';
import Contact from '../../components/sections/Contact';
import GithubStats from '../../components/sections/GithubStats';
import Home from '../../components/sections/Home';
import Navbar from '../../components/layout/Navbar';
import SmoothScroll from '../../components/layout/SmoothScroll';
import ThemeBackground from '../../components/layout/ThemeBackground';
import Projects from '../../components/sections/Projects';
import Skills from '../../components/sections/Skills';
import { CustomThemeProvider } from '../../theme/ThemeContext';

export default function App() {
  return (
    <CustomThemeProvider>
      <SmoothScroll>
        <ThemeBackground>
          <Navbar />
          <CommandPalette />
          <Home />
          <About />
          <Skills />
          <GithubStats />
          <Projects />
          <Contact />
        </ThemeBackground>
      </SmoothScroll>
    </CustomThemeProvider>
  );
}
