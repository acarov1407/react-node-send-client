import Layout from "@/components/Layout"
import { axiosClient } from "@/config/axiosClient"
import { FolderIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import LinkCard from "@/components/LinkCard";
import useApp from "@/context/app/useApp";
import { useEffect } from "react";


export async function getServerSideProps({ req }) {
    try {
        console.log('Data', req.headers.cookie)
        const { data } = await axiosClient('/links/user', { headers: { Cookie: req.headers.cookie, Origin: process.env.NEXT_PUBLIC_WEB_URL } });
        
        return {
            props: {
                links: data.links
            }
        }
    } catch (error) {
        return {
            props: {
                error
            }
        }
        return {
            notFound: true
        }
    }
}

function MyLinks({ links, error }) {

    const { myLinks, setMyLinks } = useApp();

    const test = async () => {
        const { data } = await axiosClient('/links/user');
        console.log(data)
    }

    useEffect(() => {
        test()
        console.log(error)
        //setMyLinks(links);
    }, []);

    return (
        <Layout>
            {
                myLinks?.length > 0
                    ?
                    (
                        <div className="max-w-lg">
                            <div className="sm:flex sm:items-center sm:flex-row sm:justify-between pr-3">
                                <h1 className="text-3xl text-white font-medium">Archivos Subidos</h1>
                                <Link
                                    href="/"
                                    type="button"
                                    className="bg-blue-700 py-1 px-4 rounded-lg text-white hover:bg-blue-800 font-medium text-sm mt-4 sm:m-0"
                                >
                                    Subir Archivo
                                </Link>
                            </div>
                            <p className="text-white mt-5 md:w-2/4">Recuerda que puedes tener un máximo de <span className="font-bold">5</span> archivos activos</p>

                            <div className="mt-8 flex flex-col gap-4 h-[calc(100vh_-_20rem)] overflow-y-scroll pr-3">
                                {
                                    myLinks.map(link => (
                                        <LinkCard key={link._id} link={link} />
                                    ))
                                }
                            </div>
                        </div>

                    )
                    :
                    (
                        <div className="text-gray-200 text-center">
                            <div className="flex justify-center text-gray-300">
                                <FolderIcon className="h-24 w-24" />
                            </div>
                            <p className="mt-5">Aún no tienes enlaces</p>
                            <p className="mt-5">
                                <span>
                                    <Link
                                        href="/"
                                        className="text-red-500 font-medium underline hover:text-red-600 transition-colors"
                                    >Sube un archivo </Link>
                                </span>
                                para ver su enlace aquí
                            </p>
                        </div>

                    )
            }
        </Layout>
    )
}

export default MyLinks