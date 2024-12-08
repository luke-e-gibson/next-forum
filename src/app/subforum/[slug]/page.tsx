import {getSubforum, getSubforumPosts} from "@/server/functions";

export default async function Page({params}:  {params: Promise<{slug: number}>}) {
  const slug = (await params).slug
  const [ subForum, subForumposts ] = await Promise.all([getSubforum(slug), getSubforumPosts(slug)])

  return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6 text-indigo-700">Subforum: {params.id}</h1>
        <SubforumPosts subforumId={subForum.id}/>
      </div>
  )
}