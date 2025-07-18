export default function QuantitySelector({ value, min=1, max=99, onChange }){
    const dec = () => onChange(Math.max(min, value-1));
    const inc = () => onChange(Math.min(max, value+1));
    return (
      <div className='qty-select' role='group' aria-label='Quantity selector'>
        <button type='button' onClick={dec} disabled={value<=min} aria-label='Decrease quantity'>−</button>
        <input type='number' value={value} min={min} max={max} onChange={e=>onChange(+e.target.value||min)} aria-label='Quantity'/>
        <button type='button' onClick={inc} disabled={value>=max} aria-label='Increase quantity'>+</button>
      </div>
    );
  }