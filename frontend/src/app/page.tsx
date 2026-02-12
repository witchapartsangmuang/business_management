'use client'
import { AuthService } from "@/features/services/auth";
import Image from "next/image";
import { redirect } from "next/navigation";
export default function Home() {
  // redirect("/dashboard/executive");
  async function refreshToken() {
    const res = await AuthService.refresh()
  }
  return (
      <button onClick={()=>{refreshToken()}}>Main</button>
  );
}
