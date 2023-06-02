import Spinner from "./Spinner";
import { XMarkIcon } from '@heroicons/react/24/outline'
import useApp from "@/context/app/useApp"
import useAuth from "@/context/auth/useAuth";
import { convertBytes } from "@/helpers/conversion.js";
import FormUpload from "./forms/FormUpload";

function FilesView() {

  const { myFiles, isUploadingFile, removeFile, uploadFile } = useApp();
  const { isAuth } = useAuth();

  return (
    <div className="flex-1">
      <p className="text-white text-xl font-bold text-center mb-5">Tu Archivo</p>
      <ul>
        {
          myFiles.map(file => (

            <li key={file.lastModified} className="p-4 bg-gray-700 text-white shadow rounded font-medium relative">
              <p className="text-lg">{file.path}</p>
              <p className="text-sm text-gray-300">{`${convertBytes(file.size).value} ${convertBytes(file.size).type}`}</p>
              <button
                className="absolute top-1 right-1"
                type="button"
                onClick={() => removeFile(file)}
              >
                <XMarkIcon className="h-4 w-4" />
              </button>
            </li>
          ))
        }
      </ul>
      {
        isAuth
          ?
          <FormUpload />
          :
          (
            <button
              className="bg-blue-700 w-full py-3 rounded-lg text-white mt-5 hover:bg-blue-800 font-medium"
              type="button"
              disabled={isUploadingFile}
              onClick={() => uploadFile({ real_name: myFiles[0].path })}
            >
              {isUploadingFile ? <Spinner /> : 'Subir Archivo'}
            </button>
          )
      }

    </div>
  )
}

export default FilesView
