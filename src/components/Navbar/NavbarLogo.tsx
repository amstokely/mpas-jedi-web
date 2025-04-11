type NavbarLogoProps = {
  onClick?: () => void
}

export default function NavbarLogo({ onClick }: NavbarLogoProps) {
  return (
    <div className="flex shrink-0 items-center cursor-pointer" onClick={onClick}>
      <h3 className="font-bold">MPAS-JEDI</h3>
    </div>
  )
}
