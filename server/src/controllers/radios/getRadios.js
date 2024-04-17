import Radio from "../../models/radioModel.js";
import db from "../../database/firestore.js";

export default async function getRadios(req, res, next) {
  const snapshot = await db.collection("radios").get();
  const radios = [];
  for (let i = 0; i < snapshot.docs.length; i++) {
    const data = snapshot.docs[i].data();
    data.id = snapshot.docs[i].id;
    radios.push(new Radio(data));
  }

  res.status(200).send(radios);
}
