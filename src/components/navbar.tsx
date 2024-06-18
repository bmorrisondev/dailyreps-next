import * as React from "react"
import Link from "next/link"
import { UserButton } from "@clerk/nextjs"

function Navbar() {
  return (
    <nav className="flex p-2 justify-between bg-slate-800 items-center text-white">
      <div>Daily reps</div>
      <UserButton />
    </nav>
  )
}

export default Navbar
