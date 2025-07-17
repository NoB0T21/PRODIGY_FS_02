'use server'

import { revalidateTag } from "next/cache";

export async function revalidateFilesPage() {
  revalidateTag('employes'); 
}