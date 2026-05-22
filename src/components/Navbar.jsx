import { PersonFill } from "@gravity-ui/icons";
import Image from "next/image";
import Link from "next/link";

const Navbar = () => {
    return (
        <div className="flex justify-between p-4 font-semibold">
            <ul className="flex gap-2">
                <li>
                    <Link href={'/'}>Home</Link>
                </li>
                <li>
                    <Link href={'/destination'}>Destination</Link>
                </li>
                <li>
                    <Link href={'/bookings'}>My Bookings</Link>
                </li>
                <li>
                    <Link href={'/addpackage'}>Add Package</Link>
                </li>
            </ul>
            <Link href={'/'}>
                <Image
                    src={'/assets/Wanderlast.png'}
                    alt="Logo"
                    width={150}
                    height={150}
                />
            </Link>
            <ul className="flex gap-2">
                <li>
                    <Link href={'/profile'} className="flex items-center gap-1"><PersonFill /> Profile</Link>
                </li>
                <li>
                    <Link href={'/signin'}>Login</Link>
                </li>
                <li>
                    <Link href={'/signup'}>Sign Up</Link>
                </li>
            </ul>
        </div>
    );
};

export default Navbar;