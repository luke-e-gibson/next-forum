"use server";
import { unstable_cacheLife as cacheLife } from 'next/cache'
import { getSubforum, getSubforumPosts } from "@/server/functions";
import Link from "next/link";
import {Suspense} from "react";

export default async function Page({
  params,
}: {
  params: Promise<{ subforum: number }>;
}) {
  const slug = (await params).subforum;
  const [posts, forum] = await Promise.all([
    getSubforumPosts(slug),
    getSubforum(slug),
  ]);

  if (!forum)
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="animate-pulse overflow-hidden rounded-lg bg-white shadow-md">
          <div className="bg-indigo-500 px-6 py-4 text-white">
            <h2 className="text-xl font-semibold">Subforum</h2>
          </div>
          <div className="flex items-center justify-between space-x-4 px-6 py-4">
            <div className="h-4 w-40 rounded bg-gray-200"></div>
            <div className="h-4 w-16 rounded bg-gray-200"></div>
          </div>
        </div>
      </div>
    );

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="overflow-hidden rounded-lg bg-white shadow-md">
        <div className="flex items-center justify-between bg-indigo-500 px-6 py-4 text-white">
          <h2 className="text-xl font-semibold">Posts in {forum.title}</h2>
          <h2 className="text-xl font-semibold">{forum.num_posts} posts</h2>
          <Link href="/subforum/post/create">
            <button className="mt-4 inline-block rounded border border-white px-4 py-2 text-sm leading-none text-white hover:border-transparent hover:bg-white hover:text-indigo-500 lg:mt-0">
              Create Post
            </button>
          </Link>
        </div>
        <ul className="divide-y divide-gray-200">
          <Suspense>
            {posts.map((post) => (
                <li key={post.id} className="hover:bg-indigo-50">
                  <Link
                      href={`/subforum/1/post/${post.id}`}
                      className="block px-6 py-4"
                  >
                    <div className="flex items-center justify-between">
                  <span className="font-medium text-indigo-600">
                    {post.title}
                  </span>
                      <span className="text-sm text-gray-500">10 comments</span>
                    </div>
                    <div className="mt-2 text-sm text-gray-500">
                      Posted by {post.profile.username} on{" "}
                      {new Date(post.created_at).toLocaleDateString()}
                    </div>
                  </Link>
                </li>
            ))}
          </Suspense>
        </ul>
      </div>
    </div>
  );
}
