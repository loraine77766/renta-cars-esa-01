'use client';

import Link from 'next/link';
import { Car, LifeBuoy, CarFront, HelpCircle, Menu, Moon, Sun } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { useTheme } from 'next-themes';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

function ThemeToggle() {
    const { setTheme } = useTheme()

    return (
        <DropdownMenu>
        <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
            <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span className="sr-only">Toggle theme</span>
            </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => setTheme("light")}>
            Claro
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTheme("dark")}>
            Oscuro
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTheme("system")}>
            Sistema
            </DropdownMenuItem>
        </DropdownMenuContent>
        </DropdownMenu>
    )
}


export default function Header() {
  const navLinks = [
    { href: "/", label: "Inicio", icon: <CarFront className="h-4 w-4" /> },
    { href: "/autos", label: "Autos", icon: <CarFront className="h-4 w-4" /> },
    { href: "/preguntas-frecuentes", label: "Preguntas Frecuentes", icon: <HelpCircle className="h-4 w-4" /> },
    { href: "https://wa.me/15879120936", label: "Soporte", icon: <LifeBuoy className="h-4 w-4" />, target: "_blank" },
  ];

  return (
    <header className="bg-card shadow-sm sticky top-0 z-40">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2 text-primary hover:text-opacity-80 transition-colors">
            <Car className="h-7 w-7" />
            <span className="font-headline text-2xl font-bold">Renta Cars ESA</span>
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-2">
            {navLinks.map((link) => (
               <Button variant="ghost" asChild key={link.href}>
                <Link href={link.href} target={link.target} className="flex items-center gap-2">
                    {link.icon}
                    <span>{link.label}</span>
                </Link>
            </Button>
            ))}
            <ThemeToggle />
          </nav>

          {/* Mobile Navigation */}
          <div className="md:hidden flex items-center">
             <ThemeToggle />
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Abrir menú</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right">
                <nav className="flex flex-col gap-4 mt-8">
                  {navLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      target={link.target}
                      className="text-lg font-medium flex items-center gap-3 p-2 rounded-md hover:bg-accent"
                    >
                      {link.icon}
                      {link.label}
                    </Link>
                  ))}
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
