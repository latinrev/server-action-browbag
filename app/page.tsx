import Link from "next/link";
const liClass =
  "hover:text-black hover:bg-white transition-all ease-in-out duration-500 p-2 hover:text-4xl shadow-md hover:shadow-white";
export default async function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center p-24 py-2  ">
      <div className="border p-10 flex flex-col items-center gap-5 h-full">
        <p className="text-2xl text-center">
          🎉NextJS Server actions are an integration of React Actions to provide
          a built-in solution for server mutations🎉
        </p>

        <ul className="flex flex-col gap-2 ">
          <li className={liClass}>
            ❌No hard refreshes, Allows for better performance, Better SEO, less
            effects and lifecycles.🚴‍♀️
          </li>
          <li className={liClass}>
            📃Eliminates the use of API routes you don't need to manually create
            API endpoints. Instead, you define asynchronous server functions
            that can be called directly from your components.📃
          </li>
          <li className={liClass}>
            💪🏼They provide progressive enhancement, allowing for users to
            interact with form and submit data even if the javascript is
            disabled, fails to load or hasn't been loaded.💪🏼
          </li>
          <li className={liClass}>
            🏭Server Actions integrate deeply with the Next.js caching and
            revalidation architecture. When a form is submitted, the Server
            Action can update cached data and revalidate any cache keys that
            should change.🏭
          </li>
          <li className={liClass}>
            🤹🏼‍♀️ Rather than being limited to a single form per route like
            traditional applications, Server Actions enable having multiple
            actions per route.🤹🏼
          </li>
          <li className={liClass}>
            💰 The browser does not need to refresh on form submission. In a
            single network roundtrip, Next.js can return both the updated UI and
            the refreshed data.💰
          </li>
        </ul>
        <div className="flex gap-5">
          <Link href="/serveronly" className="border p-5 bg-white text-black">
            Server Only Example
          </Link>
          <Link href="/client" className="border p-5 bg-white text-black">
            Client Optimistic Example
          </Link>
        </div>
      </div>
    </main>
  );
}
