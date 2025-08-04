import FooterComponent from "@/components/layout/public/Footer.component";
import HeaderComponent from "@/components/layout/public/Header.component";
import { Check } from "lucide-react";


export default function AuthLayout({children}: {
    children: React.ReactNode
}) {
    return (
        <main>
            <HeaderComponent />
            <div className="flex items-stretch flex-col-reverse lg:flex-row">
                <div className="bg-t2m-primary text-white w-full lg:flex-1/2 flex items-center justify-center flex-col py-16 px-4 lg:py-36 lg:px-10 lg:min-h-[calc(100vh-68px)]">
                    <span className="h-16 w-16 p-4 flex items-center justify-center bg-[#3C9DB6] rounded-full mb-6">
                        <span className="font-bold">T2M</span>
                    </span>
                    <h2 className="font-bold text-xl mb-4">Track My Money</h2>
                    <p className="text-gray-300 mb-5 lg:text-lg lg:max-w-2/3 text-center">Take control of your finances with smart tracking and insights</p>
                    <ul className="flex flex-col text-center">
                        <li className="text-sm mb-3 lg:mb-3 2xl:mb-4 ">
                            <span className="h-4 w-4 inline-flex items-center justify-center bg-t2m-secondary rounded-full mr-1"><Check size={10} color="#fff" /></span>
                            Track income and expenses effortlessly</li>
                        <li className="text-sm mb-3 lg:mb-3 2xl:mb-4 ">
                            <span className="h-4 w-4 inline-flex items-center justify-center bg-t2m-secondary rounded-full mr-1"><Check size={10} color="#fff" /></span>
                            Visualize your spending patterns</li>
                        <li className="text-sm mb-3 lg:mb-3 2xl:mb-4 ">
                            <span className="h-4 w-4 inline-flex items-center justify-center bg-t2m-secondary rounded-full mr-1"><Check size={10} color="#fff" /></span>
                            Plan your expenses</li>
                        <li className="text-sm mb-3 lg:mb-3 2xl:mb-4 ">
                            <span className="h-4 w-4 inline-flex items-center justify-center bg-t2m-secondary rounded-full mr-1"><Check size={10} color="#fff" /></span>
                            Set budgets and achieve financial goals</li>
                    </ul>
                </div>
                <div className="lg:flex-1/2 w-full flex items-center justify-center px-4 md:px-6 py-16">
                    {children}
                </div>
            </div>
            <FooterComponent />
        </main>
    )
}