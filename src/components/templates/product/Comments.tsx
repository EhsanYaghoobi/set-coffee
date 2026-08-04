import styles from "./comments.module.css";
import CommentForm from "./CommentForm";
import Comment from "@/components/modules/comment/Comment";
import { ProductProps } from "@/types/product";
import { IComment } from "@/models/Comment";

const Comments = ({ product }: ProductProps) => {
  return (
    <div>
      <p>نظرات ({product.comments.length}) :</p>
      <hr />

      <main className={styles.comments}>
        <div className={styles.user_comments}>
          <p className={styles.title}>
            7 دیدگاه برای کپسول قهوه SETPRESSO سازگار با دستگاه نسپرسو ( GOLD )
            ده -10- عددی
          </p>
          <div>
            {product.comments.map((comment: IComment) => (
              <Comment key={comment._id} {...comment} />
            ))}
          </div>
        </div>
        <div className={styles.form_bg}>
          <CommentForm />
        </div>
      </main>
    </div>
  );
};

export default Comments;
