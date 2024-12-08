"use client"

import {useCallback, useEffect, useState} from "react";
import Select from 'react-select'

export default function CreatePostPage() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isClient, setIsClient] = useState(false)
  const [subforum, setSubforum] = useState("");
  const [subforums, setSubforums] = useState<Array<{value: string, label: string}>>();

  const getForums = useCallback(async () => {
    const request = (await fetch("http://localhost:3000/api/subforums", {cache: "force-cache", method: "GET"}));
    const forums = await request.json() as Array<{id: number, name: string}>

    const options = forums.map((forum) => ({
      value: forum.name,
      label: forum.name,
    }))

    void setSubforums(options);
  }, [setSubforums])

  useEffect(() => {
    setIsClient(true)
  }, [])

  useEffect(() => {
    getForums().catch(console.error);
  }, [getForums]);

  return (
      <div className="container mx-auto px-4 py-8">
        <h1>{isClient ? 'This is never prerendered' : 'Prerendered'}</h1>
        <div className="overflow-hidden rounded-lg bg-white shadow-md">
          <div className="flex items-center justify-center bg-indigo-500 px-6 py-4 text-white">
            <h2 className="text-xl font-semibold text-center">Create Post</h2>
          </div>
          <div className="px-6 py-4">
            <div>
              <div className="mb-4">
                <label className="block mb-2 text-sm font-bold text-gray-700 text-lg" htmlFor="title">
                  Title
                </label>
                <input
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full px-3 py-2  text-gray-700 border rounded shadow"
                    id="title"
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2 text-sm font-bold text-gray-700 text-lg" htmlFor="title">
                  Description
                </label>
                <input
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                    id="title"
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2 text-sm font-bold text-gray-700 text-lg" htmlFor="title">
                  Subforum
                </label>
                {isClient ? <Select options={subforums} onChange={(e) => setSubforum(e.value)}/> : <></>}
              </div>
              <div className="mb-4">
                <button
                    className="w-full border border-indigo-500 rounded px-3 py-2 text-indigo-500 hover:bg-indigo-500 hover:text-white transition motion-reduce:transition-none">Create
                  Post
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
}
