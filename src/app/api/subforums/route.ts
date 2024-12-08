"use server"
import {type NextRequest, NextResponse} from "next/server";
import {getSubforums} from "@/server/functions";

export async function GET(request: NextRequest) {
    const subForums = await getSubforums();
    const forums = subForums.map(forum => ({id: forum.id, name: forum.title}));
    return NextResponse.json(forums);
}