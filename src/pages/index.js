import Layout from "@/components/Layout";
import useAuth from "@/context/auth/useAuth";
import useApp from "@/context/app/useApp";
import Link from "next/link";
import DropContainer from "@/components/DropContainer";
import Alert from "@/components/Alert";





function Home() {

  const { isAuth } = useAuth();
  const { alert } = useApp();


  return (

    <Layout>
      {alert.msg &&
        <div className="md:w-4/5 xl:w-2/4 mx-auto mb-2">
          <Alert alert={alert} />
        </div>
      }
      <div className="bg-gray-800 mx-auto md:w-4/5 xl:w-2/4 rounded px-10 py-12 grid grid-rows-2 md:grid-rows-none md:grid-cols-2 border border-gray-700 gap-8 items-center">
        <DropContainer />
        <div>
          <h2 className="text-4xl text-white font-sans font-medium">Comparte tus archivos de forma sencilla y segura</h2>
          <p className="mt-5 text-white leading-loose"><span className="text-red-400 font-medium">ReactNodeSend </span>
            te permite compartir tus archivos de manera totalmente segura, rápida y sencilla. Una vez tu archivo es descargado, este es eliminado de nuestros servidores,
            por lo que puedes estar seguro de que solo tú decides quien tiene acceso a tus archivos.
          </p>

          {
            !isAuth &&
            <Link href="/register" className="text-red-400 font-medium hover:text-red-500">
              Crea una cuenta para obtener todos los beneficios
            </Link>
          }
        </div>
      </div>
    </Layout>
  )

}

export default Home
