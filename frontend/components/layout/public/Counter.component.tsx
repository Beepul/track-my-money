"use client"
import CountUp from "react-countup";
import ContainerComponent from "../Container.component";
import { useInView } from "react-intersection-observer";

export default function CounterComponent () {
    const {ref, inView} = useInView({
        triggerOnce: true,
        threshold: 0.5
    })
    return (
        <section className="bg-t2m-bg-primary py-16">
            <ContainerComponent>
                <div ref={ref} className="flex justify-between flex-wrap gap-6">
                    {inView && (
                        <>
                            <div className="flex-1 min-w-full sm:min-w-2/5 lg:min-w-2/12 text-center">
                                <CountUp 
                                    end={50}
                                    suffix="K+"
                                    className="text-4xl text-t2m-primary font-semibold"
                                />
                                <p>Active Users</p>
                            </div>
                            <div className="flex-1 min-w-full sm:min-w-2/5 lg:min-w-2/12 text-center">
                                <CountUp 
                                    prefix="$"
                                    end={2}
                                    suffix="M+"
                                    className="text-4xl text-t2m-primary font-semibold"
                                />
                                <p>Money Tracked</p>
                            </div>
                            <div className="flex-1 min-w-full sm:min-w-2/5 lg:min-w-2/12 text-center">
                                <CountUp 
                                    end={99.9}
                                    suffix="%"
                                    decimals={1}
                                    className="text-4xl text-t2m-primary font-semibold"
                                />
                                <p>Uptime</p>
                            </div>
                            <div className="flex-1 min-w-full sm:min-w-2/5 lg:min-w-2/12 text-center">
                                <CountUp 
                                    end={4.5}
                                    suffix="★"
                                    decimals={1}
                                    className="text-4xl text-t2m-primary font-semibold"
                                />
                                <p>User Rating</p>
                            </div>
                        </>
                    )}
                </div>
            </ContainerComponent>
        </section>
    )
}