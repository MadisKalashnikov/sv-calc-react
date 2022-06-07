import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faXmark } from "@fortawesome/free-solid-svg-icons"
export default function Sidebar(props) {

    const numberElements = props.numbers.map((number, index) => (
        <div key={number.id} >
            <div className="number">
                <button className="btn-delete" onClick={() => props.deleteNumber(number.id)}>
                    <FontAwesomeIcon icon={faXmark} className="icon-delete"/>
                </button>
                <p>{number.text}</p>
                <p>{number.value} üh</p>
                <p>{number.valueOne}g</p>
                <p>{number.valueTwo}sv</p>
            </div>
        </div>
    ))
    const sidebarClasses = document.querySelector(".sidebar")
    const closeIconClasses = document.querySelector(".close-icon")
    function closeSide() {
        sidebarClasses.classList.toggle("show-sidebar")
        closeIconClasses.classList.toggle("show-icon")
    }
    return (
        <nav className="sidebar">
            <div className="sum-text-div">
                <p className="sum-text">Kokku {props.sum} üh</p>
            </div>
            <div id="numbers-table">
                {numberElements}
            </div>
            <button onClick={props.deleteAll} className="delete-all">Kustuta kõik</button>
            <FontAwesomeIcon icon={faXmark} onClick={closeSide} className="close-icon"/>
        </nav> 
    )
}