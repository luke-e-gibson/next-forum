"use server"

import { redirect } from "next/navigation";
import { createSubforum, createSubforumPost, createSubforumPostComment } from "@/server/functions";
import { revalidateTag } from "next/cache";

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

export async function createPostComment(formData: FormData) {
    const comment = formData.get("comment") as string;
    const postId = formData.get("post_id") as string;
    const subforumId = formData.get("sub_id") as string;

    if(!comment || !postId) return;

    await createSubforumPostComment({comment, title: "", post_id: Number(postId), created_by: 1})
    revalidateTag("functionsComments")
    redirect(`/subforum/${subforumId}/post/${postId}`)
}