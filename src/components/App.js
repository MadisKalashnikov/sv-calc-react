import { nanoid } from 'nanoid';
import { useEffect, useState } from 'react';
import '../App.css';
import InputNumber from './InputNumber';
import Sidebar from './Sidebar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars} from '@fortawesome/free-solid-svg-icons';
export default function App() {
  // state for inputs
  const [inputs, setInputs] = useState({
    one: 0,
    two: 0,
    three: 0
  })
  // on change set values equal to input values
  function change(event) {
    const {name, value} = event.target
    setInputs(prevState => ({
      ...prevState,
      [name]: value
    }))
  }
  // state for sum
  const [sum, setSum] = useState(0)
  // setsum when inputs change
  useEffect(() => {
      const {one, two, three} = inputs
      setSum((one * two * three / 1000).toFixed(2))
  }, [inputs])
  // state for tablearr
  const [tableArr, setTableArr] = useState([])
  // add to table conditions
  function toTable() {
    const newNumber = {
      id: nanoid(),
      value: sum,
      text: textState,
      valueOne: inputs.one,
      valueTwo: inputs.two
    }
    if (sum < 0.01) {
      setTableArr(prevState => [...prevState])
    } else {
      setTableArr(prevState => [...prevState, newNumber])
      setTimeout(() => {
        textElement.classList.toggle("show-success")
      }, 1000);
      textElement.classList.toggle("show-success")
    }
  }
  const [textState, setTextState] = useState()
  function textInput(event) {
    setTextState(event.target.value)
  }

  // state for the whole sum
  const [allSum, setAllSum] = useState(0)
  // get only number values from tableArr
  const tableNumbers = tableArr.map(number => parseFloat(number.value))
  // when tablearr and tablenumbers change, set the whole sum equal to sum of all numbers in table
  useEffect(() => { 
    setAllSum(tableNumbers.reduce((a, b) => a + b, 0).toFixed(2))
  }, [tableArr, tableNumbers])

  // delete number from list
  function deleteNumber(index) {
    setTableArr(prevState => prevState.filter(item => item.id !== index))
  }
  function deleteAllNumbers() {
    if (tableArr.length > 0) {
      setTableArr([])
    } else {
      setTableArr(prevState => [...prevState])
    }
    
  }
  function openSide() {
    const sidebarClasses = document.querySelector(".sidebar")
    const closeIconClasses = document.querySelector(".close-icon")
    sidebarClasses.classList.toggle("show-sidebar")
    closeIconClasses.classList.toggle("show-icon")
  }
  const textElement = document.querySelector(".success")
  return (
    <div className='main'>
      <FontAwesomeIcon icon={faBars} className="open-icon" onClick={openSide} />
      <Sidebar 
        numbers={tableArr}
        sum={allSum}
        deleteNumber={deleteNumber}
        text={tableArr.text}
        deleteAll={deleteAllNumbers}
        valueOne={inputs.one}
        valueTwo={inputs.two}
      />
      <p>Kalkulaator</p>
      <InputNumber 
        name="one"
        value={inputs.one}
        change={change}
        placeholder="Grammid"
      />
      <InputNumber 
        name="two"
        value={inputs.two}
        change={change}
        placeholder="Süsivesikud"
      />
      <p>Korruta</p>
      <InputNumber 
        name="three"
        value={inputs.three}
        change={change}
      />
      <p className='food-text'>Leivaühikud <span className='bold'>{sum}</span></p>
      <p>Toit</p>
      <input onChange={textInput} type="text" id='food-input'></input>
      <button onClick={toTable} id="to-table">Lisa tabelisse</button>
      <p className='success'>Lisatud tabelisse!</p>
      
    </div>
  );
}