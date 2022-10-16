import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import { useFormikContext } from 'formik';

import styles from './ContentModalCategory.module.scss';
import { getTopics } from 'features/master-data/master-data';
import { ReactComponent as IconChecked } from 'assets/images/icon-svg/icon-checked.svg';
import { TypeInitForm } from '../../types/new-post.types';

import { useAppDispatch, useAppSelector } from 'redux/store';

interface ContentModalCategoryProps {
  name: string;
}

const ContentModalCategory: React.FC<ContentModalCategoryProps> = ({
  name,
}) => {
  const { setFieldValue, values } = useFormikContext<TypeInitForm>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [listSelectCate, setListSelectCate] = useState<string[]>(
    values.topics || []
  );
  const dispatch = useAppDispatch();

  const topics = useAppSelector((state) => state.masterData.topics);

  useEffect(() => {
    dispatch(getTopics()).finally(() => setIsLoading(false));
  }, [dispatch]);

  useEffect(() => {
    setFieldValue(name, listSelectCate);
  }, [listSelectCate, name, setFieldValue]);

  const handleSelectTopic = (id: string) => {
    setListSelectCate((prev) => {
      if (listSelectCate.includes(id)) {
        return listSelectCate.filter((item) => item !== id);
      }
      return [...prev, id];
    });
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.contentModalCategory}>
      {topics &&
        topics?.length > 0 &&
        topics?.map((topic) => {
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

export default ContentModalCategory;
