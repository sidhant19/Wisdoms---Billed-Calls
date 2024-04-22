"use client";
import { Button } from "@/components/ui/button"
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
  } from "@/components/ui/sheet"
import { Menu } from 'lucide-react' 


export default function Header() {
    return (
        
        <header className="fixed  w-full backdrop-blur-md bg-opacity-50 flex justify-between items-center py-4 px-5p ">
            
            
            <div className="md:hidden lg:hidden">
                <Sheet>
                    <SheetTrigger asChild>
                        <Menu className="h-10 w-10 cursor-pointer" />
                    </SheetTrigger>
                    <SheetContent>
                        <SheetHeader>
                            <SheetTitle>Menu</SheetTitle>
                        </SheetHeader>
                        <nav className="animate-slide-up-fade-in">
                            <ul className="">
                                <li><a href="#"></a></li>
                                <li><a href="#"><Button variant="ghost">Find Experts</Button></a></li>
                                <li><a href="#"><Button variant="ghost">How it Works</Button></a></li>
                                <li><a href="#"><Button variant="ghost">Become an Expert</Button></a></li>  
                            </ul>
                        </nav>
                    </SheetContent>

                </Sheet>  
            </div>
            <div className="flex text-4xl mr-5p">
                
                <div className="cursor-default hidden lg:block md:block">
                    <span className="text-white">W</span>
                    <span className="text-rose-500 font-extrabold">.</span> 
                </div>
                <div className="md:hidden lg:hidden cursor-default absolute top-4 left-1/2 transform -translate-x-1/2">
                    <span className="text-white">W</span>
                    <span className="text-rose-500 font-extrabold">.</span> 
                </div>
            </div>
            <nav className="hidden lag:block md:block absolute top-4 left-1/2 transform -translate-x-1/2">
                <ul className="inline-flex px-5">
                    <li><a href="#"><Button variant="ghost">Find Experts</Button></a></li>
                    <li><a href="#"><Button variant="ghost">How it Works</Button></a></li>
                    <li><a href="#"><Button variant="ghost">Become an Expert</Button></a></li>  
                </ul>
            </nav>
            <div>

                <ul className="inline-flex  space-x-5">
                    <li className="hidden md:block"><a href="login"><Button variant="ghost">Login</Button></a></li>
                    <li ><a href="signup"><Button>Sign Up</Button></a></li>
                     
                </ul>
            </div>
        </header>
    )
}