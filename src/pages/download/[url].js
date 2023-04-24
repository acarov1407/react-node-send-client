import Layout from "@/components/Layout"
import { axiosClient, getConfig } from "@/config/axiosClient"
import Link from "next/link"
import useApp from "@/context/app/useApp";
import useAuth from "@/context/auth/useAuth";
import FormPassword from "@/components/forms/FormPassword";
import { useEffect } from "react";


export async function getServerSideProps({ params: { url } }) {

    try {
        const { data } = await axiosClient(`/links/link/${url}`, { headers: { Origin: process.env.WEB_URL } });

        return {
            props: {
                fileName: data.file,
                isProtected: data.isProtected,
                url
            },
        }
    } catch (error) {
        return {
            props: {
                fileName: null
            }
        }
    }

}

/*export async function getStaticPaths() {
    const { data } = await axiosClient('/links');
    return {
        paths: data.links.map(link => ({
            params: { url: link.url }
        })),
        fallback: false
    }
}*/

function Url({ fileName, isProtected, url }) {

    const { currentFile, setCurrentFile, downloadFile } = useApp();
    const { authUser } = useAuth();

    useEffect(() => {
        authUser();
        const updatedFile = { ...currentFile };
        updatedFile.name = fileName;
        updatedFile.url = url;
        setCurrentFile(updatedFile);
    }, []);

    return (
        <Layout>
            {
                fileName
                    ?
                    <div className="bg-gray-800 px-20 py-16 max-w-lg mx-auto rounded border border-gray-700">
                        {
                            currentFile.isDownloaded
                                ?
                                (
                                    <>
                                        <h1 className="text-white text-2xl text-center">Tu archivo se ha descargado</h1>
                                        <p className="text-white text-lg text-center mt-5">Gracias por usar <span className="text-red-500 font-medium">ReactNodeSend</span></p>
                                    </>

                                )
                                :
                                (
                                    <>
                                        <h1 className="text-white text-2xl text-center">Tu Archivo está listo</h1>
                                        {
                                            isProtected
                                                ?
                                                <>
                                                    <FormPassword />
                                                </>
                                                :
                                                <button
                                                    type="button"
                                                    className="bg-blue-700 py-3 rounded-lg text-white mt-5 hover:bg-blue-800 font-medium block mx-auto text-center w-full"
                                                    onClick={downloadFile}
                                                    disabled={currentFile.isDownloaded}
                                                >
                                                    Descargar
                                                </button>
                                        }


                                    </>
                                )
                        }

                    </div>
                    :
                    <div>
                        <p className="text-white text-center text-2xl">El enlace no existe o ya ha expirado</p>
                        <Link
                            href="/"
                            className="text-center text-red-500 block mt-5 font-medium hover:text-red-600 underline">
                            Volver al Inicio
                        </Link>
                    </div>
            }

        </Layout>
    )
}

export default Url