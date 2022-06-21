import './App.css';
import ReactColorPicker from './components/ColorPicker';
import { useState } from 'react'
function App() {
  const onChangeHandel = (color) => {
    console.log(color)
    //doing something when value changing
  }
  return (
    <div className="App">
      <ReactColorPicker onChange={onChangeHandel}/>
    </div>
  );
}

export default App;
