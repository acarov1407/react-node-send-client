import { Formik, Form } from "formik"
import MyField from "./MyField"
import Link from "next/link"
import * as Yup from 'yup'
import MyErrorMessage from "./MyErrorMessage"
import useAuth from "@/context/auth/useAuth"
import Spinner from "../Spinner"
import Alert from "../Alert"


function FormRegister() {

    const { signUpUser, alert } = useAuth();

    const handleSubmit = (formData) => {
        signUpUser(formData)
    }

    const initialValues = {
        name: '',
        email: '',
        password: ''
    }

    const registerSchema = Yup.object().shape({
        name: Yup.string()
            .min(2, 'Nombre muy corto')
            .max(50, 'Nombre muy largo')
            .required('El nombre es obligatorio'),
        email: Yup.string()
            .email('Debe introducir un email válido')
            .required('El email es obligatorio'),
        password: Yup.string()
            .min(6, 'La contraseña debe tener almenos 6 caracteres')
            .required('La contraseña es obligatoria')
    })

    return (
        <Formik
            initialValues={initialValues}
            onSubmit={handleSubmit}
            validationSchema={registerSchema}
        >
            {
                ({ errors, touched, isSubmitting }) => (

                    <Form className="mt-10 w-full md:max-w-sm flex flex-col gap-5 shadow shadow-gray-700 py-8 px-10 rounded">
                        {alert.msg && <Alert alert={alert} />}
                        
                        <MyField data={{ label: 'Nombre', id: 'name', name: 'name' }} />
                        {errors.name && touched.name ? <MyErrorMessage name='name' /> : null}

                        <MyField data={{ label: 'Email', id: 'email', name: 'email', type: 'email' }} />
                        {errors.email && touched.email ? <MyErrorMessage name='email' /> : null}

                        <MyField data={{ label: 'Contraseña', id: 'password', name: 'password', type: 'password' }} />
                        {errors.password && touched.password ? <MyErrorMessage name='password' /> : null}

                        <button
                            type="submit"
                            className="p-3 w-full bg-rose-500 text-white font-medium hover:bg-rose-600 transition-colors rounded"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? <Spinner /> : 'Crear Cuenta'}
                        </button>

                        <div>
                            <Link
                                href="/login"
                                className="text-gray-300 text-center mt-2 hover:text-white block text-sm">
                                ¿Ya estas registrado? Inicia Sesión
                            </Link>
                        </div>
                    </Form>
                )
            }

        </Formik>
    )
}

export default FormRegister