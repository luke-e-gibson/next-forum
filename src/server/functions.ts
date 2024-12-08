"use server"
import exp from "constants";
import { db } from "./db";
import * as schema from "./db/schema";

//Subforums
export async function getSubforums() {
    return db.query.subfourm.findMany();
}

export async function getSubforum(id: number) {
    return db.query.subfourm.findFirst({
        where: (subfourm, {eq}) => eq(subfourm.id, id)
    }); 
}

export type CreateSubforumInput = {
    title: string;
    description: string;
}

export async function createSubforum(subfourm: CreateSubforumInput) {
    return db.insert(schema.subfourm).values({...subfourm});
}

// Subforum Posts

export async function getSubforumPost(id: number) {
    return db.query.subfourm_post.findFirst({
        where: (subfourm_post, {eq}) => eq(subfourm_post.id, id),
        with: {
            post_comment: true
        }
    });
}

export async function getSubforumPosts(subfourm_id: number) {
    return db.query.subfourm_post.findMany({
        where: (subfourm_post, {eq}) => eq(subfourm_post.subfourm_id, subfourm_id),
        with: {
            post_comment: true
        }
    });
}

export type CreateSubforumPostInput = {
    subfourm_id: number;
    title: string;
    description: string;
}

export async function createSubforumPost(subfourm_post: CreateSubforumPostInput) {
    return db.insert(schema.subfourm_post).values({...subfourm_post});
}
// Subforum Post Comments

export async function getSubforumPostComment(id: number) {
    return db.query.post_comment.findFirst({
        where: (post_comment, {eq}) => eq(post_comment.id, id)
    });
}

export type CreateSubforumPostCommentInput = {
    post_id: number;
    comment: string;
}

export async function createSubforumPostComment(post_comment: CreateSubforumPostCommentInput) {
    return db.insert(schema.post_comment).values({...post_comment});
}
