import Layout from "@/components/Layout"
import FormLogin from "@/components/forms/FormLogin"


function Login() {
    return (
        <Layout>
            <h1 className="text-center text-white text-3xl md:max-w-lg mx-auto">
                Inicia sesión para comenzar a usar los beneficios de
                <span className="text-rose-600 font-bold">
                    {` React`}
                    <span className="text-white">
                        {` Node`}
                    </span>
                    {` Send`}
                </span>
            </h1>
            <div className="flex justify-center">
                <FormLogin />
            </div>

        </Layout>
    )
}

export default Login