import { useDropzone } from "react-dropzone"
import useApp from "@/context/app/useApp";
import useAuth from "@/context/auth/useAuth";

function Dropzone() {

    const { onDrop, onDropRejected, onDropAccepted} = useApp();
    const { isAuth } = useAuth();

    const BASE_LIMIT = 1000000;


    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop, onDropRejected, onDropAccepted, maxSize: isAuth ? BASE_LIMIT * 10 : BASE_LIMIT });
    return (
        <div {...getRootProps({ className: 'dropzone w-full h-full flex items-center justify-center cursor-pointer' })}>
            <input className="h-100" {...getInputProps()} />
            {
                isDragActive
                    ?
                    (
                        <p className="text-xl text-center text-gray-300">Suelta el archivo</p>
                    )
                    :
                    (
                        <div className="text-center">
                            <p className="text-xl text-center text-gray-300">Selecciona un archivo y arrastralo aquí</p>
                        </div>
                    )
            }
        </div >
    )
}

export default Dropzone
