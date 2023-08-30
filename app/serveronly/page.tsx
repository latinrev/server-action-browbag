import { revalidatePath, revalidateTag } from "next/cache";
import { addContactAction as addContactActionImported } from "../actions/contactActions";
import SubmitButton from "../components/Submit";
import Favorite from "../components/Favorite";

const fetchContacts = async () => {
  return await fetch("https://64eebd6f219b3e2873c37341.mockapi.io/contacts", {
    cache: "no-cache",
    next: {
      //We fetch setting tags to revalidate on demand
      tags: ["contacts"],
    },
  }).then((res) => res.json());
};

export default async function ServerOnlyExample() {
  const contacts = await fetchContacts();

  /* Server actions need the 'use server' 
  directive in top of the function body
  when creating them inside a component */

  //This is server side.
  const addContactAction = async (formData: FormData) => {
    "use server";
    //import { cookies } from 'next/headers'
    //const auth = cookies().get('authorization')?.value
    console.log(formData);
    const { firstname, username, lastname } = Object.fromEntries(
      formData.entries()
    );
    //Do server side stuff
    await fetch("https://64eebd6f219b3e2873c37341.mockapi.io/contacts", {
      method: "POST",
      body: JSON.stringify({ firstname, lastname, username }),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => res.json());
    revalidatePath("/serveronly");
  };

  const updateFavoriteAction = async (
    newFavoriteStatus: boolean,
    id: string
  ) => {
    "use server";
    console.log({
      id,
      newFavoriteStatus,
      v: `{ "favorite": ${newFavoriteStatus} }`,
    });
    await fetch(`https://64eebd6f219b3e2873c37341.mockapi.io/contacts/${id}`, {
      method: "PUT",
      body: JSON.stringify({ favorite: newFavoriteStatus }),
      headers: {
        "Content-Type": "application/json",
      },
      next: { tags: ["contacts"] },
    });
    revalidatePath("/serverOnly");
  };

  return (
    <div className="px-24">
      {/* action={} is where the magic happens */}
      <form
        action={addContactAction}
        className="flex flex-col gap-2"
        //This allows the form to re render
        key={Math.random()}
      >
        <label>First Name</label>
        <input defaultValue="" name="firstname" required />
        <label>Last Name</label>
        <input defaultValue="" name="lastname" required />
        <label>Username</label>
        <input defaultValue="" name="username" required />
        <SubmitButton text="Add Contact" />
      </form>
      <div className="grid grid-cols-2 gap-5 p-5">
        {contacts.map((contact) => (
          <div className="border rounded p-5">
            <h1 className="text-xl">{contact.username}</h1>
            <h1>
              {contact.firstname} {contact.lastname}
            </h1>
            <Favorite
              favorite={contact.favorite}
              id={contact.id}
              action={updateFavoriteAction}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
