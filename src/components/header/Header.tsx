import { useEffect, useState } from 'react';
import Navbar from '../navbar/Navbar';
import MobileNavbar from '../mobile-navbar/MobileNavbar';

const Header = () => {
  const [showMobileNavbar, setShowMobileNavbar] = useState(false);

  useEffect(() => {
    if (window.innerWidth > 767) {
      setShowMobileNavbar(false);
    } else if (window.innerWidth < 767) {
      setShowMobileNavbar(true);
    }
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 767) {
        setShowMobileNavbar(false);
      } else if (window.innerWidth < 767) {
        setShowMobileNavbar(true);
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <header className="main-header">
      {showMobileNavbar ? <MobileNavbar /> : <Navbar />}
    </header>
  );
};

export default Header;
