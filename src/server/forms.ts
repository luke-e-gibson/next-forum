"use server"

import {redirect} from "next/navigation";
import {createSubforum, createSubforumPost} from "@/server/functions";

export async function createSubforumFormPost(formData: FormData) {
    const name = formData.get("title") as string;
    const description = formData.get("description") as string;
    const forum = formData.get("subforum") as string;

    await createSubforumPost({title: name, description: description, subfourm_id: Number(forum), created_by: 1});

    redirect("/subforum/1")
}

export async function createSubforumForm(formData: FormData) {
    const name = formData.get("title") as string;
    const description = formData.get("description") as string;

    await createSubforum({title: name, description: description});

    redirect("/")
}