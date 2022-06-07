export default function InputNumber(props) {
  return (
    <input 
        type="number"
        name={props.name}
        onChange={props.change}
        placeholder={props.placeholder}
      >
    </input>
  );
}


