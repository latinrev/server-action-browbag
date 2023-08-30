"use client";
import { useEffect, useState, useTransition } from "react";
import { fetchContacts } from "../actions/contactActions";

export default function List() {
  const [isPending, startTransition] = useTransition();
  const [list, setList] = useState([]);

  useEffect(() => {
    startTransition(async () => {
      setList(await fetchContacts());
    });
  }, []);

  return (
    <>
      {list.map((curr) => (
        <>
          {curr.username}
          <br />
        </>
      ))}
    </>
  );
}
