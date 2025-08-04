import { Button } from "@/components/ui/button";
import ContainerComponent from "../Container.component";
import SectionHeader from "./SectionHeader.component";
import Link from "next/link";

export default function CtaComponent () {
    return (
        <section className="py-16 bg-t2m-primary">
            <ContainerComponent>
                <div className="flex items-center flex-col">
                    <SectionHeader
                        bgColor="dark"
                        title="Ready to Take Control of Your Finances?" 
                        note="Join thousands of users who have already transformed their financial habits with Track My Money."/>
                    <Button asChild size={'lg'} variant={"secondary"} className="text-t2m-primary border border-white hover:bg-transparent hover:text-white">
                        <Link href={'#'}>
                            Get Started Now
                        </Link>
                    </Button>
                </div>
            </ContainerComponent>
        </section>
    )
} 