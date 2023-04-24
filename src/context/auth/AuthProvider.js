import { createContext, useEffect, useState } from 'react'
import { axiosClient } from "@/config/axiosClient";
import { useRouter } from "next/router";
import { showDialogOption } from "@/helpers/dialog";


const AuthContext = createContext();

function AuthProvider({ children }) {

    const [user, setUser] = useState({});
    const [isAuth, setIsAuth] = useState(false);
    const [alert, setAlert] = useState({});
    const [isLoadingInfo, setIsLoadingInfo] = useState(true);

    const router = useRouter();


    const handleAlert = (alert) => {
        setAlert(alert);
        setTimeout(() => {
            setAlert({});
        }, 5000);
    }

    const signUpUser = async (userData) => {
        try {
            await axiosClient.post('/users', userData);
            router.push('/login')
        } catch (error) {
            handleAlert({ error: true, msg: error?.response?.data?.msg || 'Ha ocurrido un error al intentar registrar el usuario' })
        }
    }

    const loginUser = async (userData) => {
        try {
            const { data } = await axiosClient.post('/auth', userData);
            setUser(data);
            setIsAuth(true);
            router.push('/');
        } catch (error) {
            handleAlert({ error: true, msg: error?.response?.data?.msg || 'Ha ocurrido un error al intentar iniciar sesión' });
        }
    }

    const authUser = async () => {
        try {
            const { data } = await axiosClient.get('/auth');
            if (!data) return;
            setUser(data);
            setIsAuth(true);
        } catch (error) {
            if(error?.response?.data?.status === 'expired'){
                const result = await showDialogOption({ 
                    title: 'La sesión ha expirado', 
                    content: '¿Quieres volver a iniciar sesión o continuar como invitado?',
                    yesOption: 'Iniciar Sesión',
                    noOption: 'Continuar como invitado'
                })

                if(result.isConfirmed){
                    router.push('/login')
                } else if(result.isDenied){
                    logOut();
                }
            }
            console.log(error);
        } finally {
            setIsLoadingInfo(false);
        }

    }

    const logOut = async () => {

        try {
            await axiosClient.post('/auth/logout')
            setUser({});
            setIsAuth(false);
            setAlert({});
        } catch (error) {
            console.log(error);
        }

    }

    return (
        <AuthContext.Provider
            value={{
                signUpUser,
                loginUser,
                authUser,
                logOut,
                user,
                isAuth,
                isLoadingInfo,
                alert
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext

export {
    AuthProvider
}