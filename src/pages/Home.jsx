import ProductList from "../components/productList/ProductList";
import Newsletter from "../components/newsletter/Newsletter";
// eslint-disable-next-line no-unused-vars
import Footer from "../components/footer/Footer";
import Hero from "../components/hero/Hero";

export default function Home() {
  return (
    <>
      <Hero />
      <ProductList />
      <Newsletter />
    </>
  );
}
