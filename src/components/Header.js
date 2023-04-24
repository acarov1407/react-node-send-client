import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/outline'
import Image from "next/image"
import Link from "next/link"
import useAuth from "@/context/auth/useAuth"
import { useState } from "react"


function Header() {

    const [onMenu, setOnMenu] = useState(false);

    const { user, isAuth, logOut } = useAuth();


    return (
        <header className="py-5 flex items-center justify-between bg-gray-900 shadow-lg border-b-4 border-gray-800 px-2 sm:px-0">
            <div className="container mx-auto flex justify-between items-center">
                <Link href="/">
                    <Image width={400} height={200} src="/logo_dark.svg" alt="Logo NodeSend" className="w-48 sm:w-64" />
                </Link>
                {

                    isAuth
                        ?
                        (
                            <div 
                            className="relative"
                            onMouseEnter={() => setOnMenu(true)}
                            onMouseLeave={() => setOnMenu(false)}
                            >
                                <p
                                    className="text-white font-medium flex items-center gap-2 py-2 px-4 bg-gray-800 text-sm rounded cursor-pointer peer"
                                >
                                    {user.name}
                                    <span className="text-gray-200">
                                        {
                                            onMenu ? <ChevronUpIcon className="h-3 w-3" /> : <ChevronDownIcon className="h-3 w-3" />
                                        }
                                    </span>
                                </p>
                                <div className="hidden peer-hover:block hover:block absolute w-52 right-0 z-40">
                                    <div className="mt-3 bg-gray-800 rounded">
                                        <div className="h-1 bg-red-500"></div>
                                        <p className="text-white p-4 border-b border-gray-600">{user.name}</p>
                                        <ul className="text-gray-300 p-4 text-sm">
                                            <li className="hover:bg-gray-700 hover:text-white transition-colors rounded">
                                                <Link className="block h-full p-3" href="/my-links">Mis Enlaces</Link>
                                            </li>
                                            <li className="hover:bg-gray-700 hover:text-white transition-colors rounded">
                                                <button
                                                    className="w-full text-left h-full p-3"
                                                    type="button"
                                                    onClick={logOut}
                                                >
                                                    Cerrar Sesión
                                                </button>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>



                        )
                        :
                        (
                            <Link
                                href="/login"
                                className="action-button py-3 px-10 rounded"
                            >
                                Inicia Sesión
                            </Link>
                        )
                }

            </div>

        </header>
    )
}

export default Header