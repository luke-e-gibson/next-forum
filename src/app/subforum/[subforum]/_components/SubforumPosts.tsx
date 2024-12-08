import {getSubforum, getSubforumPosts} from "@/server/functions";
import Link from "next/link";

export default async function SubforumPosts({ subforumId }: { subforumId: number; }) {
  const [posts, forum] = await Promise.all([ getSubforumPosts(subforumId), getSubforum(subforumId) ]);

  if(!forum) return (
    <div className="animate-pulse overflow-hidden rounded-lg bg-white shadow-md">
      <div className="bg-indigo-500 px-6 py-4 text-white">
        <h2 className="text-xl font-semibold">Subforum</h2>
      </div>
      <div className="flex items-center justify-between px-6 py-4 space-x-4">
        <div className="h-4 w-40 rounded bg-gray-200"></div>
        <div className="h-4 w-16 rounded bg-gray-200"></div>
      </div>
    </div>
  )

  return (
    <div className="overflow-hidden rounded-lg bg-white shadow-md">
      <div className="flex items-center justify-between bg-indigo-500 px-6 py-4 text-white">
        <h2 className="text-xl font-semibold">Posts in {forum.title}</h2>
        <h2 className="text-xl font-semibold">With {forum.num_posts} posts</h2>
      </div>
      <ul className="divide-y divide-gray-200">
        {posts.map((post) => (
          <li key={post.id} className="hover:bg-indigo-50">
            <Link href={`/subforum/1/post/${post.id}`} className="block px-6 py-4">
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
      </ul>
    </div>
  );
}