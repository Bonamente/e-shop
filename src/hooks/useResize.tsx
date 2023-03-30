import { useEffect, useState } from 'react';

const useResize = () => {
  const [isSmallScreen, setIsSmallScreen] = useState(
    () => window.innerWidth < 767
  );

  useEffect(() => {
    if (window.innerWidth > 767) {
      setIsSmallScreen(false);
    } else if (window.innerWidth < 767) {
      setIsSmallScreen(true);
    }
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 767) {
        setIsSmallScreen(false);
      } else if (window.innerWidth < 767) {
        setIsSmallScreen(true);
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return [isSmallScreen];
};

export default useResize;
