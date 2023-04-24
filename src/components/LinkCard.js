import Link from "next/link";
import { DocumentDuplicateIcon, TrashIcon } from "@heroicons/react/24/outline";
import useApp from "@/context/app/useApp";
import { showDialogDelete } from "@/helpers/dialog";

function LinkCard({ link }) {

  const { real_name, limit, url } = link;
  const { deleteLink } = useApp();

  const linkURL = `${process.env.WEB_URL}/download/${url}`;

  
  return (
    <div className="border border-gray-700 p-4 rounded text-white font-medium flex flex-col gap-2 relative">
      <p className="t">{real_name}</p>
      <p className="text-sm text-gray-300">Descargas restantes: <span className="text-gray-100">{limit}</span></p>
      <div className="text-sm text-gray-300 sm:flex gap-1">
        <p>Enlace:</p>
        <Link
          href={linkURL} target="_blank"
          className="text-red-400 underline hover:text-red-500 transition-colors"
        >{linkURL}</Link>
        <button
          type="button"
          className="flex items-center gap-2 text-gray-100 hover:text-white transition-colors ml-1"
          onClick={() => navigator.clipboard.writeText(linkURL)}
        >
          <DocumentDuplicateIcon className="h-5 w-5" />
        </button>
      </div>
      <button
        type="button"
        className="text-gray-300 absolute top-0 right-0 hover:text-white px-1 py-2 hover:bg-red-700 rounded-sm"
        onClick={() => deleteLink(url)}
      >
        <TrashIcon className="h-4 w-4" />
      </button>
    </div>
  )
}

export default LinkCard