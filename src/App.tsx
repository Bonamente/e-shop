import { Outlet } from 'react-router-dom';
import Header from './components/header/Header';
import Modal from './components/modal/Modal';
import Footer from './components/footer/Footer';

const App = () => {
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
      <Modal />
    </>
  );
};

export default App;
