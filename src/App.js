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
  Cart,
  CartSummaryPage,
  Home,
  Navbar,
  Product,
  Profile,
  Register,
  TempState,
  Welcome,
} from './components/index';
import { AuthProvider } from './useSession';

const { Content } = LayoutAnt;

const routing = createHashRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route path="/" element={<Home />} />
      <Route path="/admin" element={<Admin />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/cart-summary" element={<CartSummaryPage />} />
      <Route path="/product" element={<Product />} />
      <Route path="/profile" element={<Profile />} />
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
    <AuthProvider>
      <Content style={{ minHeight: '100vh' }}>
        <Navbar />
        <Outlet />
      </Content>
    </AuthProvider>
  );
}
