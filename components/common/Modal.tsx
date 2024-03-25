'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect } from 'react';
import styles from './Modal.module.css';

const Modal = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const pathName = usePathname();
  const params = useSearchParams().toString();

  const goToParentPath = () => {
    const paths = pathName.split('/').slice(0, -1);
    const parentPath = paths.join('/') || '/';
    router.push(params ? parentPath + '?' + params : parentPath, {
      scroll: false,
    });
  };

  const enhancedChildren = React.Children.map(children, (child) =>
    React.isValidElement(child)
      ? React.cloneElement(child, { goToParentPath })
      : child
  );

  useEffect(() => {
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = '';
    };
  }, []);
  
  return (
    <div>
      <div className={styles.background} onClick={goToParentPath} />
      <div className={styles.modal}>{enhancedChildren}</div>
    </div>
  );
};

export default Modal;
