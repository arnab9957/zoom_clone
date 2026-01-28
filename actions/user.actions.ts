"use server";

import { auth, clerkClient, currentUser } from "@clerk/nextjs/server";

export const updateUserProfile = async (userData: {
    firstName: string;
    lastName: string;
    dateOfBirth?: string;
}) => {
    const { userId } = await auth();

    if (!userId) {
        throw new Error("User not found");
    }

    const client = await clerkClient();

    try {
        await client.users.updateUser(userId, {
            firstName: userData.firstName,
            lastName: userData.lastName,
            publicMetadata: {
                dateOfBirth: userData.dateOfBirth,
            },
        });

        return { success: true };
    } catch (error) {
        console.error("Error updating user:", error);
        throw new Error("Failed to update user profile");
    }
};
