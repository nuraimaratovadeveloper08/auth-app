import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== "POST") {
        return res.status(405).json({ message: "Method Not Allowed" });
    }

    const { username, password } = req.body;

    // Эмуляция запроса к BFF (Beeceptor)
    try {
        const response = await fetch("https://auth-api.free.beeceptor.com/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ username, password }),
        });

        if (!response.ok) {
            return res.status(response.status).json({ message: "Login failed" });
        }

        const data = await response.json();

        res.setHeader(
            "Set-Cookie",
            `token=${data.token}; HttpOnly; Path=/; Max-Age=3600; SameSite=Strict`
        );

        return res.status(200).json({ message: "Login successful" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}
