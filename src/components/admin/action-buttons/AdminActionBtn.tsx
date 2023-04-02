import type { ActionType } from '../../../pages/admin/AdminPage';
import styles from './AdminActionBtn.module.css';

const nameMapping = {
  add: 'Добавить товар',
  edit: 'Редактировать',
  remove: 'Удалить товар',
};

type AdminActionBtnProps = {
  actionType: ActionType;
  handleClick: (arg: ActionType) => void;
  isDisabled: boolean;
};

const AdminActionBtn: React.FC<AdminActionBtnProps> = ({
  actionType,
  handleClick,
  isDisabled,
}) => {
  return (
    <button
      className={`${styles.actionBtn} ${actionType && styles[actionType]} ${
        isDisabled ? styles.disabled : ''
      }`}
      type="button"
      onClick={() => handleClick(actionType)}
      disabled={isDisabled}
    >
      {actionType && nameMapping[actionType]}
    </button>
  );
};

export default AdminActionBtn;
