import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faXmark } from "@fortawesome/free-solid-svg-icons"
export default function Sidebar(props) {

    const resultElements = props.results.map((result, index) => (
        <div key={result.id} >
            <div className="result">
                <button className="result-delete-btn" onClick={() => props.deleteResult(result.id)}>
                    <FontAwesomeIcon icon={faXmark} className="icon-delete-btn"/>
                </button>
                <p>{result.text} {result.value} üh</p>
            </div>
            <div className="result-inputs">
                <p>{result.numOne}g {result.numTwo}sv</p>
            </div>
        </div>
    ))
    const sidebarClasses = document.querySelector(".sidebar")
    function closeSide() {
        sidebarClasses.classList.toggle("show-sidebar")
    }
    return (
        <nav className="sidebar">
            <div className="sidebar-sum">
                <p className="sum-text">Kokku {props.sum} üh</p>
            </div>
            <div id="results-table">
                {resultElements}
            </div>
            <button onClick={props.deleteAllResults} className="delete-all-btn">Kustuta kõik</button>
            <FontAwesomeIcon icon={faXmark} onClick={closeSide} className="close-sidebar-btn"/>
        </nav> 
    )
}