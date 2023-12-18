const User = require("../Models/user Model");
const { options } = require("../app");

exports.register = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        let user = await User.findOne({ email });
        if (user)
            return res
                .status(400)
                .json({ sucess: false, massage: "user Already exist" });

        user = await User.create({
            name,
            email,
            password,
            avatar: { public_id: "sample_id", url: "sampleurl" },
        });

        res.status(201).json({ success: true, user });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;


        const user = await User.findOne({ email }).select("+password");

        if (!user) {
            res.status(400).json({
                success: false,
                message: "User doest not exist",
            });
        }

        const isMatch = await user.matchPassword(password);

        if (!isMatch) {
            res.status(400).json({
                success: false,
                message: "Incorrect Password ",
            });
        }

        const token = await user.generateToken();

        res.status(201)
        .cookie("token", token)
        .json({
            success: true,
            user,
            token,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};
