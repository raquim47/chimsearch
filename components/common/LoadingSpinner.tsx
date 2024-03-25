import { Oval } from 'react-loader-spinner';
import styles from './LoadingSpinner.module.css';

const LoadingSpinner = () => {
  return (
    <div className={styles.align}>
      <Oval
        height="40"
        width="40"
        strokeWidth={5}
        color="#1DA8AF"
        secondaryColor="#d2dfdf"
        ariaLabel="loading-spinnner"
      ></Oval>
    </div>
  );
};

export default LoadingSpinner;
