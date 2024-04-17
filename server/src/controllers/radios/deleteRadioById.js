import db from "../../database/firestore.js";

export default async function deleteRadioById(req, res, next) {
  const id = req.params.id;
  db.collection("radios")
    .doc(id)
    .delete()
    .catch((error) => {
      return next(error);
    });
  res.status(200).send({ message: "Deleted Successfully", status: 200 });
}
