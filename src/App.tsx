import { Helmet } from 'react-helmet';
import './App.css';
import TodoForm from './AppComponents/TodoForm';

function App() {
  return (
   <>
      <Helmet>
        <title>TodoList | MiniApp </title>
      </Helmet>
      <h1>Todo List page</h1>
      <TodoForm />
      <article className='list'>
      </article>
    </>
  );
}

export default App;
