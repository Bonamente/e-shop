import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/redux-hooks';
import Breadcrumbs from '../../components/breadcrumbs/Breadcrumbs';
import ProductForm from '../../components/admin/product-form/ProductForm';
import AdminActionBtn from '../../components/admin/action-buttons/AdminActionBtn';
import Select from '../../components/admin/select/Select';
import { removeProduct } from '../../store/products/asyncActions';
import { Product } from '../../store/products/types';
import styles from './AdminPage.module.css';

export type ActionType = 'add' | 'edit' | 'remove' | null;
export type SelectedProduct = Product | null;

const AdminPage = () => {
  const dispatch = useAppDispatch();
  const { products } = useAppSelector((state) => state.products);
  const [activeBtn, setActiveBtn] = useState<ActionType | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const handleClick = (actionType: ActionType) => {
    setActiveBtn(actionType);
  };

  const handleSelect = (productId: string | null) => {
    const handlingProduct = products.find(
      (product) => product.id === Number(productId)
    );

    if (handlingProduct) {
      setSelectedProduct(handlingProduct);
    }
  };

  const handleRemoveProduct = () => {
    if (selectedProduct) {
      dispatch(removeProduct(selectedProduct.id));
    }

    setActiveBtn(null);
    setSelectedProduct(null);
  };

  const handleCancel = () => {
    setActiveBtn(null);
    setSelectedProduct(null);
  };

  return (
    <div className={`${styles.admin} container`}>
      <Breadcrumbs page="Страница администратора" />

      <h1 className={styles.title}>Панель управления</h1>
      <div className={styles.actions}>
        <AdminActionBtn
          actionType="add"
          handleClick={handleClick}
          isDisabled={activeBtn !== null && activeBtn !== 'add'}
        />
        <AdminActionBtn
          actionType="edit"
          handleClick={handleClick}
          isDisabled={activeBtn !== null && activeBtn !== 'edit'}
        />
        <AdminActionBtn
          actionType="remove"
          handleClick={handleClick}
          isDisabled={activeBtn !== null && activeBtn !== 'remove'}
        />
      </div>

      {activeBtn === 'add' && !selectedProduct ? (
        <ProductForm
          resetActiveBtn={handleClick}
          deselectProduct={handleSelect}
        />
      ) : null}

      {activeBtn === 'edit' && !selectedProduct ? (
        <div className={styles.selectWrapper}>
          <Select products={products} handleSelect={handleSelect} />
        </div>
      ) : null}

      {activeBtn === 'edit' && selectedProduct ? (
        <ProductForm
          product={selectedProduct}
          resetActiveBtn={handleClick}
          deselectProduct={handleCancel}
        />
      ) : null}

      {activeBtn === 'remove' && !selectedProduct ? (
        <div className={styles.selectWrapper}>
          <Select products={products} handleSelect={handleSelect} />
        </div>
      ) : null}

      {activeBtn === 'remove' && selectedProduct ? (
        <div className={styles.removeBlock}>
          <h3 className={styles.removingProduct}>{selectedProduct.name}</h3>
          <div className={styles.btnWrapper}>
            <button
              className={styles.confirmBtn}
              type="button"
              onClick={handleRemoveProduct}
            >
              Подтвердить удаление
            </button>
            <button
              className={styles.cancelBtn}
              type="button"
              onClick={handleCancel}
            >
              Отменить
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default AdminPage;
