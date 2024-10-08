import { useContext, useEffect, useState } from "react";
import { ArrowBigDownDash } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { STORAGE } from "@/constants/general.constants.ts";
import { supabaseAuth, supabaseVerifyCodeOTP } from "@/services/supabase.service.ts";
import toast from "react-hot-toast";
import AdminContext from "@/context/AdminContext.tsx";

function Login() {
  const [email, setEmail] = useState("");
  const [token, setToken] = useState("");
  const [openToken, setOpenToken] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingToken, setIsLoadingToken] = useState(false);

  const { setUser } = useContext(AdminContext);

  const navigate = useNavigate();

  const sendTokenToEmail = async () => {
    setIsLoading(true);
    const { data, error } = await supabaseAuth(email);
    if (data) {
      setOpenToken(true);
      toast.success("Magic Link enviado a tu correo");
    }
    if (error) {
      console.log("error", error);
      toast.error("Error al enviar el Magic Link");
    }
  };

  const logIn = async () => {
    console.log("email and token", email, token);
    const { data, error } = await supabaseVerifyCodeOTP(email, token);
    if (data) {
      localStorage.setItem("authState", JSON.stringify({ auth: true, session: data }));
      setUser(data.session);
      setIsLoadingToken(false);
      navigate(STORAGE);
    }
    if (error) {
      console.log("error", error);
      toast.error("Error al iniciar sesión");
    }
  };

  const checkCookies = () => {
    const authSessionCookie = document.cookie.match("auth-session=([^;]+)");
    return !!authSessionCookie;
  };

  useEffect(() => {
    const isAuthenticated = checkCookies();
    if (isAuthenticated) {
      navigate(STORAGE);
    }
  }, [navigate]);

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Iniciar Sesión</h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Pon tu email e ingresa el codigo enviado a tu correo
          </p>
        </div>
        <form className="mt-8 space-y-6">
          <div className="-space-y-px rounded-md shadow-sm">
            <div>
              <label htmlFor="email" className="sr-only">
                Correo Electronico
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                placeholder="Correo Electrónico"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="py-4">
              <button
                type="button"
                onClick={async () => await sendTokenToEmail()}
                disabled={isLoading}
                className="group relative flex w-full justify-center rounded-md border border-transparent bg-green-500 px-4 py-2 text-sm font-medium text-white hover:bg-green-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 active:bg-green-300 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {isLoading ? (
                  <svg
                    className="-ml-1 mr-3 h-5 w-5 animate-spin text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                ) : null}
                {isLoading ? "Enviando Codigo a tu Correo..." : "Enviar Codigo"}
              </button>
            </div>
            <div
              className={`${!openToken && "hidden"} flex w-full animate-bounce items-center justify-center text-green-500`}
            >
              <ArrowBigDownDash />
            </div>
            <div className={`${!openToken && "hidden"}`}>
              <label htmlFor="token" className="sr-only">
                Codigo Token
              </label>
              <input
                id="token"
                name="token"
                type="text"
                autoComplete="one-time-code"
                required
                className="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                placeholder="Código Token"
                value={token}
                onChange={(e) => setToken(e.target.value)}
              />
            </div>
          </div>
          <div className={`${!openToken && "hidden"}`}>
            <button
              type="button"
              onClick={() => logIn()}
              disabled={isLoadingToken}
              className="group relative flex w-full justify-center rounded-md border border-transparent bg-cyan-500 px-4 py-2 text-sm font-medium text-white hover:bg-cyan-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 active:bg-cyan-300 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isLoadingToken ? (
                <svg
                  className="-ml-1 mr-3 h-5 w-5 animate-spin text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
              ) : null}
              {isLoadingToken ? "Iniciando Sesión..." : "Iniciar Sesión"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
