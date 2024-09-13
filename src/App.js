import {
  RouterProvider,
  Outlet,
  createHashRouter,
  Route,
  createRoutesFromElements,
} from 'react-router-dom';
import { Layout as LayoutAnt } from 'antd';
import {
  Admin,
  AuthCallback,
  Home,
  Navbar,
  Profile,
  ProtectedRoute,
  Register,
  TempState,
  Welcome,
} from './components/index';

const { Content } = LayoutAnt;

const routing = createHashRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route path="/" element={<Home />} />
      <Route path="/admin" element={<Admin />} />
      <Route path="/profile" element={<Profile />} />
      <Route
        path="/admin"
        element={<ProtectedRoute element={Admin} requiredRole="admin" />}
      />
      <Route path="/register" element={<Register />} />
      <Route path="/welcome" element={<Welcome />} />
      <Route path="/auth-callback" element={<AuthCallback />} />
    </Route>
  )
);

function App() {
  return <RouterProvider router={routing} />;
}

export default App;

function Layout() {
  return (
    <Content style={{ minHeight: '100vh' }}>
      <Navbar />
      <Outlet />
      <TempState />
    </Content>
  );
}
