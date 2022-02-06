import { useState } from "react";

import { NewPostPreview } from "./../../types/new-post.types";
import styles from "./HeaderPost.module.scss";

const HeaderPost = () => {
  const [dataPostPreview, setDataPostPreview] = useState<NewPostPreview>({
    title: "",
    des: "",
    img: "",
  });

  return (
    <div className={styles.headerPost}>
      <div className={styles.headerPostInfo}>
        <div className={styles.headerPostBox}>
          <textarea
            placeholder="Tiêu đề"
            rows={2}
            maxLength={130}
            className={styles.headerPostTitle}
            value={dataPostPreview.title}
            onChange={(e) =>
              setDataPostPreview({ ...dataPostPreview, title: e.target.value })
            }
          />
        </div>

        <div className={styles.headerPostBox}>
          <textarea
            placeholder="Mô tả"
            rows={5}
            maxLength={400}
            value={dataPostPreview.des}
            onChange={(e) =>
              setDataPostPreview({ ...dataPostPreview, des: e.target.value })
            }
          />
        </div>

        <div className={styles.headerPostBox}>
          <select>
            <option value="">Chọn danh mục</option>
          </select>
        </div>

        <div className={styles.headerPostBox}>
          <label htmlFor="">
            <input
              type="file"
              onChange={(e) =>
                setDataPostPreview({
                  ...dataPostPreview,
                  img: e.target.files ? e.target.files[0] : "",
                })
              }
            />
          </label>
        </div>
      </div>

      <div className={styles.headerPostPreview}>
        <div className={styles.postPreview}>
          <div className={styles.postPreviewImg}>
            <img
              src={
                dataPostPreview.img
                  ? URL.createObjectURL(dataPostPreview.img)
                  : "https://cdn.pixabay.com/photo/2016/12/07/23/41/snow-1890653__340.jpg"
              }
              alt=""
            />
          </div>

          <div className={styles.postPreviewBody}>
            <h3 className={styles.postPreviewTitle}>{dataPostPreview.title}</h3>
            <p className={styles.postPreviewDes}>{dataPostPreview.des}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeaderPost;
