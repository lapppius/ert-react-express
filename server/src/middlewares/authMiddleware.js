import admin from "../../firebase.js";

// Create a middleware function to verify the authentication token
const authMiddleware = async (req, res, next) => {
  const authorizationHeader = req.headers["authorization"];
  if (!authorizationHeader) {
    return res.status(401).send({ message: "Not Authorization Header" });
  }

  const token = await authorizationHeader.split("Bearer ")[1];

  admin
    .auth()
    .verifyIdToken(token)
    .then((response) => ((req.user = response), next()))
    .catch((error) => {
      res.status(401).send({ message: "Unauthorized2" + error.message });
    });
};

export default authMiddleware;
