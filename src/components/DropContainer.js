import useApp from "@/context/app/useApp";
import FilesView from "./FilesView";
import Dropzone from "./DropZone";


function DropContainer() {

    const { myFiles } = useApp();

    return (

        <div className="border-2 border-dashed border-gray-500 flex items-center justify-center h-full p-5 flex-1">

            {
                myFiles.length > 0 ? <FilesView /> : <Dropzone />
            }

        </div >


    )
}

export default DropContainer