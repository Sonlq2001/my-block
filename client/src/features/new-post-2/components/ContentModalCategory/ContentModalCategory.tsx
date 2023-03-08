import React, { useEffect, useState, memo } from 'react';
import clsx from 'clsx';
import { useFormikContext } from 'formik';

import styles from './ContentModalCategory.module.scss';
import { ReactComponent as IconChecked } from 'assets/images/icon-svg/icon-checked.svg';

import { getTopics } from 'features/master-data/master-data';
import { TypeInitForm } from '../../types/new-post.types';
import { useAppDispatch, useAppSelector } from 'redux/store';
import { SLUG_TOPICS } from 'features/home/home';

interface ContentModalCategoryProps {
  name: string;
  isShowModal: boolean;
  listSelectCate: string[];
  setListSelectCate: (category: string[]) => void;
}

const ContentModalCategory: React.FC<ContentModalCategoryProps> = ({
  name,
  listSelectCate,
  setListSelectCate,
}) => {
  const { values } = useFormikContext<TypeInitForm>();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const dispatch = useAppDispatch();

  const topics = useAppSelector((state) =>
    state.masterData.topics?.filter(
      (topic) => topic.slug !== SLUG_TOPICS.FAVORITE
    )
  );

  useEffect(() => {
    dispatch(getTopics()).finally(() => setIsLoading(false));
  }, [dispatch]);

  useEffect(() => {
    setListSelectCate(values.topics);
  }, [setListSelectCate, values.topics]);

  const handleSelectTopic = (id: string) => {
    if (listSelectCate.includes(id)) {
      setListSelectCate(listSelectCate.filter((item) => item !== id));
    } else {
      setListSelectCate([...listSelectCate, id]);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.contentModalCategory}>
      {topics &&
        topics.length &&
        topics.map((topic) => {
          const isActiveSelect = listSelectCate.includes(topic._id);
          return (
            <label
              className={clsx(styles.itemCate, isActiveSelect && styles.active)}
              key={topic._id}
              htmlFor={topic._id}
            >
              <input
                type="checkbox"
                id={topic._id}
                onChange={() => handleSelectTopic(topic._id)}
                value={topic._id}
                name={name}
                checked={listSelectCate.includes(topic._id)}
                hidden
              />
              <img
                src="https://ncmaz.chisnghiax.com/wp-content/uploads/2021/09/wtpp323zaew-1-150x150.jpg"
                alt=""
                className={styles.imageCate}
              />
              <div className={styles.contentCate}>
                <span className={styles.nameCate}>{topic.name}</span>
                {isActiveSelect && <IconChecked />}
              </div>
            </label>
          );
        })}
    </div>
  );
};

export default memo(ContentModalCategory);
