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

const logout = async (refreshToken) => {
    if (!refreshToken) throw new Error("Refresh token is required");

    let decoded;
    try {
        decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
    } catch (err) {
        throw new Error("Invalid refresh token");
    }

    const user = await User.findById(decoded.id);
    if (!user) throw new Error("User not found");

    // Kiểm tra token có khớp không (chống token giả mạo)
    if (user.refreshToken !== refreshToken) {
        throw new Error("Token mismatch");
    }

    user.refreshToken = null;
    await user.save();
};

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