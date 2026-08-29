import React from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { Analytics } from '@vercel/analytics/react';
import { ThemeProvider } from './components/ThemeProvider';
import { SmoothScroll } from './components/SmoothScroll';
import { Nav } from './components/Nav';
import { ShaderFlow } from './components/ShaderFlow';
import { Home } from './pages/Home';
import { Projects } from './pages/Projects';
import { About } from './pages/About';

const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();
  React.useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior });
  }, [pathname]);
  return null;
};

export const App: React.FC = () => {
  return (
    <ThemeProvider>
      <SmoothScroll>
        <BrowserRouter>
          <ScrollToTop />

          {/* Background Shader */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-225 overflow-hidden"
          >
            <div className="absolute inset-0 opacity-50 md:opacity-100">
              <ShaderFlow brightness={3} iterations={10} flowSpeed={[0, 0.1]} />
            </div>
          </div>

          <Nav />

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/about" element={<About />} />
            <Route path="*" element={<Home />} />
          </Routes>

          {/* Vercel Analytics */}
          <Analytics />
        </BrowserRouter>
      </SmoothScroll>
    </ThemeProvider>
  );
};
