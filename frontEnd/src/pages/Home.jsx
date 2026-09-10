import { useEffect } from "react";
import { useDispatch } from "react-redux";

import { fetchProducts } from "../store/slices/productSlice";

import HeroBanner from "../components/HeroBanner";
import CategorySection from "../components/CategorySection";
import ProductGrid from "../components/ProductGrid";

const Home = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <div className="home-page">
      <HeroBanner />

      <CategorySection />

      <ProductGrid
        title="Featured Products"
        type="featured"
      />

      <ProductGrid
        title="New Arrivals"
        type="new-arrivals"
      />

      <ProductGrid
        title="Best Sellers"
        type="best-sellers"
      />
    </div>
  );
};

export default Home;