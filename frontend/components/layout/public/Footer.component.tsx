import Link from "next/link";
import ContainerComponent from "../Container.component";

export default function FooterComponent () {
    return (
        <section className="bg-t2m-footer py-4">
            <ContainerComponent>
                <div className="text-white flex items-center justify-center sm:justify-between text-center flex-wrap gap-2">
                    <h4>
                        <Link href={"/"} className="flex gap-2 sm:gap-3 items-center">
                            <span className="bg-t2m-primary p-2 text-xs inline-block text-white rounded-md font-semibold sm:text-sm">T2M</span> 
                            <span className="font-semibold text-[16px] sm:text-lg ">
                                Track My Money 
                            </span>
                        </Link>
                    </h4>
                    <p className="text-xs text-gray-300">© 2024 Track My Money | Beepul Thapamagar. All rights reserved.</p>
                </div>
            </ContainerComponent>
        </section>
    )
}