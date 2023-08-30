"use client";

import { experimental_useOptimistic } from "react";
import { updateFavoriteAction } from "../actions/contactActions";
import { revalidatePath } from "next/cache";

export default function Favorite({
  favorite,
  id,
  action,
}: {
  favorite: boolean;
  id: string;
  action?: any;
}) {
  const [optimisticFavorite, changeOptimisticFavorite] =
    experimental_useOptimistic(
      {
        favorite,
        updating: false,
      },
      (state, newFavoriteStatus: boolean) => ({
        ...state,
        favorite: newFavoriteStatus,
        updating: true,
      })
    );

  return (
    <div>
      <button
        onClick={async () => {
          const newValue = !optimisticFavorite.favorite;
          changeOptimisticFavorite(newValue);
          if (!action) {
            await updateFavoriteAction(newValue, id);
          } else {
            action(newValue, id);
          }
        }}
      >
        {optimisticFavorite.favorite ? <> 💔</> : <>❤</>}
      </button>
      {optimisticFavorite.updating ? "Updating" : ""}
    </div>
  );
}
