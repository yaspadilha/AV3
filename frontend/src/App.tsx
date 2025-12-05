import { BrowserRouter, Routes, Route, Outlet, Navigate } from 'react-router-dom';
import Login from './pages/Login/Login';
import Banner from './components/Banner';
import Menu from './components/Menu';
import Aeronave from './pages/Aeronave/Aeronave';
import Pecas from './pages/Pecas/Pecas';
import Funcionario from './pages/Funcionarios/Funcionario';
import EtapasProducao from './pages/Etapas/EtapasProducao';
import Relatorio from './pages/Relatorios/Relatorio';
import Teste from './pages/Testes/Teste';
import { AuthProvider, useAuth } from './contexts/AuthContext';

const PrivateRoute = () => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <Outlet /> : <Navigate to="/" />;
};

const AdminRoute = () => {
  const { user } = useAuth();
  return user?.nivel_permissao === 'administrador' ? <Outlet /> : <Navigate to="/aeronaves" />;
};

const Layout = () => (
  <div>
    <Banner />
    <Menu />
    <main style={{ padding: '20px' }}>
      <Outlet />
    </main>
  </div>
);

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route element={<PrivateRoute />}>
            <Route element={<Layout />}>
              <Route path="/aeronaves" element={<Aeronave />} />
              <Route path="/pecas" element={<Pecas />} />
              <Route path="/etapas" element={<EtapasProducao />} />
              <Route path="/relatorios" element={<Relatorio />} />
              <Route path="/testes" element={<Teste />} />
              <Route element={<AdminRoute />}>
                <Route path="/funcionarios" element={<Funcionario />} />
              </Route>

            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;