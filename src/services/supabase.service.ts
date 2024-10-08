import { createClient } from "@supabase/supabase-js";
import { SUPABASE_ANON_KEY, SUPABASE_PROJECT_URL } from "@/constants/general.constants.ts";

const supabase = createClient(SUPABASE_PROJECT_URL, SUPABASE_ANON_KEY);

const supabaseAuth = async (email: string) => {
  return await supabase.auth.signInWithOtp({
    email: email,
    options: {
      shouldCreateUser: false,
    },
  });
};

const supabaseVerifyCodeOTP = async (email: string, token: string) => {
  return await supabase.auth.verifyOtp({
    email,
    token: token,
    type: "email",
  });
};

export { supabase, supabaseAuth, supabaseVerifyCodeOTP };
