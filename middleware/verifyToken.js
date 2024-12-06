import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
    try {
        // Safely access the token using optional chaining
        const token = req.cookies?.token;
        // If no token is provided, return a 401 Unauthorized response
        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized - No token provided",
            });
        }

        // Verify the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Attach the user ID to the request object for future use
        req.userId = decoded.userId;

        // Call the next middleware
        next();
    } catch (error) {
        console.error("Error in verifyToken:", error.message);

        // Handle token verification errors specifically
        if (error.name === "JsonWebTokenError") {
            return res.status(401).json({
                success: false,
                message: "Invalid token",
            });
        }

        // Handle token expiration error
        if (error.name === "TokenExpiredError") {
            return res.status(401).json({
                success: false,
                message: "Token expired",
            });
        }

        // For all other errors, return a generic server error
        return res.status(500).json({
            success: false,
            message: "Server error",
        });
    }
};
