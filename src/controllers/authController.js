import authService from "../services/authService.js";

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const {user, accessToken, refreshToken } = await authService.login(email, password);
        res
            .cookie("refreshToken", refreshToken,{
                httpOnly: true,
                secure: false,
                sameSite: 'Strict',
                path: "/",
                maxAge: 7 * 24 * 60 * 60 * 1000,
            })
            .status(200).json({
            status: 200,
            data: {
                user: {
                    id: user._id,
                    email: user.email,
                    name: user.name,
                    role: user.role
                }
            },
            accessToken: accessToken,
        });
    } catch (error) {
        res.status(401).json({
            message: error.message,
        })
    }
};

const logout = async (req, res) => {
    try {
        await authService.logout(req, res);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
const register = async (req, res) => {
    try {
        const { email, password, name, gender, age, address } = req.body;

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "Email đã tồn tại" });
        }

        const hashedPassword = await bcryptjs.hash(password, 10);
        const newUser = new User({
            email,
            password: hashedPassword,
            name,
            role: "user",
            gender,
            age,
            address,
        });

        await newUser.save();
        res.status(201).json({ message: "Đăng ký thành công" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const refreshToken = async (req, res) => {
    try {
        const refreshToken = req.cookies?.refreshToken;
        if (!refreshToken) {
            return res.status(401).json({ message: 'No refresh token provided' });
        }

        const tokens = await authService.refreshTokens(refreshToken);

        // Gửi accessToken mới và gắn lại refreshToken mới vào cookie
        res
            .cookie('refreshToken', tokens.refreshToken, {
                httpOnly: true,
                secure: true,
                sameSite: 'Strict',
                path: '/',
                maxAge: 7 * 24 * 60 * 60 * 1000 // 7 ngày
            })
            .status(200)
            .json({
                accessToken: tokens.accessToken
            });

    } catch (error) {
        res.status(403).json({ message: error.message });
    }
};

export default  {login, logout, refreshToken, register};