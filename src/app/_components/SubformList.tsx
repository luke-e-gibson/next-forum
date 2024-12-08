"use server";
import { getSubforums } from "@/server/functions";
import Link from "next/link";

export async function SubforumsList() {
  const subforums = await getSubforums();

  return (
    <div className="overflow-hidden rounded-lg bg-white shadow-md">
      <div className="bg-indigo-500 px-6 py-4 text-white">
        <h2 className="text-xl font-semibold">Subforums</h2>
      </div>
      <ul className="divide-y divide-gray-200">
        {subforums.map((subforum) => (
          <li key={subforum.id} className="hover:bg-indigo-50">
            <Link href={`/subforum/${subforum.id}`} className="block px-6 py-4">
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
  );
}
