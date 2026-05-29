import ProductList from "../components/productList/ProductList";
import Services from "../components/services/services";
import Newsletter from "../components/newsletter/Newsletter";
import Footer from "../components/footer/Footer";
import Hero from "../components/hero/Hero";

export default function Home() {
  return (
    <>
      <Services />
      <Hero />
      <ProductList />
      <Newsletter />
    </>
  );
}
