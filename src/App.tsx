import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Import Routes
import { AppShell } from '@mantine/core'; // Removed unused Center
import { QueryProvider } from './providers/QueryProvider';
import { Navigation } from './components/Navigation';
import { Dashboard } from './pages/Dashboard.tsx';
import { About } from './pages/About';
import { SwapPage } from './pages/SwapPage.tsx';
import { LiquidityPage } from './pages/LiquidityPage.tsx';
import { Routes as AppRoutes } from './constants/routes.ts'; // Renamed Routes enum
import { ComingSoon } from './pages/ComingSoon.tsx';

function App() {
  return (
    <QueryProvider>
      <Router>
        <AppShell
          header={{ height: 80 }}
          padding="xl"
          styles={{ 
            main: { width: '100vw' },
            header: { border: 'none' }
          }}
        >
          <Navigation />
          <AppShell.Main style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path={AppRoutes.About} element={<About />} />
              <Route path={AppRoutes.Swap} element={<SwapPage />} />
              <Route path={AppRoutes.Dashboard} element={<Dashboard />} />
              <Route path={AppRoutes.Liquidity} element={<LiquidityPage />} />
              <Route path={AppRoutes.Lock} element={<ComingSoon />} />
              <Route path={AppRoutes.Vote} element={<ComingSoon />} />
              <Route path={AppRoutes.Incentivize} element={<ComingSoon />} />
            </Routes>
          </AppShell.Main>
        </AppShell>
      </Router>
    </QueryProvider>
  );
}

export default App;
