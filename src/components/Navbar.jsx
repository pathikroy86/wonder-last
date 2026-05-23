"use client"
import { authClient } from "@/lib/auth-client";
import { PersonFill } from "@gravity-ui/icons";
import { Avatar, Button } from "@heroui/react";
import Image from "next/image";
import Link from "next/link";

const Navbar = () => {
    const { data: session } = authClient.useSession();
    const user = session?.user;
    const handleLogout = async () => {
        await authClient.signOut();
    }
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
            {session ? <ul className="flex gap-2 items-center">
                <li className="flex items-center gap-1">
                    <Avatar>
                        <Avatar.Image referrerPolicy="no-referrer" alt="John Doe" src={user?.image} />
                        <Avatar.Fallback>{user.name.charAt(0)}</Avatar.Fallback>
                    </Avatar>
                    <Link href={'/profile'} className="flex items-center gap-1"> Profile</Link>
                </li>
                <li>
                    <Button variant="danger-soft" className="rounded" onClick={handleLogout}><Link href={'/signin'}>Logout</Link></Button>
                </li>
            </ul> : <ul className="flex gap-2">
                <li>
                    <Link href={'/signin'}>Login</Link>
                </li>
                <li>
                    <Link href={'/signup'}>Sign Up</Link>
                </li>
            </ul>}

        </div>
    );
};

export default Navbar;