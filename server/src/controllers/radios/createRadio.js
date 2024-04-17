import Radio from "../../models/radioModel.js";
import db from "../../database/firestore.js";
import slugify from "../../utils/slugify.js";

export default async function createRadio(req, res) {
  const { name, streamURL, logoURL, wikidataId, epgId } = req.body;
  const slug = slugify(name);

  const docRef = db.collection("radios").where("name", "==", name);

  docRef
    .get()
    .then((snapshot) => {
      //   if document with this name exists send response
      if (!snapshot.empty) {
        res.status(302).send({ message: "Radio already exists", status: 302 });
        /// if it doesn't exist crete the document
      } else {
        const newDocRef = db.collection("radios").doc();
        const newRadio = {
          name: name || null,
          slug: slug || null,
          streamURL: streamURL || null,
          logoURL: logoURL || null,
          wikidataId: wikidataId || null,
          epgId: epgId || null,
        };

        newDocRef
          .set(newRadio)
          .then(() => {
            res
              .status(201)
              .send({ message: "Radio created successfully", status: 201 });
          })
          .catch(() => {
            res.status(500).send({ message: "An Error occurred", status: 500 });
          });
      }
    })
    .catch((err) => {
      console.error("Error getting documents", err);
    });
}
