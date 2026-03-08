import { useContext, useEffect, useState } from "react";
import { ArrowBigDownDash } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { STORAGE } from "@/constants/general.constants.ts";
import { supabaseAuth, supabaseVerifyCodeOTP } from "@/services/supabase.service.ts";
import toast from "react-hot-toast";
import AdminContext from "@/context/AdminContext.tsx";
import { withViewTransition } from "@/helpers/viewTransition.ts";

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

    setIsLoading(false);
  };

  const logIn = async () => {
    setIsLoadingToken(true);

    const { data, error } = await supabaseVerifyCodeOTP(email, token);
    if (error) {
      console.log("error", error);
      toast.error("Error al iniciar sesión");
      setIsLoadingToken(false);
      return;
    }

    sessionStorage.setItem("authState", JSON.stringify({ auth: true, session: data }));
    setUser(data.session);
    setIsLoadingToken(false);
    withViewTransition(() => navigate(STORAGE));
  };

  const checkCookies = () => {
    const authSessionCookie = document.cookie.match("auth-session=([^;]+)");
    return !!authSessionCookie;
  };

  useEffect(() => {
    const isAuthenticated = checkCookies();
    if (isAuthenticated) {
      withViewTransition(() => navigate(STORAGE));
    }
  }, [navigate]);

  return (
    <div className="mx-auto flex min-h-[calc(100vh-3rem)] w-full max-w-md items-center justify-center px-2 sm:px-6">
      <div className="glass-card soft-entry w-full space-y-7 p-6 sm:p-8">
        <div className="space-y-2 text-center">
          <p className="text-xs uppercase tracking-[0.25em] text-cyan-200/80">Store All DO</p>
          <h2 className="text-3xl font-extrabold text-slate-100">Iniciar Sesion</h2>
          <p className="text-sm text-slate-300/80">Pon tu email e ingresa el codigo enviado a tu correo</p>
        </div>

        <form className="space-y-4">
          <div
            className="space-y-3"
            onKeyDown={async (e) => e.key === "Enter" && (await sendTokenToEmail())}
          >
            <label htmlFor="email" className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-100/70">
              Correo
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              className="w-full rounded-xl border border-white/30 bg-white/10 px-4 py-2.5 text-slate-100 placeholder:text-slate-300/60 focus:border-cyan-200/80 focus:outline-none"
              placeholder="Correo Electronico"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <button
            type="button"
            onClick={sendTokenToEmail}
            disabled={isLoading}
            className="glass-button flex w-full items-center justify-center gap-2 px-4 py-2.5 text-sm font-semibold disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isLoading ? (
              <svg
                className="h-4 w-4 animate-spin"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle className="opacity-20" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path
                  className="opacity-90"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                />
              </svg>
            ) : null}
            {isLoading ? "Enviando codigo..." : "Enviar Codigo"}
          </button>

          <div className={`${!openToken && "hidden"} soft-float flex w-full items-center justify-center text-cyan-200`}>
            <ArrowBigDownDash />
          </div>

          <div className={`${!openToken && "hidden"} space-y-3`} onKeyDown={(e) => e.key === "Enter" && logIn()}>
            <label htmlFor="token" className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-100/70">
              Token
            </label>
            <input
              id="token"
              name="token"
              type="text"
              autoComplete="one-time-code"
              required
              className="w-full rounded-xl border border-white/30 bg-white/10 px-4 py-2.5 text-slate-100 placeholder:text-slate-300/60 focus:border-cyan-200/80 focus:outline-none"
              placeholder="Codigo Token"
              value={token}
              onChange={(e) => setToken(e.target.value)}
            />
          </div>

          <div className={`${!openToken && "hidden"}`}>
            <button
              type="button"
              onClick={logIn}
              disabled={isLoadingToken}
              className="glass-button w-full px-4 py-2.5 text-sm font-semibold disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isLoadingToken ? "Iniciando Sesion..." : "Iniciar Sesion"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
