import Radio from "../../models/radioModel.js";
import db from "../../database/firestore.js";

export default async function getRadioById(req, res, next) {
  const docRef = db.collection("radios").doc(req.params.id);
  try {
    const doc = await docRef.get();

    if (doc.exists) {
      const radio = new Radio(doc.data());
      radio.id = doc.id;
      res.status(200).send(radio);
    } else {
      res.status(404).send("Document does not exist");
    }
  } catch (error) {
    console.error("Error getting document:", error);
  }
}
