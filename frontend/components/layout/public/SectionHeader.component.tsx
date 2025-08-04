const SectionHeader = ({title, note, bgColor='light'}: {title: string, note: string, bgColor?: 'light' | 'dark'}) => {
    return (
        <div className={`text-center max-w-full sm:max-w-3/4 mx-auto mb-8 ${bgColor === 'light' ? 'text-t2m-text-primary' : 'text-white'}`}>
            <h3 className="font-semibold text-2xl mb-3">{title}</h3>
            <p className="text-t">{note}</p>
        </div>
    )
}


export default SectionHeader