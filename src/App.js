import { useEffect, useState } from "react";
import "./styles.css";

export default function App() {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);

  const fetchProductsData = async () => {
    const data = await fetch("https://dummyjson.com/products?limit=100");
    const json = await data.json();

    if (json && json.products) {
      setProducts(json?.products);
    }
  };

  useEffect(() => {
    fetchProductsData();
  }, [page]);

  const selectPageHandler = (selectedPage) => {
    if (
      selectedPage >= 1 &&
      selectedPage <= products.length / 10 &&
      selectedPage != page
    ) {
      setPage(selectedPage);
    }
  };

  return (
    <div>
      {products.length > 0 && (
        <div className="products">
          {products.slice(page * 10 - 10, page * 10).map((prod) => {
            return (
              <span key={prod?.id} className="products__single">
                <img src={prod?.thumbnail} alt={prod?.title} />
                <span>{prod?.title}</span>
              </span>
            );
          })}
        </div>
      )}
      {products.length > 0 && (
        <div className="pagination">
          <span
            className={page > 1 ? "" : "pagination__disable"}
            onClick={() => selectPageHandler(page - 1)}
          >
            ◀
          </span>
          {[...Array(products.length / 10)].map((_, i) => (
            <span
              className={page === i + 1 ? "pageSelected" : ""}
              onClick={() => selectPageHandler(i + 1)}
              key={i}
            >
              {i + 1}
            </span>
          ))}
          <span
            className={page < products.length / 10 ? "" : "pagination__disable"}
            onClick={() => selectPageHandler(page + 1)}
          >
            ▶
          </span>
        </div>
      )}
    </div>
  );
}
