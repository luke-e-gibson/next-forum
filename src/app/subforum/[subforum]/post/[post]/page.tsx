import {
  getSubforumPost,
  getSubforumPostComments,
  getSubforumPosts,
} from "@/server/functions";
import Link from "next/link";
import Form from "next/form";
import { createPostComment } from "@/server/forms";
import {SignedIn} from "@clerk/nextjs";
import {Suspense} from "react";

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
            <Suspense>
              <h2 className="text-xl font-semibold">
                Created On {new Date(post.created_at).toLocaleDateString()} By{" "}
                {post.profile.username}
              </h2>
            </Suspense>
          </div>
          <div className="px-6 py-4">{post.description}</div>
         <Suspense>
           <SignedIn>
             <hr />
             <Form action={createPostComment}>
               <div className="flex w-full justify-end px-4 py-4">
                 <input
                     type="text"
                     name="comment"
                     id="comment"
                     required
                     min={2}
                     maxLength={250}
                     className="w-full rounded-l border-b border-l border-t px-3 py-2 text-gray-700"
                     placeholder="Comment"
                 />
                 <input
                     type="hidden"
                     name="post_id"
                     id="post_id"
                     value={postId}
                 />
                 <input
                     type="hidden"
                     name="sub_id"
                     id="sub_id"
                     value={post.subfourm_id}
                 />
                 <button
                     type="submit"
                     className="rounded-r border px-3 py-2 transition hover:bg-indigo-500 hover:text-white"
                 >
                   Comment
                 </button>
               </div>
             </Form>
           </SignedIn>
         </Suspense>
        </div>
        <ul className="divide-y divide-gray-200">
         <Suspense>
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
         </Suspense>
        </ul>
      </div>
    </div>
  );
}
