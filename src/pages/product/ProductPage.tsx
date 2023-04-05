import { useParams } from 'react-router-dom';
import { useState } from 'react';
import { useAppSelector } from '../../hooks/redux-hooks';
import useResize from '../../hooks/useResize';
import Breadcrumbs from '../../components/breadcrumbs/Breadcrumbs';
import AmountButtons from '../../components/buttons/amount-btns/AmountButtons';
import AddToCartBtn from '../../components/buttons/addToCart-btn/AddToCartBtn';
import PriceListBtn from '../../components/buttons/priceList-btn/PriceListBtn';
import ProductSize from '../../components/product-size/ProductSize';
import { careTypeMap } from '../../utils/constants';
import type { CareTypeMap } from '../../utils/constants';
import styles from './ProductPage.module.css';

const ProductPage = () => {
  const { id } = useParams();
  const [isSmallScreen] = useResize();
  const { products } = useAppSelector((state) => state.products);
  const product = products.find((p) => p.id === Number(id));

  const [isDescExpanded, setIsDescExpanded] = useState(false);
  const [isCharacteristicsExpanded, setIsCharacteristicsExpanded] =
    useState(false);
  const [amount, setAmount] = useState(1);

  const increase = () => {
    setAmount((oldAmount) => oldAmount + 1);
  };

  const decrease = () => {
    setAmount((oldAmount) => {
      let tempAmount = oldAmount - 1;
      if (tempAmount < 1) {
        tempAmount = 1;
      }

      return tempAmount;
    });
  };

  const handleExpand = (target: 'desc' | 'characteristics') => {
    if (target === 'desc') {
      setIsDescExpanded(!isDescExpanded);
    } else {
      setIsCharacteristicsExpanded(!isCharacteristicsExpanded);
    }
  };

  if (!product) {
    return <h2>Произошла ошибка. Попробуйте перезагрузить страницу</h2>;
  }

  const {
    barcode,
    brand,
    careType,
    manufacturer,
    name,
    description,
    sizeType,
    size,
    price,
    imgUrl,
  } = product;

  return (
    <div className={`${styles.productPage} container`}>
      <Breadcrumbs product={name} />

      <section className={styles.product}>
        <div className={styles.imageWrapper}>
          <img className={styles.image} src={imgUrl} alt="name" />
        </div>
        <div className={styles.info}>
          <p className={styles.availability}>В наличии</p>
          <h1 className={styles.title}>{name}</h1>

          {isSmallScreen ? null : (
            <ProductSize size={size} sizeType={sizeType} />
          )}

          <div className={styles.userActions}>
            <div className={styles.priceWrapper}>
              <p className={styles.price}>{price} ₸</p>
              <AmountButtons
                increase={increase}
                decrease={decrease}
                amount={amount}
              />
            </div>

            <div className={styles.btnWrapper}>
              <AddToCartBtn
                size="large"
                product={product}
                amount={amount}
                shouldNavigate
              />
            </div>

            {isSmallScreen ? null : <div className={styles.break} />}

            <button className={styles.shareBtn} type="button" disabled>
              <span className="visually-hidden">Поделиться ссылкой</span>
            </button>

            {isSmallScreen ? <div className={styles.break} /> : null}

            <div className={styles.promo}>
              <p className={styles.promoText}>
                При покупке от{' '}
                <span className={styles.promoValue}>10 000 ₸</span> бесплатная{' '}
                <br />
                доставка по Кокчетаву и области
              </p>
            </div>

            {isSmallScreen ? <div className={styles.break} /> : null}

            <PriceListBtn type="text" />
          </div>

          <ul className={styles.details}>
            <li className={styles.detailsItem}>
              <p className={styles.detailsText}>
                Производитель: <span>{manufacturer}</span>
              </p>
            </li>
            <li className={styles.detailsItem}>
              <p className={styles.detailsText}>
                Бренд: <span>{brand}</span>
              </p>
            </li>
            <li className={styles.detailsItem}>
              <p className={styles.detailsText}>
                Артикул: <span>{String(barcode).slice(-6)}</span>
              </p>
            </li>
            <li className={styles.detailsItem}>
              <p className={styles.detailsText}>
                Штрихкод: <span>{barcode}</span>
              </p>
            </li>
          </ul>

          <div
            className={`${styles.description} ${
              isDescExpanded ? styles.expanded : ''
            }`}
          >
            <button
              className={styles.descriptionToggler}
              type="button"
              onClick={() => handleExpand('desc')}
            >
              Описание
              <span
                className="checkboxTogglerIcon"
                style={{
                  width: '7px',
                  height: '7px',
                  marginLeft: '6px',
                  transform: `${
                    isDescExpanded ? 'rotate(180deg)' : 'rotate(0deg)'
                  }`,
                }}
              >
                <img src="icons/arrow-down.svg" role="presentation" alt="" />
              </span>
            </button>

            <p className={styles.descriptionText}>{description}</p>
          </div>

          <div
            className={`${styles.characteristics} ${
              isCharacteristicsExpanded ? styles.expanded : ''
            }`}
          >
            <button
              className={styles.characteristicsToggler}
              type="button"
              onClick={() => handleExpand('characteristics')}
            >
              Характеристики
              <span
                className="checkboxTogglerIcon"
                style={{
                  width: '7px',
                  height: '7px',
                  marginLeft: '6px',
                  transform: `${
                    isCharacteristicsExpanded
                      ? 'rotate(180deg)'
                      : 'rotate(0deg)'
                  }`,
                }}
              >
                <img src="icons/arrow-down.svg" role="presentation" alt="" />
              </span>
            </button>

            <ul className={styles.characteristicsList}>
              <li className={styles.characteristicsItem}>
                <p className={styles.characteristicsText}>
                  Назначение:{' '}
                  <span>{careTypeMap[careType[0] as keyof CareTypeMap]}</span>
                </p>
              </li>
              <li className={styles.characteristicsItem}>
                <p className={styles.characteristicsText}>
                  Тип: <span>{brand}</span>
                </p>
              </li>
              <li className={styles.characteristicsItem}>
                <p className={styles.characteristicsText}>
                  Производитель: <span>{manufacturer}</span>
                </p>
              </li>
              <li className={styles.characteristicsItem}>
                <p className={styles.characteristicsText}>
                  Бренд: <span>{brand}</span>
                </p>
              </li>

              <li className={styles.characteristicsItem}>
                <p className={styles.characteristicsText}>
                  Артикул: <span>{String(barcode).slice(-6)}</span>
                </p>
              </li>

              <li className={styles.characteristicsItem}>
                <p className={styles.characteristicsText}>
                  Штрихкод: <span>{barcode}</span>
                </p>
              </li>
              <li className={styles.characteristicsItem}>
                <p className={styles.characteristicsText}>
                  {sizeType === 'weight' ? 'Вес:' : 'Объем:'}{' '}
                  <span>{size}</span>
                  <span>{sizeType === 'weight' ? 'г' : 'мл'}</span>
                </p>
              </li>
              <li className={styles.characteristicsItem}>
                <p className={styles.characteristicsText}>
                  Кол-во в коробке: <span>2</span>
                </p>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProductPage;
