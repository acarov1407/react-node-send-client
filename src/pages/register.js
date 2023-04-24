import Layout from "@/components/Layout"
import FormRegister from "@/components/forms/FormRegister"


function Register() {
    return (
        <Layout>
            <h1 className="text-center text-white text-3xl md:max-w-lg mx-auto">Crea tu cuenta en NodeSend para desbloquear beneficios</h1>
            <div className="flex justify-center">
                <FormRegister />

            </div>

        </Layout>
    )
}

export default Register