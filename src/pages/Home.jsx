import ProductList from "../components/productList/ProductList";
import Services from "../components/services/services";
import Newsletter from "../components/newsletter/Newsletter";

export default function Home() {
  return (
    <>
      <Services />
      <ProductList />
      <Newsletter />
    </>
  );
}
