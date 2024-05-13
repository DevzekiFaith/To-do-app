import  {FC} from 'react';
import TodoList from './TodoList/TodoList';
import Header from './Component/Header/Header';
import Footer from './Component/Footer/Footer';

const App: FC = () => {
  return (
    <div className="App">
      <Header/>
      <TodoList />
      <Footer/>
    </div>
  );
};

export default App;