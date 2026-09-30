const jwt = require('jsonwebtoken');
const { admin } = require('../db/db');
const { jwtSecret } = require("../config/config");
const checkadmin = async(req, res, next) => {
    try {
        if (!req.headers.authorization) {
         
            res.status(401).send({ error: 'You must be logged in to view this resource.' })
        } else {
            let token = req.headers.authorization.split(" ")[1]
            jwt.verify(token, jwtSecret, async (err,data) => {
                if (err) {
                    res.status(500).send({ error: 'Failed to authenticate token.' });
                } else {
                  let user=  await admin.findOne({
                        where: {
                          id: data.admin.id,
                        }, 
                      });
                      req.admin = data;
                    next()
                }
            })
        }
    } 
    catch (e) {
        console.log(e);
        res.status(500).send({ error: e.toString() });
        }

    }
 module.exports = checkadmin;
