import "./App.js";
import './App.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';


function Toolbox(props) {

  const [colorOptions, setColorOptions] = useState([]);
   const [load, setLoad] = useState("IDLE_ST");// estado de la toolbox

  function handleSelectedColor(e){
    props.setPColor(e.target.name);
  }

  function newGame(e){
    props.setGrid(props.canva); 
    props.setIsPainted(false);
    props.setBorders(true);
    props.setIsDisabled(false);
  }

function getColors() {

        //Peticion http a la API
        axios.get('https://www.colr.org/json/colors/random/11').then(response => { 
            setLoad("LOADING_ST"); //Pasa el estado de la paleta a "cargando"
            var newColors = [];

            for (let i = 0; i < 11; i++) {
                newColors.push("#" + response.data.colors[i].hex);
            }
            setColorOptions(newColors);
            setLoad("COMPLETE_ST"); //Pasa el estado de la paleta a "completo"
        }

        ).catch(() => {
            alert("Error");
            setLoad("ERROR_ST"); //Pone la paleta en estado de "error"
        })
    }

    //La función se ejecutará cada que que se reinicie la página
    useEffect(() => {
        getColors();
    }, []);

    //Si la paleta está cargando o en espera
    if (load === "IDLE_ST" || load === "LOADING_ST") {
        return (
            <p>Cargando</p>
        );
    } else if (load === "ERROR_ST") {
        return (
            <p>Error! Vuelve a cargar la pagina</p>

        );
    } else if (load === "COMPLETE_ST") {
      return (
        <div className="tools">

          <button 
            type="button" 
            id="newgamebtn" 
            onClick={newGame}
          > 
            New game 
          </button>

          <button 
            type="button" 
            id="printbtn" 
            onClick={props.handlePrint} 
          > 
            Print 
          </button>

          <p id="palettetext">Escoge un color: </p>

          <ul style={{ display: 'flex', listStyle: 'none' }}>

             <div className="App">
                    <div id="palette">
                      <input 
                        type="color"
                        className="colorpicker"
                        onChange = {e => props.setPColor(e.target.value)}
                        name = {props.pcolor}
                      >
                      </input>
                    </div>
                  </div>

                    {/* función que genera la paleta de colores */}
                    {colorOptions.map((color) => {
                        const isSelected = color === props.selectedColor;
                        const borderStyle = isSelected ? '3px groove #c90bfe' : '1px solid black';
                        return (

                            <div className="App" key={color}>

                                <div id="pallete" key={color}>
                                    <button
                                        className="palletbtns"
                                        type="button"
                                        key={color}
                                        name={color}
                                        onClick={handleSelectedColor}
                                        style={{
                                            width: '50px',
                                            height: '50px',
                                            border: borderStyle,
                                            background: color,
                                        }}>
                                    </button>

                                </div>
                            </div>
                        )

                    })}
                </ul>

        </div>
      );
    }

  
}


export default Toolbox;