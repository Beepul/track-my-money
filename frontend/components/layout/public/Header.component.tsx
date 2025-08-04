import Link from "next/link"
import { Button } from "../../ui/button"
import ContainerComponent from "../Container.component"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "../../ui/sheet"
import { ChevronRight } from "lucide-react"

const HeaderComponent = () => {
    return (
        <header className="shadow-lg">
            <ContainerComponent cn="flex items-center justify-between gap-5">
                <div className="lg:max-w-1/4 max-w-2/3">
                    <h1>
                        <Link href={"/"} className="flex gap-2 sm:gap-3 items-center text-t2m-text-primary">
                            <span className="bg-t2m-primary p-2 text-xs inline-block text-white rounded-md font-semibold sm:text-sm">T2M</span> 
                            <span className="font-bold text-[16px] sm:text-lg">
                                Track My Money 
                            </span>
                        </Link>
                    </h1>
                </div>
                <div className="items-center">
                    <Link href={'/signin'} className="mr-5 hidden md:inline-block">Sign In</Link>
                    <Button asChild className="bg-t2m-primary border-t2m-primary border hover:bg-transparent hover:text-t2m-primary duration-300">
                        <Link href={'/register'}>Get Started</Link>
                    </Button>
                </div>  
            </ContainerComponent>

        </header>
    )
}

// const MobileMenu = () => {
   
//     return (
//         <Sheet>
//             <SheetTrigger className="cursor-pointer flex items-center justify-center">
//                 <Button variant={'ghost'} className="p-2 w-[38px] flex-col gap-[4px] h-auto items-end cursor-pointer hover:bg-transparent group">
//                     <span className={`h-[3px] w-full bg-t2m-text-primary rounded-4xl`}/>
//                     <span className={`h-[3px] bg-t2m-text-primary rounded-4xl w-3/4 group-hover:w-full transition-all duration-300`}/>
//                     <span className={`h-[3px] bg-t2m-text-primary rounded-4xl w-1/2 group-hover:w-full transition-all duration-300`}/>
//                 </Button>
//             </SheetTrigger>
//                 <SheetContent>
//                     <SheetHeader className="border-b border-gray-200">
//                         <SheetTitle >
//                             <Link href={"/"} className="text-t2m-text-primary">
//                                 Track My Money 
//                             </Link>
//                         </SheetTitle>
//                     </SheetHeader>
//                     <div className="h-full p-4 pt-0">
//                         {/* <ul className="flex flex-col gap-3 mb-4">
//                             <li>
//                                 <Link href={"#"} className="w-full inline-block hover:text-t2m-primary transition-colors duration-300">
//                                     <ChevronRight size={16} className="inline mr-1 hover:text-t2m-primary" />
//                                     Features
//                                 </Link>
//                             </li>
//                             <li>
//                                 <Link href={"#"} className="w-full inline-block hover:text-t2m-primary transition-colors duration-300">
//                                     <ChevronRight size={16} className="inline mr-1 hover:text-t2m-primary" />
//                                     Pricing
//                                 </Link>
//                             </li>
//                             <li>
//                                 <Link href={"#"} className="w-full inline-block hover:text-t2m-primary transition-colors duration-300">
//                                     <ChevronRight size={16} className="inline mr-1 hover:text-t2m-primary" />
//                                     About
//                                 </Link>
//                             </li>
//                             <li>
//                                 <Link href={"#"} className="w-full inline-block hover:text-t2m-primary transition-colors duration-300">
//                                     <ChevronRight size={16} className="inline mr-1 hover:text-t2m-primary" />
//                                     Contact
//                                 </Link>
//                             </li>
//                         </ul> */}
//                         <div className="flex items-center gap-5">
//                             <Button asChild className="bg-t2m-primary border-t2m-primary border hover:bg-transparent hover:text-t2m-primary duration-300">
//                                 <Link href={'#'}>Get Started</Link>
//                             </Button>
//                         </div>  
//                     </div>
//             </SheetContent>
//         </Sheet>
//     )
// }


export default HeaderComponent