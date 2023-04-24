import { createContext, useState, useCallback } from "react"
import { axiosClient, getConfig } from "@/config/axiosClient";
import { useRouter } from "next/router";
import { showDialogDelete, showModalAlert } from "@/helpers/dialog";

const AppContext = createContext();

function AppProvider({ children }) {

    const [myFiles, setMyFiles] = useState([]);
    const [isUploadingFile, setIsUploadingFile] = useState(false);
    const [alert, setAlert] = useState({});
    const [downloadLink, setDownloadLink] = useState('');
    const [currentFile, setCurrentFile] = useState({
        name: null,
        isDownloaded: false,
        url: null
    });
    const [myLinks, setMyLinks] = useState([]);
    const router = useRouter();


    const onDrop = useCallback((acceptedFiles) => {
        setMyFiles([...myFiles, ...acceptedFiles])
    }, [myFiles]);

    const onDropRejected = () => {
        handleAlert({ error: true, msg: 'No se pudo subir el archivo, el limite es de 1MB, obten una cuenta gratis para subir archivos más grandes.' })
    }

    const onDropAccepted = () => {
        setAlert({});
    }

    const removeFile = (file) => {
        const newFiles = [...myFiles]
        newFiles.splice(newFiles.indexOf(file), 1)
        setMyFiles(newFiles)
    }

    const uploadFile = async (uploadData) => {
        setIsUploadingFile(true);
        try {
            const form_data = new FormData();
            form_data.append('file', myFiles[0]);
            const { data } = await axiosClient.post('/files', form_data, getConfig('multipart/form-data'));
            uploadData.name = data.file;
            await createLink(uploadData);
        } catch (error) {
            handleAlert({ error: true, msg: error.response.data.msg ?? 'Ha ocurrido un error al intentar subir el archivo' })
        } finally {
            setIsUploadingFile(false);
        }
    }

    //TODO: REMOVE FUNCTION WHEN FIND SOLUTION TO Cookie in getServerSideProps
    const getAllLinks = async () => {
        router.prefetch('/');
        try{
            const { data } = await axiosClient('/links/user');
            setMyLinks(data.links);
        }catch(error){
            router.push('/');
        }
        
    }


    const createLink = async (uploadData) => {

        try {
            const { data } = await axiosClient.post('/links', uploadData, getConfig());
            const link = `${process.env.NEXT_PUBLIC_WEB_URL}/download/${data.url}`;
            setDownloadLink(link);
            sessionStorage.setItem('link', link);
            router.push('/share');
            setMyFiles([]);
        } catch (error) {
            handleAlert({ error: true, msg: error.response.data.msg || 'Ha ocurrido un error' })
        }
    }

    const deleteLink = async (url) => {
        const result = await showDialogDelete({
            title: '¿Estás seguro que quieres eliminar este enlace?',
            content: 'Una vez eliminado nadie más podrá descargar tu archivo y no podrás recuperarlo'
        });

        if (!result.isConfirmed) return;
        try {
            await axiosClient.delete(`/links/link/${url}`);
            const updatedLinks = myLinks.filter(link => link.url !== url);
            setMyLinks(updatedLinks);
            showModalAlert({title: 'Enlace eliminado', content: 'Tu enlace se ha eliminado correctamente', error: false});
        } catch (error) {
            showModalAlert({title: 'Ha ocurrido un error', content: error.response.data.msg ?? '', error: true})
        }
    }

    const loadLink = () => {
        const link = sessionStorage.getItem('link');
        if (link) setDownloadLink(link);
        else router.push('/');
    }

    const checkLinkPassword = async (password) => {
        try {
            const { data } = await axiosClient.post(`/links/link/${currentFile.url}`, { password })
            if (!data.isCorrectPass) {
                handleAlert({ error: true, msg: 'La contraseña es incorrecta' });
                return false;
            }

            return true;

        } catch (error) {
            console.log(error);
        }
    }

    const downloadFile = () => {
        router.push(`${process.env.NEXT_PUBLIC_API_URL}/api/files/${currentFile.name}`)
        const updatedFile = { ...currentFile };
        updatedFile.isDownloaded = true;
        setCurrentFile(updatedFile);
    }

    const handleAlert = (alert) => {
        setAlert(alert);
        setTimeout(() => {
            setAlert({});
        }, 10000);
    }
    return (
        <AppContext.Provider
            value={{
                uploadFile,
                removeFile,
                onDrop,
                onDropRejected,
                onDropAccepted,
                myFiles,
                isUploadingFile,
                handleAlert,
                alert,
                myLinks,
                setMyLinks,
                downloadLink,
                loadLink,
                deleteLink,
                checkLinkPassword,
                currentFile,
                setCurrentFile,
                downloadFile,
                getAllLinks
            }}
        >
            {children}
        </AppContext.Provider>
    )
}

export default AppContext

export {
    AppProvider
}