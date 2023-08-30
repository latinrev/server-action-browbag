import { revalidatePath } from "next/cache"

export default function Loading(){
  revalidatePath('/client')
  return <h1>Loading...</h1>
}