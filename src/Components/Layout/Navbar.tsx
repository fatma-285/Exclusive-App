"use client";

import { Heart, MenuIcon, ShoppingCart, User } from "lucide-react";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "../ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { signOut, useSession } from "next-auth/react";
import { Badge } from "../ui/badge";
import { useCart } from "@/context/cartContext";
import { Button } from "../ui/button";

export default function Navbar() {
  const pathName = usePathname();
  const { status } = useSession();
  const { cartDetails } = useCart();

  const Links = [
    {
      label: "Home",
      path: "/",
    },
    {
      label: "Brands",
      path: "/brands",
    },
    {
      label: "Categories",
      path: "/categories",
    },
    {
      label: "Products",
      path: "/products",
    },
  ];
  return (
    <section className="py-4">
      <div className="container mx-auto">
        <nav className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-lg font-semibold tracking-tighter">
              Exclusive
            </span>
          </Link>
          <NavigationMenu className="hidden lg:block">
            <NavigationMenuList>
              {Links.map((link, idx) => (
                <NavigationMenuItem key={idx}>
                  <Link
                    href={link.path}
                    className={cn(
                      navigationMenuTriggerStyle(),
                      pathName === link.path ? "text-red-500" : ""
                    )}
                  >
                    {link.label}
                  </Link>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
          <div className="hidden items-center gap-4 lg:flex">
            {status === "loading" ? (
              <span>Loading...</span>
            ) : status === "authenticated" ? (
              <>
                <div className="flex items-center gap-4">
                  <Link className="relative" href={"/wishlist"}>
                    <Badge
                      className="absolute -top-3 -end-3 h-5 min-w-5 rounded-full px-1 font-mono tabular-nums"
                      variant="destructive"
                    >
                      99
                    </Badge>
                    <Heart className="size-6" />
                  </Link>
                  <Link className="relative" href={"/cart"}>
                    {cartDetails && (
                      <Badge
                        className="absolute -top-3 -end-3 h-5 min-w-5 rounded-full px-1 font-mono tabular-nums"
                        variant="destructive"
                      >
                        {cartDetails?.numOfCartItems}
                      </Badge>
                    )}
                    <ShoppingCart className="size-6" />
                  </Link>
                  <DropdownMenu>
                    <DropdownMenuTrigger>
                      <User className="size-6" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuLabel>My Account</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>
                        <Link href="/profile">Profile</Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => signOut({ callbackUrl: "/login" })}
                        className="cursor-pointer"
                      >
                        Sign Out
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </>
            ) : (
              <>
                <Button variant="outline" asChild>
                  <Link href="/login">Sign in</Link>
                </Button>
                <Button asChild>
                  <Link href="/register">Sign up</Link>
                </Button>
              </>
            )}
          </div>
          <Sheet>
            <SheetTrigger asChild className="lg:hidden">
              <Button variant="outline" size="icon">
                <MenuIcon className="h-4 w-4" />
              </Button>
            </SheetTrigger>
            <SheetContent side="top" className="max-h-screen overflow-auto">
              <SheetHeader>
                <SheetTitle>
                  <Link href="/" className="flex items-center gap-2">
                    <span className="text-lg font-semibold tracking-tighter">
                      Exclusive
                    </span>
                  </Link>
                </SheetTitle>
              </SheetHeader>
              <div className="flex flex-col p-4">
                <div className="flex flex-col gap-6">
                  {Links.map((link, idx) => (
                    <Link
                      key={idx}
                      href={link.path}
                      className={cn(
                        "font-medium",
                        pathName === link.path ? "text-red-500" : ""
                      )}
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
                <div className="mt-6 flex flex-col gap-4">
                  {status === "loading" ? (
                    <span>Loading...</span>
                  ) : status === "authenticated" ? (
                    <>
                      <div className="flex items-center justify-between gap-4">
                        <Link className="relative" href={"/wishlist"}>
                          <Badge
                            className="absolute -top-2 -end-2 h-5 min-w-5 rounded-full px-1 font-mono tabular-nums"
                            variant="destructive"
                          >
                            99
                          </Badge>
                          <Heart className="size-6" />
                        </Link>
                        <Link className="relative" href={"/cart"}>
                          {cartDetails && (
                            <Badge
                              className="absolute -top-3 -end-3 h-5 min-w-5 rounded-full px-1 font-mono tabular-nums"
                              variant="destructive"
                            >
                              {cartDetails?.numOfCartItems}
                            </Badge>
                          )}
                          <ShoppingCart className="size-6" />
                        </Link>
                        <DropdownMenu>
                          <DropdownMenuTrigger>
                            <User className="size-6" />
                          </DropdownMenuTrigger>
                          <DropdownMenuContent>
                            <DropdownMenuLabel>My Account</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>
                              <Link href="/profile">Profile</Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => signOut({ callbackUrl: "/login" })}
                              className="cursor-pointer"
                            >
                              Sign Out
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                      {/* <Link href="/profile">{session?.user.name}</Link> */}
                    </>
                  ) : (
                    <>
                      <Button variant="outline" asChild>
                        <Link href="/login">Sign in</Link>
                      </Button>
                      <Button asChild>
                        <Link href="/register">Sign up</Link>
                      </Button>
                    </>
                  )}
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </nav>
      </div>
    </section>
  );
}
