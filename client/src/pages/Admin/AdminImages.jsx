import { useState } from "react";
import { ref, uploadBytes } from "firebase/storage";
import { storage } from "../../firebase.js";
import ImagesList from "../../components/Admin/ImagesList.jsx";

export default function AdminImages() {
  const [images, setImages] = useState([]);
  const [uploadedFiles, setUploadedFiles] = useState([]);

  // Function to handle file input change
  const handleFileInputChange = (e) => {
    const selectedImages = Array.from(e.target.files);
    setImages(selectedImages);
  };

  // Function to upload images
  const uploadImages = () => {
    setUploadedFiles([]);
    const storageRef = ref(storage);

    images.forEach((image, index) => {
      const imageRef = ref(storageRef, `logos/${image.name}`);
      uploadBytes(imageRef, image)
        .then((snapshot) => {
          console.log("Uploaded a file!", snapshot);
          // Handle successful upload
          setUploadedFiles((prevUploadedFiles) => [
            ...prevUploadedFiles,
            image.name,
          ]);
        })
        .catch((error) => {
          console.error("Upload failed:", error);
          // Handle unsuccessful upload
        });
    });
  };

  return (
    <div>
      <input type="file" onChange={handleFileInputChange} multiple />
      <button onClick={uploadImages}>Upload</button>
      <ol>
        {uploadedFiles.map((fileName, index) => (
          <li key={index}>{fileName}</li>
        ))}
      </ol>
      <ImagesList/>
    </div>
  );
}
