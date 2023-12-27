interface HeadingsProps {
    title: string;
    description: string
}

const Heading: React.FC<HeadingsProps> = ({title, description}) => {
    return(
        <div className="mt-2">
            <h2 className="text-3xl font-bold tracking-tight">{title}</h2>
            <p className="text-sm text-muted-foreground">{description}</p>
        </div>
    )
}

export default Heading