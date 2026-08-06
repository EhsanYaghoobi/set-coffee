import styles from "@/styles/product.module.css";
import Gallery from "@/components/templates/product/Gallery";
import Details from "@/components/templates/product/Details";
import Tabs from "@/components/templates/product/Tabs";
import MoreProducts from "@/components/templates/product/MoreProducts";

import Footer from "@/components/modules/footer/Footer";
import Navbar from "@/components/modules/navbar/Navbar";
import { authUser } from "@/lib/authUser";
import connectToDB from "@/configs/db";
import ProductModel from "@/models/Product";

interface ProductPageProps {
  params: {
    id: string;
  };
}

const product = async ({ params }: ProductPageProps) => {
  const user = await authUser();
  const { id } = await params;
  connectToDB();
  const product = await ProductModel.findOne({ _id: id }).populate("comments");

  const relatedProducts = await ProductModel.find({ smell: product.smell });

  return (
    <div className={styles.container}>
      <Navbar isLogin={user ? true : false} />
      <div data-aos="fade-up" className={styles.contents}>
        <div className={styles.main}>
          <Details product={JSON.parse(JSON.stringify(product))} />
          <Gallery />
        </div>
        <Tabs product={JSON.parse(JSON.stringify(product))} />
        <MoreProducts relatedProducts={relatedProducts} />
      </div>
      <Footer />
    </div>
  );
};

export default product;
