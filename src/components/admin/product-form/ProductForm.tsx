/* eslint-disable react/destructuring-assignment */
/* eslint-disable jsx-a11y/label-has-associated-control */
import { useState } from 'react';
import { Product } from '../../../store/products/types';
import { addProduct, editProduct } from '../../../store/products/asyncActions';
import { useAppDispatch } from '../../../hooks/redux-hooks';
import MultiSelect from '../multi-select/MultiSelect';
import type { ActionType } from '../../../pages/admin/AdminPage';
import styles from './ProductForm.module.css';

export type Option = {
  id: string;
  title: string;
};

export type IdObj = {
  id: string;
};

const careTypes: Option[] = [
  { id: 'body', title: 'Уход за телом' },
  { id: 'hand', title: 'Уход за руками' },
  { id: 'foot', title: 'Уход за ногами' },
  { id: 'face', title: 'Уход за лицом' },
  { id: 'hair', title: 'Уход за волосами' },
  { id: 'tanning', title: 'Средства для загара' },
  { id: 'shaving', title: 'Средства для бритья' },
  { id: 'gift', title: 'Подарочные наборы' },
  { id: 'hygiene', title: 'Гигиеническая продукция' },
  { id: 'oralHygiene', title: 'Гигиена полости рта' },
  { id: 'paper', title: 'Бумажная продукция' },
];

type ProductFormProps = {
  product?: Product | undefined;
  resetActiveBtn: (arg: ActionType) => void;
  deselectProduct: (arg: string | null) => void;
};

const ProductForm: React.FC<ProductFormProps> = ({
  product,
  resetActiveBtn,
  deselectProduct,
}) => {
  const dispatch = useAppDispatch();

  const initialCareTypes = product ? product.careType : [];
  const [selectedCareTypes, setSelectedCareTypes] =
    useState<string[]>(initialCareTypes);

  const [hasError, setHasError] = useState(false);

  // for demo use only
  const productId = product
    ? product.id
    : Math.floor(1000 + Math.random() * 9000);

  const toggleOption = ({ id }: IdObj) => {
    setSelectedCareTypes((prevSelected) => {
      const newArray = [...prevSelected];

      if (newArray.includes(id)) {
        return newArray.filter((item) => item !== id);
      }

      newArray.push(id);
      return newArray;
    });
  };

  const handleCancel = () => {
    resetActiveBtn(null);
    deselectProduct(null);
  };

  const handleSubmit = (e: React.BaseSyntheticEvent) => {
    e.preventDefault();

    const formData = new FormData(e.target);

    const newProduct: Product = {
      id: productId,
      barcode: Number(formData.get('barcode') as string),
      brand: formData.get('brand') as unknown as string,
      manufacturer: formData.get('manufacturer') as unknown as string,
      name: formData.get('name') as unknown as string,
      description: formData.get('description') as unknown as string,
      careType: selectedCareTypes,
      sizeType: formData.get('sizeType') as unknown as 'volume' | 'weight',
      size: Number(formData.get('size') as unknown as string),
      price: Number(formData.get('price') as unknown as string),
      imgUrl: formData.get('imgUrl') as unknown as string,
    };

    if (selectedCareTypes.length === 0) {
      setHasError(true);
      return;
    }

    setHasError(false);

    if (product) {
      dispatch(editProduct(newProduct));
      resetActiveBtn(null);
      deselectProduct(null);
    } else {
      dispatch(addProduct(newProduct));
      resetActiveBtn(null);
      deselectProduct(null);
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.wrapper}>
        <div className={styles.column}>
          <label className={styles.label} htmlFor="id">
            Id
          </label>
          <input
            className={styles.input}
            id="id"
            name="id"
            defaultValue={productId}
            type="text"
            readOnly
            disabled
          />

          <label className={styles.label} htmlFor="barcode">
            Штрих код:
          </label>
          <input
            className={styles.input}
            id="barcode"
            name="barcode"
            defaultValue={product ? product.barcode : ''}
            type="text"
            required
          />

          <label className={styles.label} htmlFor="brand">
            Бренд:
          </label>
          <input
            className={styles.input}
            id="brand"
            name="brand"
            defaultValue={product ? product.brand : ''}
            type="text"
            required
          />

          <label className={styles.label} htmlFor="manufacturer">
            Производитель:
          </label>
          <input
            className={styles.input}
            id="manufacturer"
            name="manufacturer"
            defaultValue={product ? product.manufacturer : ''}
            type="text"
            required
          />

          <label className={styles.label} htmlFor="name">
            Название:
          </label>
          <input
            className={styles.input}
            id="title"
            name="name"
            defaultValue={product ? product.name : ''}
            type="text"
            required
          />

          <label className={styles.label} htmlFor="description">
            Описание:
          </label>
          <input
            className={styles.input}
            id="description"
            name="description"
            defaultValue={product ? product.description : ''}
            type="text"
            required
          />

          <label className={styles.label} htmlFor="sizeType">
            Тип размера:
          </label>
          <select
            className={styles.input}
            id="sizeType"
            name="sizeType"
            defaultValue={
              product && product.sizeType === 'volume' ? 'volume' : 'weight'
            }
            required
          >
            <option value="volume">Объем</option>
            <option value="weight">Вес</option>
          </select>

          <label className={styles.label} htmlFor="size">
            Размер:
          </label>
          <input
            className={styles.input}
            id="size"
            name="size"
            defaultValue={product ? product.size : ''}
            type="text"
            required
          />

          <label className={styles.label} htmlFor="price">
            Цена:
          </label>
          <input
            className={styles.input}
            id="price"
            name="price"
            defaultValue={product ? product.price : ''}
            type="text"
            required
          />

          <label className={styles.label} htmlFor="imgUrl">
            Ссылка на изображение:
          </label>
          <input
            className={styles.input}
            id="imgUrl"
            name="imgUrl"
            defaultValue={product ? product.imgUrl : ''}
            type="text"
            required
            placeholder="/images/1.jpg"
          />
        </div>
        <div className={styles.column}>
          <MultiSelect
            options={careTypes}
            selected={selectedCareTypes}
            toggleOption={toggleOption}
          />
        </div>
      </div>

      {hasError ? (
        <p className={styles.errorMessage}>Пожалуйста, выберите тип(ы) ухода</p>
      ) : (
        ''
      )}

      <button className={styles.submitBtn} type="submit">
        Сохранить
      </button>

      <button className={styles.cancelBtn} type="button" onClick={handleCancel}>
        Отменить
      </button>
    </form>
  );
};

export default ProductForm;
