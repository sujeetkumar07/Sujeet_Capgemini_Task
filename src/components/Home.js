import { CartState } from "../context/Context";
import SortByPrice from "./dummy";
import Filters from "./Filters";
import SingleProduct from "./SingleProduct";

const Home = () => {
  const {
    state: { products },
    productState: {
      sort,
      byPriceRange,
      byStock,
      byFastDelivery,
      byRating,
      searchQuery,
    },
  } = CartState();

  const transformProducts = () => {
    let sortedProducts = products;

    if (sort) {
      sortedProducts = sortedProducts.sort((a, b) =>
        sort === "lowToHigh" ? a.price - b.price : b.price - a.price
      );
    }

    if (byPriceRange) {
      console.log("Helloasdasd", byPriceRange);
      sortedProducts = sortedProducts.filter(
        (prod) =>
          prod.price >= byPriceRange.min && prod.price <= byPriceRange.max
      );
    }

    if (!byStock) {
      sortedProducts = sortedProducts.filter((prod) => prod.inStock);
    }

    if (byFastDelivery) {
      sortedProducts = sortedProducts.filter((prod) => prod.fastDelivery);
    }

    if (byRating) {
      sortedProducts = sortedProducts.filter(
        (prod) => prod.ratings >= byRating
      );
    }

    if (searchQuery) {
      sortedProducts = sortedProducts.filter((prod) =>
        prod.name.toLowerCase().includes(searchQuery)
      );
    }

    return sortedProducts;
  };

  return (
    <div className="home">
      <Filters />
      <div>
        <div>
          <SortByPrice />
        </div>
        <div className="productContainer">
          {transformProducts().map((prod) => (
            <SingleProduct prod={prod} key={prod.id} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
