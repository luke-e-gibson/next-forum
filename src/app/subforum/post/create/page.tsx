"use client"

import Form from 'next/form';
import {Suspense, useCallback, useEffect, useState} from "react";
import Select from 'react-select'
import {createSubforumFormPost} from "@/server/forms";

export default function CreatePostPage() {
  const [isClient, setIsClient] = useState(false)
  const [subforums, setSubforums] = useState<Array<{value: string, label: string}>>();

  const getForums = useCallback(async () => {
    const request = (await fetch("http://localhost:3000/api/subforums", {cache: "force-cache", method: "GET"}));
    const forums = await request.json() as Array<{id: number, name: string}>

    const options = forums.map((forum) => ({
      value: forum.id.toString(),
      label: forum.name,
    }))

    void setSubforums(options);
  }, [setSubforums])

  useEffect(() => {
    setIsClient(true)
    getForums().catch(console.error);
  }, [getForums]);

  return (
      <div className="container mx-auto px-4 py-8">
        <div className="overflow-hidden rounded-lg bg-white shadow-md">
          <div className="flex items-center justify-center bg-indigo-500 px-6 py-4 text-white">
            <h2 className="text-xl font-semibold text-center">Create Post</h2>
          </div>
          <div className="px-6 py-4">
            <Form action="" onSubmit={(event) => {
                  event.preventDefault();
                  void createSubforumFormPost(new FormData(event.target as HTMLFormElement))
                }}>
              <div className="mb-4">
                <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="title">
                  Title
                </label>
                <input
                    min={2}
                    required
                    maxLength={20}
                    className="w-full px-3 py-2  text-gray-700 border rounded shadow"
                    id="title"
                    name="title"
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="description">
                  Description
                </label>
                <input
                    maxLength={500}
                    className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                    id="description"
                    name="description"

                />
              </div>
              <div className="mb-4">
                <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="subforum">
                  Subforum
                </label>
                <Suspense>
                  {isClient ? <Select name="subforum" id="subforum" options={subforums}/> : <></>}
                </Suspense>
              </div>
              <div className="mb-4">
                <button
                    type="submit"
                    className="w-full border border-indigo-500 rounded px-3 py-2 text-indigo-500 hover:bg-indigo-500 hover:text-white transition motion-reduce:transition-none">Create
                  Post
                </button>
              </div>
            </Form>
          </div>
        </div>
      </div>
  );
}
