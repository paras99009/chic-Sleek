import { Outlet, useLocation } from "react-router-dom"
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"


function RootLayout() {
  const location = useLocation();

  // Check if the current route is /ai-chat
  const shouldDisplayFooter = !location.pathname.startsWith('/ai-chat');
  return (
    <div>
 

      <div className="flex flex-1">
        {/* Sidebar remains fixed */}
        <Navbar />

        {/* Main content scrolls */}
        <section className="flex-1 overflow-auto">
          <Outlet />
        </section>
      </div>
        
      {shouldDisplayFooter && <Footer />}

    

      
    </div>
  )
}

export default RootLayout
