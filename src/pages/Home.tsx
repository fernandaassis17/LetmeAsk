import { useHistory } from 'react-router-dom';
import IllustrationImg from '../assets/images/illustration.svg'
import LogoImg from '../assets/images/logo.svg';
import GoogleIconImg from '../assets/images/google-icon.svg';
import ExitImg from '../assets/images/exit.svg';

import '../styles/auth.scss'
import { Button } from '../components/Button';
import { useAuth } from '../hooks/useAuth';



export function Home() {

  const history = useHistory()
  const { signInWithGoogle, user } = useAuth()

  async function handleCreateRoom() {
    if(!user) {
      await signInWithGoogle()
    }

    history.push('/rooms/new')
  }

  return (
    <div id="page-auth">
      <aside>
        <img 
          src={IllustrationImg} 
          alt="Ilustração simbolizando perguntas e respostas" 
        />
        <strong>
          Crie salas de Q&A ao-vivo     
        </strong>
        <p>
          Tire a s dúvidas da sua audiência em tempo-real
        </p>
      </aside>
      <main>
        <div className="main-content">
          <img src={LogoImg} alt="Logo principal" />
          <button onClick={handleCreateRoom} className="create-room"> 
            <img src={GoogleIconImg} alt="Logo Google" />
            Crie sua sala com o Google
          </button>
          <div className="separator">ou entre em uma sala</div>
          <form>
            <input 
              type="text"
              placeholder="Digite o código da sala"
            />
            <Button>
              <img src={ExitImg} alt="Logo Entrada" />
              Entrar na sala
            </Button>
          </form>
        </div>
      </main>
    </div>
  )
}