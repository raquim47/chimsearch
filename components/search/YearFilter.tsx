'use client';

import { YEAR_FILTER_LIST } from '@/utils/constants';
import { useEffect, useRef, useState } from 'react';
import styles from './YearFilter.module.css';

const YearFilter = ({
  onChangeYear,
  year,
}: {
  onChangeYear: (value: string) => void;
  year: string;
}) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => setShowDropdown((prev) => !prev);

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setShowDropdown(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className={styles.filter} onClick={toggleDropdown} ref={dropdownRef}>
      <span>년도 : </span>
      <strong>{year}</strong>
      {showDropdown && (
        <ul className={styles.filter__dropdown}>
          {YEAR_FILTER_LIST.map((year) => (
            <li key={year} onClick={() => onChangeYear(year)}>
              {year}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default YearFilter;
