const jwt = require('jsonwebtoken');

function verifyToken(req, res, next) {
const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1Y2M2ODAwOWZkZDVlODZlM2ZjMTRlNyIsImlhdCI6MTcwNzkxMDI4MCwiZXhwIjoxNzk0MzEwMjgwfQ.7JLDQO-L6b492m0n4955PnjeA0v5KtEuhtqLu3D4cXM";
if (!token) return res.status(401).json({ error: 'Access denied' });
try {
    console.log(Object.keys(req));

 console.log(req.id+" this");
 console.log(req + " that");

 const decoded = jwt.verify(token, 'sereee');
 console.log(decoded.id+"ok");
 req.userId = decoded.userId;
 next();
 } catch (error) {
 res.status(401).json({ error: 'Invalid token' });
 }
 };

module.exports = verifyToken;