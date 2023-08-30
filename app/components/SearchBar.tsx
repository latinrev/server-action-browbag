"use client";

import { useRouter, usePathname } from "next/navigation";
import {  useTransition,} from "react";
interface SearchProps {
  className?: React.ComponentProps<"div">["className"];
}
export default function SearchBar({ className }: SearchProps) {
  const { replace } = useRouter();
  const pathName = usePathname();
  const [isPending, startTransition] = useTransition();

  let handleSearch = (value: string) => {
    let params = new URLSearchParams(window.location.search);
    if (value) {
      params.set("search", value);
    } else {
      params.delete("search");
    }
    params.delete("page");
    startTransition(() => {
      replace(`${pathName}?${params.toString()}`);
    });
  };

  return (
    <div className="flex items-center justify-center">
      <input
        placeholder="Search for an user"
        type="text"
        onChange={(e) => handleSearch(e.currentTarget.value)}
        className="h-full p-3"
      />
    </div>
  );
}
