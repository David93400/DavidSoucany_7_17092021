const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET_TOKEN);
    const userId = decodedToken.userId;
    const isAdmin = decodedToken.isAdmin
    if (req.body.userId && req.body.userId !== userId) {
      throw '403: unauthorized request';
    }
    else if(req.body.isAdmin && req.body.isAdmin !== isAdmin) {
      throw '403: unauthorized request';
    } 
      next();
}
    catch {
    res.status(401).json({ message: `Authentification error !` });
  }
};
