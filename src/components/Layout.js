import Head from 'next/head';
import Header from "./Header";
import useAuth from "@/context/auth/useAuth";
import { useEffect } from "react";
import Spinner from "./Spinner";

function Layout({ children, loading }) {

    const { isLoadingInfo, authUser } = useAuth();

    useEffect(() => {
        authUser();
    }, []);

    return (
        isLoadingInfo || loading
            ?
            (
                <div className="min-h-screen bg-gray-800 py-24">
                    <Spinner />
                </div>
            )
            :
            (
                <>
                    <Head>
                        <title>ReactNodeSend</title>
                    </Head>

                    <div className="bg-gray-900 min-h-screen">
                        <div>
                            <Header />

                            <main className="container mx-auto mt-20 px-2 sm:px-0">
                                {children}
                            </main>
                        </div>
                    </div>

                </>
            )

    )
}

export default Layout