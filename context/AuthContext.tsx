
import { Session } from "@supabase/supabase-js";
import { createContext, PropsWithChildren, useContext, useEffect, useState } from "react";
import { supabase } from '../utils/supabase';

type User = {

    id: string,
    name: string, 
    email: string

}

const AuthContext = createContext<{
    user: User | null,
    session: Session | null,
    isLoading: boolean,
    userProfile: { name: string } | null
}>({ user: null, session: null, isLoading: false, userProfile: null})

export default function AuthProvider({ children }: PropsWithChildren){
    const [user, setUser] = useState<User | null>(null);
    const [session, setSession] = useState<Session | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [userProfile, setUserProfile] = useState<{ name: string } | null>(null);

    // Vérifier si l'utilisateur est déjà connecté
    const checkSession = async () => {
        try {
          const { data } = await supabase.auth.getSession();
          setSession(data.session);
  
          if (data.session?.user) {
            // Récupérer les informations utilisateur depuis la table users
            const { data: userData, error } = await supabase
              .from('users')
              .select('*')
              .eq('id', data.session.user.id)
              .single();
  
            if (userData && !error) {
              setUser(userData as User);
              setUserProfile({ name: userData.name });
            }
          }
        } catch (error) {
          console.error('Erreur lors de la récupération de la session:', error);
        } finally {
          setIsLoading(false);
        }
    }

    useEffect(() => {
        checkSession()
    }, [])

    console.log("User", user)

    return (
        <AuthContext.Provider value={{ user, session, isLoading, userProfile }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext)