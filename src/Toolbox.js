import "./App.js";
import './App.css';



const colors = ['white', 'black', 'gray', '#880015', '#ED1C24', '#FF7F27', '#FFF200', '#22B14C', '#00A2E8', '#3F48CC', '#A349A4'];

function Toolbox(props) {

  function handleSelectedColor(e){
    props.setPColor(e.target.name);
  }

  function newGame(e){
    props.setGrid(props.canva); 
    props.setIsPainted(false);
    props.setBorders(true);
    props.setIsDisabled(false);
  }


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
        {colors.map((color) => {
          const isSelected = color === props.pcolor;
          const borderStyle = isSelected ? '3px solid #00F1C6' : '1px solid black';
            return (
              <div className="App" key={color}>

                <div id="palette" key={color}>
                  <button
                    className="palettebtns"
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


export default Toolbox;