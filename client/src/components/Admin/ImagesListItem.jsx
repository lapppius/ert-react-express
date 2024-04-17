export default function ImagesListItem({ file, setSelected }) {
  return (
    <li
      onClick={() => {
        setSelected(file.url);
      }}
    >
      <img src={file.url} alt={file.name} />
      <p>{file.name}</p>
    </li>
  );
}
