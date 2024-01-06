import { Dispatch, SetStateAction } from 'react';
import styles from './styles.module.css';
import { Todo } from '../../App';

interface ModalProps {
  setOpenModal: Dispatch<SetStateAction<boolean>>;
  todo: Todo;
  onDeleteTask: (id: string) => void;
}

export function Modal({ setOpenModal, todo, onDeleteTask }: ModalProps) {
  return (
    <div className={styles.modalContainer}>
      <div className={styles.modal}>
        <h3>Tem certeza que deseja deletar esta tarefa?</h3>
        <div className={styles.buttonsContainer}>
          <button 
            className={styles.deleteButton}
            onClick={() => onDeleteTask(todo.id)}
          >
            Sim
          </button>
          <button 
            className={styles.cancelButton}
            onClick={() => setOpenModal(false)}
          >
            Não
          </button>
        </div>
      </div>
    </div>
  );
}