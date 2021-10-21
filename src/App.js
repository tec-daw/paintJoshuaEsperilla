import logo from './logo.svg';
import './App.css';
import Toolbox from './Toolbox.js';
import Canvas from './Canvas.js';
import html2canvas from 'html2canvas';
import React, {useState, useRef} from 'react';


function App() {

  let canva = [];

  for (let i = 1; i<=100; i++){
    canva.push({ id: i, pxcolor: '#FFFF', height: '40px', width: '40px' });
  }

  
  const [grid, setGrid] = useState(canva);
  const [borders, setBorders] = useState(true);
  const [pcolor, setPColor] = useState('white'); 
  const [ispainted, setIsPainted] = useState(false); 
  const [isdisabled, setIsDisabled] = useState(false);
  const [ispressed, setIsPressed] = useState(false);

  const img = useRef();
  const draw = useRef();

  function handlePrint () {

    if (ispainted === true){
      setBorders(false);
      setIsDisabled(true);
      setTimeout(() =>{
        html2canvas(draw.current).then(canvas =>{
          img.current.innerHTML = "";
          img.current.appendChild(canvas);
        });
      }, 10)
    
    } else {
        alert("¡Tu dibujo sigue vacio!")
      }
    }

  return (
    <div className="App">
      <Toolbox
        grid = {grid}
        setGrid = {setGrid}
        borders = {borders}
        setBorders = {setBorders}
        ispainted = {ispainted}
        setIsPainted = {setIsPainted}
        isdisabled = {isdisabled}
        setIsDisabled = {setIsDisabled}
        pcolor = {pcolor}
        setPColor = {setPColor}
        canva = {canva}
        handlePrint ={handlePrint}
      /> 
      <Canvas
        pcolor = {pcolor}
        setPColor = {setPColor}
        ispainted = {ispainted}
        setIsPainted = {setIsPainted}
        grid = {grid}
        setGrid = {setGrid}
        ispressed = {ispressed}
        borders = {borders}
        setBorders = {setBorders}
        setIsPressed = {setIsPressed}
        isdisabled = {isdisabled}
        setIsDisabled = {setIsDisabled}
        draw = {draw}
        img = {img}
      />
      {console.log(draw)}
    </div>
  );
}

export default App;
