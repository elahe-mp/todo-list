import { Helmet } from 'react-helmet';
import './App.css';
import TodoForm from './AppComponents/TodoForm';

function App() {
  return (
   <>
      <Helmet>
        <title>TodoList | MiniApp </title>
      </Helmet>
      <h1>Todo List</h1>
      <TodoForm/>
    </>
  );
}

export default App;
