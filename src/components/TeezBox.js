function TeezBox({
  title,
  price,
  updateQuantity,
  selectedSize,
  selectedType,
  onSizeChange,
  onTypeChange,
}) {
  return (
    <div className='productBox-mar'>
      <div className='productHeading-mar'>
        {title} <span className='midSpan'>/</span> <span className='priceSpan'>{price}</span>$
      </div>
      <div className='selectContainer2'>
        <select
          className='sizeSelect-mar'
          value={selectedSize}
          onChange={(e) => onSizeChange(e.target.value)}
        >
          <option value="ERROR">SIZE</option>
          <option value="XS">XS</option>
          <option value="S">S</option>
          <option value="M">M</option>
          <option value="L">L</option>
          <option value="XL">XL</option>
          <option value="XXL">XXL</option>
        </select>
        <select
          className='sizeSelect-mar'
          value={selectedType}
          onChange={(e) => onTypeChange(e.target.value)}
        >
          <option value="ERROR">TYPE</option>
          <option value="v-neck">V-NECK</option>
          <option value="polo">POLO</option>
          <option value="tank-top">TANK TOP</option>
          <option value="gamer">GAMER</option>
        </select>
        <input
          className='sizeSelect-mar'
          type='number'
          placeholder='AMOUNT'
          onChange={(e) => {
            const newValue = e.target.value.trim() === '' ? 0 : parseInt(e.target.value, 10);
            updateQuantity(title, newValue);
          }}
        />
      </div>
    </div>
  );
}
export default TeezBox;