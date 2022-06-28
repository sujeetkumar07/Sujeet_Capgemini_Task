import React, { useEffect, useState } from "react";
import InputRange from "react-input-range";
import "../../node_modules/react-input-range/lib/css/index.css";

const PriceRangeSlider = ({ sortedProduct = [], onChange }) => {
  const [priceRangeValue, setPriceRangeValue] = useState({ min: 0, max: 1000 });

  useEffect(() => {
    if (sortedProduct.length > 0)
      setPriceRangeValue({
        ...priceRangeValue,
        min:
          sortedProduct?.products.length > 0
            ? Number(sortedProduct?.products[0]?.price)
            : 0,
        max:
          sortedProduct?.products.length > 0
            ? Number(
                sortedProduct?.products[sortedProduct?.products.length - 1]
                  ?.price
              )
            : 1,
      });
  }, [sortedProduct]);

  const handlePriceChange = (value) => {
    setPriceRangeValue({ ...priceRangeValue, ...value });
  };

  return (
    <form>
      <InputRange
        draggableTrack
        maxValue={
          sortedProduct?.products?.length > 0
            ? Number(
                sortedProduct?.products[sortedProduct?.products?.length - 1]
                  ?.price
              )
            : 0
        }
        minValue={
          sortedProduct?.products?.length > 0
            ? Number(sortedProduct?.products[0]?.price)
            : 0
        }
        onChange={handlePriceChange}
        onChangeComplete={onChange}
        value={priceRangeValue}
      />
    </form>
  );
};

export default PriceRangeSlider;
