import ProductList from "../components/productList/ProductList";
import Newsletter from "../components/newsletter/Newsletter";
import Footer from "../components/footer/Footer";
import Hero from "../components/hero/Hero";

export default function Home() {
  return (
    <>
      <Hero />
      <ProductList />
      <Newsletter />
      <Footer />
    </>
  );
}
