import styles from './styles.module.css';
import logo from '../../assets/logo.svg';

export function Header() {
  return (
    <header className={styles.header}>
      <img src={logo} alt="Logo Todo List" />
    </header>
  );
}