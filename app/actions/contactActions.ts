"use server";

import { revalidatePath, revalidateTag } from "next/cache";

//Use server directive in top of file will append to any exported server actions

export const updateFavoriteAction = async (
  newFavoriteStatus: boolean,
  id: string
) => {
  await fetch(`https://64eebd6f219b3e2873c37341.mockapi.io/contacts/${id}`, {
    method: "PUT",
    body: JSON.stringify({ favorite: newFavoriteStatus }),
    headers: {
      "Content-Type": "application/json",
    },
    next: { tags: ["contacts"] },
  }).then((res) => res.json());
  revalidatePath("/client");
};

export const addContactAction = async (formData: FormData) => {
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
  //revalidateTag("contacts");
};

export const fetchContacts = async () => {
  return await fetch("https://64eebd6f219b3e2873c37341.mockapi.io/contacts", {
    cache: "no-cache",
    next: {
      //We fetch setting tags to revalidate on demand
      tags: ["contacts"],
    },
  }).then((res) => res.json());
};
