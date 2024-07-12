const { Types } = require("mongoose");
const { userModel } = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { options } = require("../routes/userRoutes");

const registerUser = async (req, res) => {
    try {
        const { fullName, email, username, password } = req.body;
        if (!fullName || !email || !username || !password) {
            return res.status(400).json({ message: 'All fields are mandatory' });
        }

        const existingUser = await userModel.findOne({ $or: [{ username }, { email }] });
        if (existingUser) {
            return res.status(409).json({ message: 'This user already exists' });
        }

        const avtarLocalPath = req.files?.avtar?.[0]?.path;
        const coverImgLocalPath = req.files?.coverImg?.[0]?.path || '';
        console.log(req.files);

        if (!avtarLocalPath) {
            return res.status(400).json({ message: 'Avatar is required' });
        }

        const newUser = await userModel.create({
            fullName,
            email,
            username,
            password,
            avtar: avtarLocalPath,
            coverImg: coverImgLocalPath,
        });

        if (newUser) {
            const userResponse = newUser.toObject();
            delete userResponse.password;
            return res.status(201).json({ message: 'User registration successfully done', user: userResponse });
        }

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: error.message });
    }
};

const loginUser = async function (req, res) {
    try {
        const { email, username, password } = req.body;
        if ((!email && !username) || !password) {
            return res.status(400).json({ message: "email/username and password are mandatory" });
        }

        const findUser = await userModel.findOne({ $or: [{ email }, { username }] });
        if (!findUser) {
            return res.status(401).json({ message: "This user does not exist" });
        }

        const matchPassword = await bcrypt.compare(password, findUser.password);
        if (!matchPassword) {
            return res.status(402).json({ message: "Incorrect password" });
        }

        const accessToken = findUser.generateAccessToken();
        const refreshToken = findUser.generateRefreshToken();

        findUser.refreshToken = refreshToken;
        await findUser.save();

        const options = {
            httpOnly: true,
            secure: true
        }



        res.status(200).
        cookie('accessToken', accessToken, options).
        cookie('refreshToken', refreshToken, options).json({
            message: "user login success",
            findUser
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
};

const logoutUser = async function (req, res) {
    try {
        const userId = req.user._id;
        const findUser = await userModel.findById(userId);
        if (!findUser) {
            return res.status(401).json({ message: "User not found" });
        }

        findUser.refreshToken = null;
        await findUser.save();

        const cookieOptions = {
            httpOnly: true,
            secure: true
        };

    

        res.status(200).clearCookie('accessToken', cookieOptions).
        clearCookie('refreshToken', cookieOptions).json({message:"user logout successfully"})


    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
};

const refreshAccessToken = async function (req, res) {
    try {
        const refreshToken = req.cookies.refreshToken || req.body.refreshToken;
        if (!refreshToken) {
            return res.status(401).json({ message: 'Refresh token is required' });
        }

        jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, async (err, user) => {
            if (err) {
                return res.status(403).json({ message: 'Invalid refresh token' });
            }

            const findUser = await userModel.findById(user._id);
            if (!findUser || findUser.refreshToken !== refreshToken) {
                return res.status(403).json({ message: 'Invalid refresh token' });
            }

            const newAccessToken = findUser.generateAccessToken();
            const newRefreshToken = findUser.generateRefreshToken();

            const options={
                httpOnly:true,
                secure:true
            } 

            res.status(200).cookie('accessToken', newAccessToken, options)
            .cookie('refreshToken', newRefreshToken,options)
            .json({message:"here are the refreshToken and accessToken",newAccessToken,newRefreshToken});
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
};



module.exports = { registerUser, loginUser, logoutUser, refreshAccessToken };
