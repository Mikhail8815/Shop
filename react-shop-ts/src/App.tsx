import './App.css'
import { useAppSelector } from './hooks';

function App() {
 const products = useAppSelector(state => state.products.items);
  console.log(products); // Должен быть [] или загруженные товары

  return <div>Проверка консоли</div>;
}

export default App
