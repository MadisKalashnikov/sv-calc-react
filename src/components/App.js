import { nanoid } from 'nanoid';
import { useEffect, useState } from 'react';
import '../App.css';
import InputNumber from './InputNumber';
import Sidebar from './Sidebar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars} from '@fortawesome/free-solid-svg-icons';
export default function App() {
  // states
  const [inputsState, setInputsState] = useState({
    numOne: 0,
    numTwo: 0,
    numThree: 0,
    strFood: ""
  })
  const [sumState, setSumState] = useState(0)
  const [allSumState, setAllSumState] = useState(0)
  const [tableArrState, setTableArrState] = useState([])
  // on input change set inputs equal to value in input
  const onChange = (event) => {
    const {name, value} = event.target
    setInputsState(prevState => ({
      ...prevState,
      [name]: value
    }))
  }
  // set sum when inputs change
  useEffect(() => {
      const {numOne, numTwo, numThree} = inputsState
      setSumState(((numOne * numTwo * numThree) / 1000).toFixed(2))
  }, [inputsState])
  
  // add to table conditions
  const resultToTableArr = () => {
    if (sumState < 0.01) return;
    const newNumber = {
      id: nanoid(),
      value: sumState,
      numOne: inputsState.numOne,
      numTwo: inputsState.numTwo,
      text: inputsState.strFood
    }
    // push new number into tableArr
    setTableArrState(prevState => [...prevState, newNumber])
    // show textElement for 1 second after successful newNumber
    const textElement = document.querySelector(".success")
    setTimeout(() => {
      textElement.classList.toggle("show-success")
    }, 1000);
    textElement.classList.toggle("show-success")
  }
  // get only number values from tableArr
  const resultsArr = tableArrState.map((number) => parseFloat(number.value))
  // when results change, set the sumState equal to sum of all numbers in resultsArr
  useEffect(() => {
    setAllSumState(resultsArr.reduce((a, b) => a + b, 0).toFixed(2))
  }, [resultsArr])

  const openSide = () => {
    const sidebarClasses = document.querySelector(".sidebar")
    sidebarClasses.classList.toggle("show-sidebar")
  }
  // delete result from tableArr
  const deleteResult = (index) => {
    if (index < 0) return;
    setTableArrState(prevState => prevState.filter(item => item.id !== index))
  }
  // delete all results from tableArr
  const deleteAllResults = () => {
    if (tableArrState.length > 0) {
      setTableArrState([])
    } else {
      setTableArrState(prevState => [...prevState])
    }
  }
  return (
    <div className='main'>
      <FontAwesomeIcon icon={faBars} className="open-icon" onClick={openSide} />
      <Sidebar
        text={tableArrState.text}
        sum={allSumState}
        results={tableArrState}
        numOne={inputsState.numOne}
        numTwo={inputsState.numTwo}
        deleteResult={deleteResult}
        deleteAllResults={deleteAllResults}
        
      />
      <p>Kalkulaator</p>
      <InputNumber 
        name="numOne"
        value={inputsState.one}
        change={onChange}
        placeholder="Grammid"
      />
      <InputNumber 
        name="numTwo"
        value={inputsState.numTwo}
        change={onChange}
        placeholder="Süsivesikud"
      />
      <p>Korruta</p>
      <InputNumber 
        name="numThree"
        value={inputsState.numThree}
        change={onChange}
      />
      <p>Leivaühikud <span className='bold'>{sumState}</span></p>
      <p>Toit</p>
      <input onChange={onChange} type="text" id="food-input"
      name="strFood"></input>
      <button onClick={resultToTableArr} id="to-table">Lisa tabelisse</button>
      <p className='success'>Lisatud tabelisse!</p>
      
    </div>
  );
}