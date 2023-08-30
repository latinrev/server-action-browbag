"use client";

import { experimental_useFormStatus } from "react-dom";
//This has to be clientside since we cannot add interactivity handlers inside async components
export default function SubmitButton({ text }: { text: string }) {
  const { pending } = experimental_useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="border rounded border-white p-2 mt-5"
    >
      {pending ? "Adding Contact..." : text}
    </button>
  );
}
