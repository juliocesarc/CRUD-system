type Props = {
    children: JSX.Element;
}

export default function Layout ({children}: Props) {
    return (
        <div className="background-login">
            {children}
        </div>
    )
}