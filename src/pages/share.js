import { DocumentDuplicateIcon } from '@heroicons/react/24/outline'
import Layout from "@/components/Layout"
import useApp from "@/context/app/useApp"
import { useEffect} from "react";



function Share() {

    const { downloadLink, loadLink} = useApp();

    useEffect(() => {
        loadLink()
    }, []);


    return (
        <Layout loading={downloadLink ? false : true}>
            <div className="bg-gray-800 px-10 py-16 max-w-lg mx-auto rounded border border-gray-700">
                <p className="text-2xl text-white text-center font-medium">Tu enlace</p>
                <p className="text-center text-white text-xl mt-5">{downloadLink}</p>
                <button
                    className="bg-blue-700 w-full md:w-3/4 py-3 rounded-lg text-white mt-5 hover:bg-blue-800 font-medium flex items-center gap-2 justify-center mx-auto"
                    type="button"
                    onClick={() => navigator.clipboard.writeText(downloadLink)}

                >
                    Copiar enlace
                    <DocumentDuplicateIcon className="h-6 w-6" />
                </button>
            </div>
        </Layout>
    )
}

export default Share