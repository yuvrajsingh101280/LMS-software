import { clerkClient } from "@clerk/express";

// Middleware to protect educator routes
export const protectEducator = async (req, res, next) => {
    try {
        const userId = req.auth?.userId;

        if (!userId) {
            return res.status(400).json({ success: false, message: "User not authenticated" });
        }

        const response = await clerkClient.users.getUser(userId);

        if (response.publicMetadata?.role !== "educator") {
            return res.status(403).json({ success: false, message: "Unauthorized Access" }); // Also added 403 status
        }

        // ✅ Only reach here if user is educator
        next();

    } catch (error) {
        console.error("Educator middleware error:", error);
        return res.status(500).json({ success: false, message: error.message });
    }
};
