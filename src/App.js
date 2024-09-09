import {
  RouterProvider,
  Outlet,
  createHashRouter,
  Route,
  createRoutesFromElements,
} from 'react-router-dom';
import { Layout as LayoutAnt } from 'antd';
import { Admin, Home, Navbar, Profile } from './components/index';

const { Content } = LayoutAnt;

const routing = createHashRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route path="/" element={<Home />} />
      <Route path="/admin" element={<Admin />} />
      <Route path="/profile" element={<Profile />} />
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
    </Content>
  );
}
