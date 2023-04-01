import { useEffect } from 'react';

const useDisableBodyScroll = (isModalOpen: boolean) => {
  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isModalOpen]);
};

export default useDisableBodyScroll;
