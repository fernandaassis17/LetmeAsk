import { 
  createContext, 
  ReactNode, 
  useEffect, 
  useState 
} from "react"
import { toast } from 'react-toastify'
import {  auth, firebase  } from '../services/firebase';

type User = {
  id: string;
  name: string | null;
  avatar: string | null;
}

type AuthContextType = {
  user: User | undefined;
  signInWithGoogle: () => Promise<void>;
}

interface Props {
  children: ReactNode;
}

export const AuthContext = createContext({} as AuthContextType)

export function AuthContextProvider({children}: Props) {

  const [ user, setUser ] = useState<User>()

  useEffect(() =>{
    const unsubscribe = auth.onAuthStateChanged(user => {
      if(user) {
        const { displayName, photoURL, uid } = user
    
        if(!displayName || !photoURL ) {
          toast.error('Missing information from Google Account', {
            position: toast.POSITION.TOP_RIGHT
          })
        }
    
        setUser({
          id: uid,
          name: displayName,
          avatar: photoURL
        })
      }

      return () => {
        unsubscribe()
      }
    })
  }, [])

  async function signInWithGoogle() {
    const provider = new firebase.auth.GoogleAuthProvider()

    const result = await auth.signInWithPopup(provider)

    if(result.user) {
    const { displayName, photoURL, uid } = result.user

    if(!displayName || !photoURL ) {
      toast.error('Missing information from Google Account', {
        position: toast.POSITION.TOP_RIGHT
      })
    }

    setUser({
      id: uid,
      name: displayName,
      avatar: photoURL
    })
    }
  }

  return(
    <AuthContext.Provider value={{user, signInWithGoogle}}>
      {children}
    </AuthContext.Provider>
  )
}