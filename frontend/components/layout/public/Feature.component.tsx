import { ChartPie, ReceiptText, RefreshCcw, ShieldCheck, TabletSmartphone, Tags } from "lucide-react";
import ContainerComponent from "../Container.component";
import SectionHeader from "./SectionHeader.component";

const featuresList = [
    {
        icon: <span className="inline-block p-4 bg-t2m-bg-primary rounded-xl mb-4"><ChartPie className="text-t2m-primary" size={16} /></span>,
        title: "Smart Analytics",
        description: "Get detailed insights into your spending patterns with beautiful charts and reports.",
    },
    {
        icon: <span className="inline-block p-4 bg-t2m-bg-secondary rounded-xl mb-4"><TabletSmartphone  className="text-t2m-secondary" size={16}/></span>,
        title: "Mobile Ready",
        description: "Track expenses on the go with our fully responsive design that works perfectly on all devices.",
    },
    {
        icon: <span className="inline-block p-4 bg-purple-100 rounded-xl mb-4"><Tags className="text-purple-500" size={16} /></span>,
        title: "Custom Categories",
        description: "Organize transactions with personalized categories that match your unique spending habits.",
    },
    {
        icon: <span className="inline-block p-4 bg-red-100 rounded-xl mb-4"><ShieldCheck className="text-red-500" size={16}/></span>,
        title: "Bank-Level Security",
        description: "Your financial data is protected with enterprise-grade encryption and security measures.",
    },
    {
        icon: <span className="inline-block p-4 bg-yellow-100 rounded-xl mb-4"><ReceiptText className="text-yellow-500" size={16} /></span>,
        title: "Receipt Scanning",
        description: "Upload and organize receipts digitally to keep track of all your purchases and expenses.",
    },
    {
        icon: <span className="inline-block p-4 bg-blue-100 rounded-xl mb-4"><RefreshCcw className="text-blue-500" size={16} /></span>,
        title: "Real-time Sync",
        description: "Access your data anywhere with automatic synchronization across all your devices.",
    },
]

export default function FeaturesComponent () {
    return (
        <div className="py-20">
            <ContainerComponent>
                <SectionHeader 
                    title="Everything You Need to Manage Money" 
                    note="Powerful features designed to make expense tracking simple, intuitive, and effective for everyone."/>
                <div className="flex flex-wrap gap-8">
                    {
                        featuresList.map((feature, i) => (
                            <div className="flex-1 min-w-full sm:min-w-1/3 lg:min-w-3/12 " key={i}>
                                <FeatureCard 
                                    icon={feature.icon}
                                    title={feature.title}
                                    description={feature.description}
                                    />
                            </div>
                        ))
                    }
                </div>
            </ContainerComponent>
        </div>
    )
}


const FeatureCard = ({icon,title, description}: {
    icon: React.ReactNode,
    title: string, 
    description: string 
}) => {
    return (
        <div className="p-6 shadow-xl rounded-lg h-full">
            {icon}
            <h4 className="font-semibold text-lg text-t2m-text-primary">{title}</h4>
            <p>{description}</p>
        </div>
    )
}