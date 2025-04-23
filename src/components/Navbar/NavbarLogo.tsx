import ThreeDText from "../ThreeDimensionalText/ThreeDimensionalText";

type NavbarLogoProps = {
    onClick?: () => void
}

export default function NavbarLogo({onClick}: NavbarLogoProps) {
    return (
        <ThreeDText text={"MPAS-JEDI"} onClick={onClick} size={1} baseDepth={0.01} hoverDepth={0.05} height={60} width={200}/>
    )

}