
import { useEffect } from 'react';
import { Outlet,Navigate } from 'react-router-dom';





const AuthLayout = () => {
  const isAuthenticated = false;


  useEffect(() => {
    // Remove top padding on auth pages
    document.body.style.paddingTop = '0px';

    return () => {
      // Restore padding when leaving auth layout
      document.body.style.paddingTop = '80px';
    };
  }, []);
  return (
    <>
      {isAuthenticated ? (
        <Navigate to="/" />
      ) : (
        <div className="d-flex flex-column flex-xl-row vh-100 w-100 m-0 p-0" >
          {/* Form Section */}
          <section className="d-flex flex-grow-1 justify-content-center align-items-center py-4 py-xl-5">
            <Outlet />
          </section>

          {/* Image Section */}
          <div className="d-none d-xl-block w-50 h-100">
            <img
              src="/assets/images/login-background.jpg"
              alt="logo"
              className="w-100 h-100 "
              style={{ display: 'block' }}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default AuthLayout;
