import {SubforumsList} from "@/app/_components/SubformList";
import {Suspense} from "react";

function SubforumsListFallback() {
  return (
    <div className="animate-pulse overflow-hidden rounded-lg bg-white shadow-md">
      <div className="bg-indigo-500 px-6 py-4 text-white">
        <h2 className="text-xl font-semibold">Subforums</h2>
      </div>
      <ul className="divide-y divide-gray-200">
        {[...Array(1)].map((_, index) => (
          <li key={index} className="px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="h-4 w-40 rounded bg-gray-200"></div>
              <div className="h-4 w-16 rounded bg-gray-200"></div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-100">
      <main className="container mx-auto px-4 py-8">
        <Suspense fallback={<SubforumsListFallback />}>
          <SubforumsList />
        </Suspense>
      </main>
    </div>
  );
}
