import Link from "next/link";
import { Button } from "../../ui/button";
import ContainerComponent from "../Container.component";
import { ArrowLeftRight, ChartNoAxesCombined, Check } from "lucide-react";
import Image from "next/image";
import bannerImg from "@/public/images/banner-1.jpg";

export default function BannerComponent () {
    return (
        <div className="bg-t2m-bg-primary">
            <ContainerComponent cn="flex gap-24 items-center">
                <div className="flex-1/2 py-16 md:py-20 xl:py-32 text-center lg:text-left">
                    <h2 className="text-t2m-text-primary font-bold text-4xl md:text-6xl mb-2 md:mb-8">Take Control of Your <span className="text-t2m-primary">Finances</span></h2>
                    <p className="mb-8">
                        Track expenses, monitor income, and achieve your financial goals with our intuitive expense tracker. Start your journey to financial freedom today.
                    </p>
                    <div className="flex justify-center lg:justify-start gap-5 mb-8">
                        <Button asChild className="bg-t2m-primary border border-t2m-primary hover:bg-transparent hover:text-t2m-primary duration-300" size={"lg"}>
                            <Link href={'#'}>
                                Get Started
                            </Link>
                        </Button>
                        <Button asChild size={'lg'} className="bg-transparent border border-t2m-text-primary text-t2m-text-primary hover:bg-t2m-text-primary hover:text-white duration-300">
                            <Link href={'#'}>
                                Read More
                            </Link>
                        </Button>
                    </div>
                    <div>
                        <ul className="flex flex-wrap">
                            <li className="flex-1/2 text-sm mb-3 lg:mb-2 inline-flex justify-center lg:justify-start gap-1 min-w-2/3 sm:min-w-auto">
                                <span className="h-4 w-4 flex items-center justify-center bg-t2m-secondary rounded-full"><Check size={10} color="#fff" /></span>
                                Track income and expense daily</li>
                            <li className="flex-1/2 text-sm mb-3 lg:mb-2 inline-flex justify-center lg:justify-start gap-1 min-w-2/3 sm:min-w-auto">
                                <span className="h-4 w-4 flex items-center justify-center bg-t2m-secondary rounded-full"><Check size={10} color="#fff" /></span>
                                Analyze your finances</li>
                            <li className="flex-1/2 text-sm mb-3 lg:mb-2 inline-flex justify-center lg:justify-start gap-1 min-w-2/3 sm:min-w-auto">
                                <span className="h-4 w-4 flex items-center justify-center bg-t2m-secondary rounded-full"><Check size={10} color="#fff" /></span>
                                Plan your expenses</li>
                            <li className="flex-1/2 text-sm mb-3 lg:mb-2 inline-flex justify-center lg:justify-start gap-1 min-w-2/3 sm:min-w-auto">
                                <span className="h-4 w-4 flex items-center justify-center bg-t2m-secondary rounded-full"><Check size={10} color="#fff" /></span>
                                Categories your finances</li>
                        </ul>
                    </div>
                </div>
                <div className="flex-1/2 hidden lg:block relative">
                    <span className="inline-block p-5 rounded-xl bg-t2m-secondary absolute right-0 top-0 -translate-y-1/3 translate-x-1/3">
                        <ArrowLeftRight className="text-white" size={16}/>
                    </span>
                    <Image src={bannerImg} alt="Track My Money T2M" className="rounded-4xl shadow-2xl" />
                    <span className="inline-block p-5 rounded-xl bg-t2m-primary absolute left-0 bottom-0 translate-y-1/3 -translate-x-1/3">
                        <ChartNoAxesCombined className="text-white" size={16} />
                    </span>
                </div>
            </ContainerComponent>
        </div>
    )
}