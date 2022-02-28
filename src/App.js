import React, { useState} from 'react';
import Todos from './components/Todos';

function App() {
  const [todo, setTodo] = useState({});
  const inputElement = React.useRef(0);
  console.log('render main')

  // ужасный код с current.value и defaultvalue но зато без useState и ререндера на инпуте )
  const getData = React.useCallback(async () => {
      if(inputElement.current.value === inputElement.current.defaultValue){
            return 
      } 
      const todo =  await getAPi(inputElement.current.value);
      inputElement.current.defaultValue = inputElement.current.value
      setTodo(todo);
  }, [inputElement.current.value]);


  const getAPi = React.useCallback(async(id) => {
    const responce = await fetch(
      `https://jsonplaceholder.typicode.com/todos/${id}`
    );
    const data = await responce.json();
    return data
  }, [])


  React.useEffect(async()=>{
    const todo = await getAPi(1);
    setTodo(todo)
  }, []);
  

  return (
    <>
      <h3>Memo Data</h3>
      <label>
        Max todos
        <input
          type={'number'}
          ref={inputElement}
          max={'10'}
          min={'1'}
          defaultValue={1}
        />
      </label>

      <button onClick={getData}>get Data</button>
      <Todos todo={todo.title} />
    </>
  );
}

export default App;
