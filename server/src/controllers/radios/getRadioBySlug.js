import Radio from "../../models/radioModel.js";
import db from "../../database/firestore.js";
export default async function getRadioBySlug(req, res, next) {
  const query = db.collection("radios").where("slug", "==", req.params.slug);
  query
    .get()
    .then((snapshot) => {
      snapshot.forEach((doc) => {
        const radio = new Radio(doc.data());
        radio.id = doc.id;
        res.status(200).send(radio);
      });
    })
    .catch((err) => {
      console.error("Error getting documents", err);
    });
}
