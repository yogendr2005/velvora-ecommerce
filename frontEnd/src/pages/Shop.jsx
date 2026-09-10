import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { fetchProducts } from "../store/slices/productSlice";
import ProductCard from "../components/ProductCard";

const Shop = () => {
  const [searchParams] = useSearchParams();
  const dispatch = useDispatch();

  const category = searchParams.get("category");
  const type = searchParams.get("type");
  const search = searchParams.get("search");

  const [sortBy, setSortBy] = useState("featured");

  const {
    products,
    loading,
    error
  } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(
      fetchProducts({
        category,
        type,
        search,
        sort: sortBy === "featured" ? undefined : sortBy
      })
    );
  }, [dispatch, category, type, search, sortBy]);

  if (loading) {
    return (
      <section className="shop-page">
        <div className="shop-header">
          <div>
            <h1>All Products</h1>
            <p>Loading products...</p>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="shop-page">
        <div className="empty-shop">
          <h2>Something went wrong</h2>
          <p>{error}</p>
        </div>
      </section>
    );
  }

  return (
    <section className="shop-page">
      <div className="shop-header">
        <div>
          <h1>
            {category
              ? category
              : type === "new-arrivals"
              ? "New Arrivals"
              : type === "best-sellers"
              ? "Best Sellers"
              : search
              ? `Search results for "${search}"`
              : "All Products"}
          </h1>

          <p>
            {products.length}{" "}
            {products.length === 1 ? "Product" : "Products"}{" "}
            Found
          </p>
        </div>

        <div className="shop-sort">
          <label htmlFor="sort">
            Sort By
          </label>

          <select
            id="sort"
            value={sortBy}
            onChange={(event) =>
              setSortBy(event.target.value)
            }
          >
            <option value="featured">
              Featured
            </option>

            <option value="newest">
              Newest
            </option>

            <option value="price-low">
              Price: Low to High
            </option>

            <option value="price-high">
              Price: High to Low
            </option>

            <option value="rating">
              Rating
            </option>
          </select>
        </div>
      </div>

      {products.length === 0 ? (
        <div className="empty-shop">
          <h2>No Products Found</h2>

          <p>
            Try searching for a different product
            or category.
          </p>
        </div>
      ) : (
        <div className="product-grid">
          {products.map((product) => (
            <ProductCard
              key={product._id}
              product={product}
            />
          ))}
        </div>
      )}
    </section>
  );
};

export default Shop;