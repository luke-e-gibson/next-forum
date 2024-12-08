"use server";
import Link from "next/link";
import { getSubforums } from "@/server/functions";

export default async function HomePage() {
  const subforums = await getSubforums();

  return (
    <div className="min-h-screen bg-gray-100">
      <main className="container mx-auto px-4 py-8">
        <div className="overflow-hidden rounded-lg bg-white shadow-md">
          <div className="flex items-center justify-between bg-indigo-500 px-6 py-4 text-white">
            <h2 className="text-xl font-semibold">Subforums</h2>
            <Link href="/subforum/create">
              <button className="mt-4 inline-block rounded border border-white px-4 py-2 text-sm leading-none text-white hover:border-transparent hover:bg-white hover:text-indigo-500 lg:mt-0">
                Create Subforum
              </button>
            </Link>
          </div>
          <ul className="divide-y divide-gray-200">
            {subforums.map((subforum) => (
              <li key={subforum.id} className="hover:bg-indigo-50">
                <Link
                  href={`/subforum/${subforum.id}`}
                  className="block px-6 py-4"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-indigo-600">
                      {subforum.title}
                    </span>
                    <span className="text-sm text-gray-500">5 posts</span>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </main>
    </div>
  );
}
