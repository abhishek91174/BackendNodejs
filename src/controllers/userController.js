const {Types}=require("mongoose");
const {userModel}=require("../models/userModel");


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

        const avtarLocalPath= req.files?.avtar?.[0]?.path;
        const coverImgLocalPath = req.files?.coverImg?.[0]?.path || '';
        console.log(req.files);

        if (!avtarLocalPath) {
            return res.status(400).json({ message: 'Avtar is required' });
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

module.exports = { registerUser };