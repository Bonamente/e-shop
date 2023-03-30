import Navbar from '../navbar/Navbar';
import MobileNavbar from '../mobile-navbar/MobileNavbar';
import useResize from '../../hooks/useResize';

const Header = () => {
  const [isSmallScreen] = useResize();

  return (
    <header className="main-header">
      {isSmallScreen ? <MobileNavbar /> : <Navbar />}
    </header>
  );
};

export default Header;
