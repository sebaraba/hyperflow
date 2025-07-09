import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AppShell, Center } from '@mantine/core';
import { QueryProvider } from './providers/QueryProvider';
import { Navigation } from './components/Navigation';
import { Home } from './pages/Home';
import { About } from './pages/About';

function App() {
  return (
    <QueryProvider>
      <Router>
        <AppShell
          header={{ height: 70 }}
          padding="md"
          styles={{ main: { width: '100vw' } }}
        >
          <Navigation />
          <AppShell.Main style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Center style={{ width: '100%' }}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
              </Routes>
            </Center>
          </AppShell.Main>
        </AppShell>
      </Router>
    </QueryProvider>
  );
}

export default App;
