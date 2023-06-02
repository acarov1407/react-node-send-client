import { Formik, Form } from "formik"
import MyField from "./MyField"
import Link from "next/link"
import * as Yup from "yup"
import MyErrorMessage from "./MyErrorMessage"
import useAuth from "@/context/auth/useAuth"
import Alert from "../Alert"
import Spinner from "../Spinner"

function FormLogin() {

    const { loginUser, alert } = useAuth();

    const handleSubmit = async(formData) => {
        loginUser(formData);

    }

    const loginSchema = Yup.object().shape({
        email: Yup.string()
            .email('Debe introducir un email válido')
            .required('El email es obligatorio'),
        password: Yup.string()
            .min(6, 'La contraseña debe tener almenos 6 caracteres')
            .required('La contraseña es obligatoria')
    })

    const initialValues = {
        email: '',
        password: ''
    }

    return (
        <Formik
            initialValues={initialValues}
            onSubmit={handleSubmit}
            validationSchema={loginSchema}
        >
            {
                ({ errors, touched, isSubmitting }) => (
                    <Form className="mt-10 w-full md:max-w-sm flex flex-col gap-5 shadow shadow-gray-700 py-8 px-10 rounded">
                        {alert.msg && <Alert alert={alert} />}

                        <MyField data={{ label: 'Email', id: 'email', name: 'email', type: 'email' }} />
                        {errors.email && touched.email ? <MyErrorMessage name='email' /> : null}

                        <MyField data={{ label: 'Contraseña', id: 'password', name: 'password', type: 'password' }} />
                        {errors.password && touched.password ? <MyErrorMessage name='password' /> : null}

                        <button
                            type="submit"
                            className="p-3 w-full rounded bg-rose-500 text-white font-medium hover:bg-rose-600 transition-colors"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? <Spinner /> : 'Iniciar Sesión'}
                        </button>

                        <div>
                            <Link
                                href="/register"
                                className="text-gray-300 text-center mt-2 hover:text-white block text-sm">
                                ¿No tienes cuenta? Regístrate
                            </Link>
                        </div>
                    </Form>
                )
            }

        </Formik>
    )
}

export default FormLogin