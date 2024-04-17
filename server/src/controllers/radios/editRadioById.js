import db from "../../database/firestore.js";

export default async function editRadioById(req, res) {
  const docRef = db.collection("radios").doc(req.params.id);
  try {
    const doc = await docRef.get();

    if (doc.exists) {
      await docRef.update(req.body);
      res.status(200).send({ message: "updated successfully", status: 200 });
    } else {
      res.status(404).send({ message: "Document does not exist", status: 404 });
    }
  } catch (error) {
    console.error("Error getting document:", error);
  }
}
