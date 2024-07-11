import Image from "next/image"
import Link from "next/link"

export default function Header() {
    return(
        <header>
            <Link href={"/"} className="logo-container">
                <Image src={"/svgs/logo.svg"} alt="logoImg" width={50} height={50}/>
                <div>서른다섯의 레시피</div>
            </Link>
             <Link href={"/about"}>ABOUT</Link>
        </header>
    )
}