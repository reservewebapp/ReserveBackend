import express from "express";
const router = express.Router();
import path from "path";

router.get('^/$|/index(.html)?', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'views', 'index.html'));
});

//module.exports = router;
export default router;