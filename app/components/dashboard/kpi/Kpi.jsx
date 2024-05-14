"use client";
import { useEffect, useRef, useState } from 'react';
import styles from './kpi.module.css';
import LoadingKpi from '../../loading/loadingkpi/LoadingKpi';

const Kpi = ({ stat, name, label, icon, placeholder, maxLength, loading }) => {
  const [truncatedStat, setTruncatedStat] = useState(stat);
  const [truncatedPlaceholder, setTruncatedPlaceholder] = useState(placeholder);
  const containerRef = useRef(null);

  useEffect(() => {
    const containerWidth = containerRef.current.offsetWidth;
    const span = document.createElement('span');
    span.textContent = stat;
    span.style.visibility = 'hidden';
    span.style.position = 'absolute';
    document.body.appendChild(span);
    const textWidth = span.offsetWidth;
    document.body.removeChild(span);

    if (textWidth > containerWidth) {
      setTruncatedStat(stat.slice(0, maxLength) + '...');
    } else {
      setTruncatedStat(stat);
    }
  }, [stat, maxLength]);

  useEffect(() => {
    const containerWidth = containerRef.current.offsetWidth - 20;
    const span = document.createElement('span');
    span.textContent = placeholder;
    span.style.visibility = 'hidden';
    span.style.position = 'absolute';
    document.body.appendChild(span);
    const textWidth = span.offsetWidth;
    document.body.removeChild(span);

    if (textWidth > containerWidth) {
      setTruncatedPlaceholder(placeholder.slice(0, maxLength) + '...');
    } else {
      setTruncatedPlaceholder(placeholder);
    }
  }, [placeholder, maxLength]);
  return (
    <div className={styles.container} ref={containerRef}>
      {
        loading ?
          <LoadingKpi /> :
          (
            <>
              <div className={styles.top}>
                <span className={styles.span}>{name}</span>
                <div className={styles.icon}>
                  {icon}
                </div>
              </div>
              <div className={styles.center}>
                <span className={styles.span}>{truncatedStat ? truncatedStat : truncatedPlaceholder}</span>
              </div>
              <div className={styles.bottom}>
                <span>{label}</span>
              </div>
            </>
          )
      }
    </div>
  );
}

export default Kpi;
