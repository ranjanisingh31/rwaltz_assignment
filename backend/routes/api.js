const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const signin = require("../model/register");
const imageToBase64 = require('image-to-base64');

router.get("/", (req, res) => {
    res.send("from API route");
});

//register new users
router.post("/v1/users", (req, res) => {
    let userData = req.body;
    let user = new signin(userData);

    signin.findOne({
        email: userData.email
    }, (error, data) => {
        if (error) {
            res.status(500).json({ message: "Request Not Implemented" });
        } else if (data) {
            res.status(401).json({ message: "Already registered with this email id." });
        } else {
            user.save((error, data1) => {
                if (error) {
                    res.status(500).json({ message: "Request Not Implemented" });
                } else {
                    // authentication
                    let payload = {
                        subject: data1._id
                    };
                    let token = jwt.sign(payload, "registerKey");

                    res.status(200).send({
                        token: token, message: "Registered Successfully!!!", _id: data1._id
                    });
                }
            });
        }
    });
});

//login 
router.post("/v1/session", (req, res) => {
    let userData = req.body;
    signin.findOne({
        email: userData.email
    }, (error, data) => {
        if (error) {
            res.status(500).json({ message: "Internal Server Error." });
        } else {
            if (!data) {
                res.status(401).json({ message: "Invalid email." });
            } else {

                if (data.password !== userData.password) {
                    res.status(401).json({ message: "Invalid Password." });
                } else {

                    let payload = {
                        subject: data._id
                    };
                    let token = jwt.sign(payload, "registerKey");

                    res.status(200).send({
                        token: token, message: "LoggedIn!!!", _id: data._id
                    });
                }
            }
        }
    });
});


//get all users
router.get('/v1/users', verifyToken, (req, res) => {

    signin.find({}, (error, data) => {
        if (error) {
            res.status(500).json({ message: "Internal Server Error." });
        } else {
            res.status(200).json(data);
        }
    }
    );
});

//get Userby id
router.get('/v1/user/:id', verifyToken, (req, res) => {

    signin.find({ _id: req.params.id }, (error, data) => {
        if (error) {
            res.status(500).json({ message: "Internal Server Error." });
        } else {
            res.status(200).json(data[0]);
        }
    }
    );
});

//get img base64
router.get('/v1/get/user/img/:id', verifyToken, (req, res) => {

    signin.find({ _id: req.params.id }, (error, data) => {
        if (error) {

            res.status(500).json({ message: "Internal Server Error." });
        } else {
            imageToBase64(data[0].img_url).then((response) => {
                res.status(200).json(response);
            }).catch((error) => {
                res.json({ message: "Error in getting Img." });
            })
        }
    }
    );

});


//update user details
router.put('/v1/users/:id', verifyToken, (req, res) => {
    let id = req.params.id;
    let userData = req.body;
    signin.updateOne({
        _id: id
    }, {
        $set: {
            "name": userData.name,
            "email": userData.email,
            "phone": userData.phone,
            "address": userData.address,
            "hobbies": userData.hobbies,
            "gender": userData.gender,
            "password": userData.password
        }
    }, (error, data) => {
        if (error) {
            res.status(500).json({ message: "Internal Server Error." });
        } else {
            if (!data) {
                res.status(401).json({ message: "Invalid email." });
            } else {
                res.status(200).send({
                    message: "Updated User Details."
                });
            }
        }
    }
    );
});

//upload file
router.put('/v1/user/img/:id', verifyToken, (req, res) => {
    let id = req.params.id;
    let data = req.files;
    let file = data.file;
    let file_name = file.name;
    let path = "./image/" + file_name;
    file.mv(path, function (err) {
        if (err) {
            res.json({ message: "Error in Uploading Img." });
        }
        else {
            signin.updateOne({
                _id: id
            }, {
                $set: {
                    "img_url": path
                }
            }, (error, data) => {
                if (error) {
                    res.status(500).json({ message: "Internal Server Error." });
                } else {
                    if (!data) {
                        res.status(401).json({ message: "Invalid email." });
                    } else {
                        res.status(200).send({
                            message: "Uploaded Image."
                        });
                    }
                }
            }
            );
        }
    })

});


//middleware to verify token
function verifyToken(req, res, next) {

    if (!req.headers.authorization) {
        return res.status(401).json({ message: "unauthorized request" });
    }
    let token = req.headers.authorization.split(" ")[1];
    if (token === "null") {
        return res.status(401).json({ meassage: "unauthhorized request" });
    }
    let payload = jwt.verify(token, "registerKey");
    if (!payload) {
        return res.status(401).json({ message: "unauthorized request" });
    }
    req.userId = payload.subject;
    next();
}

module.exports = router;