import SearchBar from "../components/SearchBar";
import Favorite from "../components/Favorite";
import List from "../components/List";

//OPTIMISTIC UPDATES
//USE TRANSITION UPDATES

export default async function ClientExample({ params, searchParams }) {
  const { search } = searchParams;
  const url = new URL("https://64eebd6f219b3e2873c37341.mockapi.io/contacts");
  if (search) url.searchParams.append("firstname", searchParams.search);
  const contacts = await fetch(url, {}).then((res) => res.json());

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div>
        <List></List>
        <SearchBar />
        <div
          className={`${
            contacts.length > 0 ? "grid grid-cols-2" : ""
          } gap-5 p-5`}
        >
          {contacts.length > 0 ? (
            contacts.map((contact) => (
              <div className="border rounded p-5">
                <h1 className="text-xl">{contact.username}</h1>
                <h1>
                  {contact.firstname} {contact.lastname}
                </h1>
                <Favorite favorite={contact.favorite} id={contact.id} />
              </div>
            ))
          ) : (
            <h1 className="text-center w-full">
              No user first name found under {search}
            </h1>
          )}
        </div>
      </div>
    </main>
  );
}
