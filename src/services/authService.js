import jwt from 'jsonwebtoken';
import bcryptjs from 'bcryptjs';
import User from "../models/user.js";

const createAccessToken = (user) => {
    return jwt.sign(
        { id: user._id, email: user.email, role: user.role },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN }
    );
};

const createRefreshToken = (user) => {
    return jwt.sign({ id: user._id }, process.env.REFRESH_TOKEN_SECRET, {
        expiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN
    });
};

const login = async (email, password) => {
    const user = await User.findOne({ email });
    if (!user) {
        throw new Error("Bad credentials");
    }
    const isMatch = await bcryptjs.compare(password,user.password);
    if (!isMatch) {
        throw new Error("Bad Credentials");
    }
    const accessToken = await createAccessToken(user);
    const refreshToken = await createRefreshToken(user);
    user.refreshToken = refreshToken;
    await user.save();
    return {user, accessToken, refreshToken };
}

const logout = async (req, res) => {
    const refreshToken = req.cookies?.refreshToken;
    if (!refreshToken) {
        throw new Error("Bad credentials");
    }
    const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
    const user = await User.findById(decoded.id);
    if (!user) {
        throw new Error("Bad credentials");
    }
    user.refreshToken = null;
    await user.save();
    res.clearCookie("refreshToken",{
        httpOnly: true,
        secure: true,
        sameSite: 'Strict',
        expiresIn: 0
        }
        );
    res.clearCookie("accessToken",{
        httpOnly: true,
        secure: true,
        sameSite: 'Strict',
        expiresIn: 0
    })
    res.status(200).json({
        message: 'Logged out',
    });
}

const refreshTokens = async (refreshToken) => {
    try {
        const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);

        const user = await User.findById(decoded.id);
        if (!user || user.refreshToken !== refreshToken) {
            throw new Error('Invalid refresh token');
        }

        const newAccessToken = jwt.sign(
            { id: user._id, email: user.email, role: user.role },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN }
        );

        const newRefreshToken = jwt.sign(
            { id: user._id },
            process.env.REFRESH_TOKEN_SECRET,
            { expiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN }
        );

        user.refreshToken = newRefreshToken;
        await user.save();

        return {
            accessToken: newAccessToken,
            refreshToken: newRefreshToken
        };

    } catch (err) {
        throw new Error('Invalid or expired refresh token');
    }
};
export default {login, logout, refreshTokens};