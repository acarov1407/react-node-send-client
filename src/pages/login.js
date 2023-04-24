import Layout from "@/components/Layout"
import FormLogin from "@/components/forms/FormLogin"


function Login() {
    return (
        <Layout>
            <h1 className="text-center text-white text-3xl md:max-w-lg mx-auto">
                Inicia sesión para comenzar a usar los beneficios de NodeSend
            </h1>
            <div className="flex justify-center">
                <FormLogin />
            </div>

        </Layout>
    )
}

export default Login