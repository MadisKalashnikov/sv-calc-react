export default function InputNumber({name, change, placeholder}) {
  return (
    <input 
        type="number"
        name={name}
        onChange={change}
        placeholder={placeholder}
      >
    </input>
  );
}


