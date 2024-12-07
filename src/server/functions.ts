"use server"
import { db } from "./db";
import * as schema from "./db/schema";

export function getPosts() {
    return db.selectFrom(schema.subfourm_post).selectAll();
}