import { Suspense, lazy } from 'react';
import { Outlet } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

const Navigation = lazy(() => import('../Navigation/Navigation'));

const Layout = () => {
  return (
    <div>
      <Toaster position="top-right" toastOptions={{ duration: 1500 }} />
      <Suspense>
        <Navigation />
        <Outlet />
      </Suspense>
    </div>
  );
};
export default Layout;
