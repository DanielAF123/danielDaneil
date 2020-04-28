const express=require('express');
const router = express.Router();

router.get('/index', (req, res) =>{
res.send('index');
});

router.get('/about', (req, res) =>{
    res.send('About');
    });
module.exports = router;