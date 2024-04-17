import authMiddleware from "./authMiddleware.js";

const adminMiddleware = async (req, res, next) => {
  authMiddleware(req, res, () => {
    if (!req.user?.admin) {
      return res.status(403).send({ message: "Not Authorized Admin" });
    } else {
      next();
    }
  });
};

export default adminMiddleware;
