import React, { useCallback } from 'react'
import { useDropzone } from 'react-dropzone';
import styles from "./inputdropzone.module.css";

const InputDropZone = ({ children, onDrop, accept, multiple } ) => {
    const onDropCallback = useCallback(acceptedFiles => {
        if (onDrop) {
          onDrop(acceptedFiles);
        }
      }, [onDrop]);
    
      const { getRootProps, getInputProps, isDragAccept, isDragReject, isFocused } = useDropzone({
        onDrop: onDropCallback,
        accept,
        multiple
      });
    
      return (
        <div
          {...getRootProps()}
          className={`${styles.container} ${isDragAccept ? styles.isDragAccept: isDragReject ? styles.isDragReject : isFocused ? styles.isFocused : ''}`}
        >
          <input {...getInputProps()} />
          {children}
        </div>
      );
}

export default InputDropZone;
