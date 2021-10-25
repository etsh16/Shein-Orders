const express = require('express');
const router = express.Router();

const sheinController = require('../controllers/Shein.Controller');



router.get('/shein', sheinController.getItems);


// Customize auth message Protect the  routes
// router.all('*', (req, res, next) => {

//  const user = JSON.parse(req.cookies.Auth)||null;

//     if (!user) {
//         const error = new Error('You are not authorized to access this area');
//         error.status = 401;
//         throw error;
//     }
//     user.password=AES.decrypt(user.password,process.env.SALT_KEY).toString(enc.Utf8)|| "";
//     req.user = user;
//     return next();

// });

// -------------- Protected Routes -------------- //
// Form 13 
//router.get('/form13', form13Controller.get);


module.exports = router;