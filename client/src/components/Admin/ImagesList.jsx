import { useEffect, useState } from "react";
import ImagesListItem from "./ImagesListItem.jsx";
import styles from "./ImagesList.module.css";
import { listAll, ref, getDownloadURL } from "firebase/storage";
import { storage } from "../../firebase.js";

export default function ImagesList({ setSelected }) {
  const [files, setFiles] = useState([]);

  useEffect(() => {
    const fetchFiles = async () => {
      try {
        const storageRef = ref(storage, "logos");
        const filesList = await listAll(storageRef);
        const filesData = await Promise.all(
          filesList.items.map(async (fileRef) => {
            const downloadURL = await getDownloadURL(fileRef);
            return { name: fileRef.name, url: downloadURL };
          })
        );
        setFiles(filesData);
      } catch (error) {
        console.error("Error fetching files:", error);
      }
    };

    fetchFiles();
  }, []);

  return (
    <div>
      <h2>Uploaded Files</h2>
      <ul className={styles.imagesList}>
        {files.map((file, index) => (
          <ImagesListItem
            file={file}
            key={file.name}
            setSelected={setSelected}
          />
        ))}
      </ul>
    </div>
  );
}
