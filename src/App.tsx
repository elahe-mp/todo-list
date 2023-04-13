import { Helmet } from 'react-helmet';
import './App.css';
import TodoListPage from './Pages/TodoListPage';

function App() {
  return (
   <>
      <Helmet>
        <title>TodoList | MiniApp </title>
      </Helmet>

      <TodoListPage />
    </>
  );
}

export default App;
