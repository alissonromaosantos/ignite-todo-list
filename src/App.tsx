import { ChangeEvent, FormEvent, InvalidEvent, useState } from 'react';
import styles from './App.module.css';
import { Header } from "./components/Header";
import plus from './assets/plus.svg';
import { Task } from './components/Task';
import clipboard from './assets/clipboard.svg';
import { v4 as uuidv4 } from 'uuid';
import { notify } from './utils/notify';

export interface Todo {
  id: string;
  description: string;
  isCompleted: boolean;
}

export function App() {
  const todosStorage = JSON.parse(localStorage.getItem('todos') ?? '[]');  

  const [todos, setTodos] = useState<Todo[]>(todosStorage);
  const [newTask, setNewTask] = useState('');

  function handleNewTaskChange(e: ChangeEvent<HTMLInputElement>) {
    e.target.setCustomValidity('');

    setNewTask(e.target.value);
  }

  function handleCreateTask(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!newTask) {
      notify('O campo tarefa não pode ser vazio!', 'error');
      return;
    }

    const newTaskCreated = {
      id: uuidv4(),
      description: newTask,
      isCompleted: false
    };

    const localTodos = [ newTaskCreated, ...todos];
    setTodos(localTodos);
    notify('Tarefa criada com sucesso!', 'success');
    setNewTask('');

    localStorage.setItem('todos', JSON.stringify(localTodos));
  }

  function handleNewTaskInvalid(e: InvalidEvent<HTMLInputElement>) {
    e.target.setCustomValidity('O campo tarefa deve ter no mínimo 4 e no máximo 100 caracteres!');

    notify('O campo tarefa deve ter no mínimo 4 e no máximo 100 caracteres!', 'error');
  }

  const isNewTaskEmpty = newTask.length === 0;

  return (
    <div className={styles.app}>
      <Header />
      <div className={styles.containerAddTodo}>
        <form onSubmit={handleCreateTask}>
          <input 
            type="text" 
            name="task" 
            id="task" 
            minLength={4}
            maxLength={100}
            value={newTask}
            onChange={handleNewTaskChange}
            onInvalid={handleNewTaskInvalid}
            placeholder="Adicione uma nova tarefa" 
            required
          />

          <button type="submit" disabled={isNewTaskEmpty}>
            Criar
            <img 
              src={plus} 
              alt="Ícone do símbolo matemático de adição para adicionar uma nova tarefa" 
            />
          </button>
        </form>
      </div>
      <div className={styles.containerTodos}>
        <div className={styles.infos}>
          <div className={styles.tasksCreated}>
            <strong>Tarefas criadas</strong>
            <span>{todos.length}</span>
          </div>
          <div className={styles.tasksDone}>
            <strong>Concluídas</strong>
            <span>
              {todos.length > 0 && todos.filter(todo => todo.isCompleted).length > 0
                ? `${todos.filter(todo => todo.isCompleted).length} de ${todos.length}` 
                : 0
              } 
            </span>
          </div>
        </div>
        {todos.length > 0 
          ?
            <div className={styles.todos}>
              {todos.map(todoItem => {
                return (
                  <Task 
                    key={todoItem.id} 
                    todo={todoItem}
                    todos={todos}
                    setTodos={setTodos}
                  />
                );
              })}
            </div>
          :
            <div className={styles.todosEmpty}>
              <img 
                src={clipboard} 
                alt="Imagem simbolizando um documento" 
              />
              <span>Você ainda não tem tarefas cadastradas</span>
              <p>Crie tarefas e organize seus itens a fazer</p>
            </div>
        }
      </div>
    </div>
  )
}
