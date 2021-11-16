import "./App.js";
import './App.css';
import imgdefault from './defaultdoggo.jpg';

import React from 'react';

function Canvas(props) {

	//Pinta cada cuadro cada que se haga click
	function handleSpaces(e) {
        //Cambia el estado para identificar que hay un dibujo
    	props.setIsPainted(true);
        //Recorre el grid y modifica el color de cada espacio al color seleccionado
    	props.setGrid(
    		props.grid.map(
            	(space) => {
                	if (space.id === Number(e.target.name))
                    	space.spacecolor = props.pcolor;
                	return space;
            	}
        	)
    	);
	}

	//Funcion para que se siga pintando al movel el mouse
    function keepPaint(e) {
        if ((props.ispressed)===false) return
        handleSpaces(e);
    }

    //Se ejecuta al presionar y mantener click
    function startPaint(e) {
        props.setIsPressed(true);
        handleSpaces(e);
    }

    //Se ejecuta cuando se deja de presionar el mouse
    function stopPaint() {
        props.setIsPressed(false);
    }

 	return (
 		<div id="drawing">
	        <div id="drawingPanel" ref={props.draw}>
	            <div id="spaces"
	                onClick={handleSpaces}
	                onMouseDown={startPaint}
	                onMouseUp={stopPaint}
	            >
	                {props.grid.map(
	                	(space) => {
	                    	return (
	                        	<button
	                            	name={space.id}
	                                key={space.id}
	                                onMouseOver={keepPaint}

	                                disabled={props.isdisabled}
	                                style={{
	                                    width: space.width,
	                                	height: space.height,
	                                    border: props.borders === true ? '1px solid #330040' : '0',
	                                    backgroundColor: space.spacecolor,
	                                    margin: '0px',
	                                    padding: '0px'
	                                }}
	                            >
	                            </button>
	                        );
	                    }
	                )}
	            </div>
	        </div>

	        <div id="resultImg">
	           <div ref={props.img}>
	                <img id="defaultImg" alt="¡Empieza tu dibujo!" src={imgdefault}></img>
	                <p id="defaultMessage">¡Empieza a dibujar!</p>
	            </div>
	        </div>
	    </div>
	);
}

export default Canvas;