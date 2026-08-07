import Breadcrumb from "@/components/modules/breadcrumb/Breadcrumb";
import Footer from "@/components/modules/footer/Footer";
import Navbar from "@/components/modules/navbar/Navbar";
import Form from "@/components/templates/contact-us/Form";
import Information from "@/components/templates/contact-us/Information";
import { authUser } from "@/lib/authUser";
import styles from "@/styles/contact-us.module.css";

const page = async () => {
  const user = await authUser();

  return (
    <>
      <Navbar isLogin={user ? true : false} />
      <Breadcrumb route={"تماس با ما"} />
      <div className={styles.container}>
        <div className={styles.contents}>
          <Form />
          <Information />
        </div>
      </div>

      <Footer />
    </>
  );
};

export default page;
