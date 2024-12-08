"use server"

import {getSubforum, getSubforumPosts} from "@/server/functions";
import SubforumPosts from "@/app/subforum/[subforum]/_components/SubforumPosts";
import {Suspense} from "react";

export default async function Page({params}:  {params: Promise<{subforum: number}>}) {
  const slug = (await params).subforum

  return (
      <div className="container mx-auto px-4 py-8">
        <Suspense>
            <SubforumPosts subforumId={slug}/>
        </Suspense>
      </div>
  )
}