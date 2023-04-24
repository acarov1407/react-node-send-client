import { Formik, Form, Field } from "formik"
import { useState } from "react"
import useApp from "@/context/app/useApp";
import Alert from "../Alert";
import Spinner from "../Spinner";

function FormUpload() {

    const [showPasswordField, setShowPasswordField] = useState(false);
    const [alert, setAlert] = useState({});

    const { isUploadingFile , uploadFile, myFiles } = useApp();

    const handleAlert = (alert) => {
        setAlert(alert);
        setTimeout(() => {
            setAlert({});
        }, 4000);
    }

    const handleSubmit = (formData) => {

        if(showPasswordField){
            if(formData.password === ''){
                handleAlert({error: true, msg: 'Debes introducir una contraseña'});
                return;
            }
        } 

        if(formData.downloads < 1 || formData.downloads === ''){
            handleAlert({error: true, msg: 'Debes establecer un número máximo de descargas'});
            return;
        }

        const uploadData = {
            real_name: myFiles[0].path,
            limit: formData.downloads,
        }

        if(showPasswordField) uploadData.password = formData.password;

        uploadFile(uploadData);
    }

    const initialValues = {
        downloads: 1,
        password: ''
    }

    return (
        <Formik
            initialValues={initialValues}
            onSubmit={handleSubmit}
        >
            <Form className="mt-8">
                {alert.msg && <div className="mb-5"><Alert alert={alert}/></div>}
                <div>
                    <label className="text-gray-100 block mb-1" htmlFor="downloads">Numero máximo de descargas:</label>
                    <Field
                        id="downloads"
                        name="downloads"
                        className="w-full p-2 rounded bg-gray-900 border border-gray-600 focus:border-gray-300 focus:outline-none shadow text-white"
                        as="select"
                    >
                        <option value="1">1</option>
                        <option value="5">5</option>
                        <option value="10">10</option>
                        <option value="50">50</option>
                    </Field>
                </div>

                <div className="mt-5 flex items-center gap-4">
                    <label className="text-gray-100 block" htmlFor="show-password">Proteger con contraseña</label>
                    <input className="block h-4 w-4" id="show-password" name="show-password" type="checkbox" onClick={() => setShowPasswordField(!showPasswordField)} />
                </div>

                {
                    showPasswordField &&

                    <div className="mt-1">
                        <Field
                            id="password"
                            name="password"
                            className="w-full p-2 rounded bg-gray-900 border border-gray-600 focus:border-gray-300 focus:outline-none shadow text-white"
                            type="password"
                        />
                    </div>
                }

                <button
                    className="bg-blue-700 w-full py-3 rounded-lg text-white mt-5 hover:bg-blue-800 font-medium"
                    type="submit"
                    disabled={isUploadingFile}
                >
                    {isUploadingFile ? <Spinner /> : 'Subir Archivo'}
                </button>

            </Form>
        </Formik>
    )
}

export default FormUpload