import { NextResponse } from "next/server";
import crypto from "crypto";

export async function GET() {
    // Generate a random API key (32 characters long)
    const { v4: uuidv4 } = require("uuid");
    const apiKey: string = crypto.randomBytes(16).toString("hex");

    return NextResponse.json({ apiKey }, { status: 200 });
}
