import * as React from "react"
import Link from "next/link"
import { UserButton } from "@clerk/nextjs"
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from "@/components/ui/menubar"
import { MenuIcon } from "lucide-react"


function Navbar() {
  return (
    <nav className="flex p-2 justify-between bg-slate-800 items-center text-white">
      <div className="flex items-center gap-2">
        <Menubar className="text-white bg-transparent border-0">
          <MenubarMenu>
            <MenubarTrigger>
              <MenuIcon size={24} />
            </MenubarTrigger>
            <MenubarContent>
              <MenubarItem asChild>
                <Link href="/">
                  Home
                </Link>
              </MenubarItem>
              <MenubarItem asChild>
                <Link href="/workouts">
                  Workouts
                </Link>
              </MenubarItem>
            </MenubarContent>
          </MenubarMenu>
        </Menubar>
        <div>Daily reps</div>
      </div>
      <UserButton />
    </nav>
  )
}

export default Navbar
