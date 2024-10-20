"use client"

import * as React from "react"

import { Button } from "@/components/ui/button"
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu"
import { Menu } from "lucide-react"
import { Link } from 'react-router-dom';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const navigationLinkStyle = "group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50"

  return (
    <header className="bg-background border-b">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="text-2xl font-bold text-pink-900 hover:text-pink-950">
          CuisineCraft 🍕
          </Link>
          <nav className="hidden md:flex items-center space-x-4">
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuLink className={navigationLinkStyle} href="/">
                    Recipes
                  </NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuLink className={navigationLinkStyle} href="/add-recipe">
                    Add Recipe
                  </NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuLink className={navigationLinkStyle} href="/bookmarked">
                    Bookmarked Recipes
                  </NavigationMenuLink>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
            <Button variant="outline" >
              <Link to="/">Sign Up</Link>
            </Button>
            <Button className="bg-blue-500 hover:bg-blue-600">
              <Link to="/" className="text-white hover:text-white">Log In</Link>
            </Button>
          </nav>
          <Button variant="ghost" size="icon" className="md:hidden" onClick={toggleMenu}>
            <Menu className="h-6 w-6" />
            <span className="sr-only">Toggle menu</span>
          </Button>
        </div>
      </div>
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link to="/" className="block px-3 py-2 rounded-md text-base font-medium text-primary hover:bg-accent hover:text-accent-foreground">
              Recipes
            </Link>
            <Link to="/add-recipe" className="block px-3 py-2 rounded-md text-base font-medium text-primary hover:bg-accent hover:text-accent-foreground">
              Add Recipe
            </Link>
            <Link to="/bookmarked" className="block px-3 py-2 rounded-md text-base font-medium text-primary hover:bg-accent hover:text-accent-foreground">
            Bookmarked Recipes
            </Link>
            <Link to="/" className="block px-3 py-2 rounded-md text-base font-medium text-primary hover:bg-accent hover:text-accent-foreground">
              Sign Up
            </Link>
            <Link  to="/" className="block px-3 py-2 rounded-md text-base font-medium text-primary hover:bg-accent hover:text-accent-foreground text-white">
              Log In
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}