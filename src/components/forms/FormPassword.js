import { Formik, Form } from "formik";
import MyField from "./MyField";
import useApp from "@/context/app/useApp";
import Alert from "../Alert";

function FormPassword() {

    const { checkLinkPassword, alert, handleAlert, downloadFile } = useApp();


    const handleSubmit = async (formData) => {
        if (formData.password === '') {
            handleAlert({ error: true, msg: 'Introduce una contraseña' });
            return;
        }

        const result = await checkLinkPassword(formData.password)
        if(result) downloadFile();
    }

    const initialValues = {
        password: ''
    }

    return (
        <Formik
            initialValues={initialValues}
            onSubmit={handleSubmit}
        >
            {({ isSubmitting }) => (
                <Form className="mt-5 mx-auto">

                    {alert.msg && <div className="mb-5"><Alert alert={alert} /></div>}
                    <MyField data={{ id: 'password', name: 'password', type: 'password', label: 'Para continuar por favor introduce la contraseña:' }} />
                    <button
                        type="submit"
                        className="bg-blue-700 py-3 rounded-lg text-white mt-5 hover:bg-blue-800 font-medium block mx-auto text-center w-full"
                        disabled={isSubmitting}

                    >Descargar</button>
                </Form>
            )}

        </Formik>
    )
}

export default FormPassword