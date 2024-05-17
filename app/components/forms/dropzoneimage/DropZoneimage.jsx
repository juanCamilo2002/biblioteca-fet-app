import Image from "next/image";
import InputDropZone from "../dropzone/InputDropzone";
import styles from "./dropzoneimage.module.css";

const DropZoneimage = ({ image, setImage, custom }) => {

  const handleDrop = (acceptedFiles) => {
    const file = acceptedFiles[0];
    const reader = new FileReader();
    reader.onload = (event) => {
      setImage({
        file: file,
        dataURL: event.target.result,
      });
    };
    reader.readAsDataURL(file);
  };
  return (
    <InputDropZone
      onDrop={handleDrop}
      accept={
        {
          'image/jpeg': [],
          'image/png': []
        }
      }
      multiple={false}
      custom={custom}
    >
      {!image && <span>Arrastra una imagen o haz click para seleccionar una</span>}
      {image &&
        <Image
          src={image.dataURL}
          alt="book"
          className={styles.imagePlaceholder}
          width={250}
          height={400} />
      }
    </InputDropZone>
  )
}

export default DropZoneimage
