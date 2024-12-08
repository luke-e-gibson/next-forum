import {
  getSubforumPost,
  getSubforumPostComments,
  getSubforumPosts,
} from "@/server/functions";
import Link from "next/link";
import { unstable_cacheLife as cacheLife } from 'next/cache'
export default async function Page({
  params,
}: {
  params: Promise<{ post: number }>;
}) {
  const postId = (await params).post;
  const [post, comments] = await Promise.all([
    getSubforumPost(postId),
    getSubforumPostComments(postId),
  ]);

  if (!post) return;
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="overflow-hidden rounded-lg bg-white shadow-md">
        <div>
          <div className="flex items-center justify-between bg-indigo-500 px-6 py-4 text-white">
            <h2 className="text-xl font-semibold">{post.title}</h2>
            <h2 className="text-xl font-semibold">
              Created On {new Date(post.created_at).toLocaleDateString()} By{" "}
              {post.profile.username}
            </h2>
          </div>
          <div className="px-6 py-4">{post.description}</div>
        </div>
        <ul className="divide-y divide-gray-200">
          {comments.map((comment) => (
            <div key={comment.id} className="hover:bg-indigo-50">
              <div className="flex items-center justify-between bg-indigo-500 px-6 py-4 text-white">
                <p>{comment.comment}</p>
                <p className="text-sm font-semibold">
                  <Link href={`/user/${comment.profile.id}`}>
                    {comment.profile.username}
                  </Link>{" "}
                  Commented On{" "}
                  {new Date(comment.created_at).toLocaleDateString()}
                </p>
              </div>
            </div>
          ))}
        </ul>
      </div>
    </div>
  );
}
