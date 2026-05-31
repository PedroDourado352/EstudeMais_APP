export default function Login({ onEnter }) {
  const [email, setEmail] = useState("carlos@estudemais.app");
  const [pass, setPass] = useState("••••••••");
  return (
    <div className="em-login">
      <div className="em-art">
        <div className="glow" /><div className="rings"><i /><i /><i /><i /></div>
        <div className="em-art-brand">
          <div className="lg"><Timer size={24} /></div>
          <h1>EstudeMais</h1>
        </div>
        <div className="em-art-mid">
          <h2>Cada minuto de estudo, no lugar certo.</h2>
          <p>Cronometre qualquer matéria, acompanhe sua evolução e mantenha o ritmo
             com um histórico completo do seu progresso.</p>
          <div className="em-art-stats">
            <div><div className="v">8h 45</div><div className="l">esta semana</div></div>
            <div><div className="v">12</div><div className="l">dias seguidos</div></div>
            <div><div className="v">+24%</div><div className="l">vs. semana passada</div></div>
          </div>
        </div>
      </div>

      <div className="em-form-wrap">
        <div className="em-form">
          <div className="welcome">Bem-vindo de volta 👋</div>
          <div className="sub">Entre para continuar de onde parou.</div>

          <div className="em-field">
            <label>E-mail</label>
            <input className="em-input" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="voce@email.com" />
          </div>
          <div className="em-field">
            <label>Senha</label>
            <input className="em-input" type="password" value={pass} onChange={(e) => setPass(e.target.value)} placeholder="sua senha" />
          </div>
          <div className="em-forgot">Esqueci minha senha</div>

          <button className="em-btn em-btn-p" style={{ width: "100%", justifyContent: "center" }} onClick={onEnter}>
            Entrar <ArrowRight size={17} />
          </button>

          <div className="em-divider">ou continue com</div>
          <button className="em-btn em-btn-g em-social" onClick={onEnter}>
            <svg width="17" height="17" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.5 12.2c0-.7-.1-1.4-.2-2H12v3.8h5.9a5 5 0 0 1-2.2 3.3v2.7h3.6c2.1-1.9 3.2-4.8 3.2-7.8Z"/><path fill="#34A853" d="M12 23c2.9 0 5.4-1 7.2-2.6l-3.6-2.7c-1 .7-2.3 1.1-3.6 1.1-2.8 0-5.1-1.9-6-4.4H2.3v2.8A11 11 0 0 0 12 23Z"/><path fill="#FBBC05" d="M6 14.4a6.6 6.6 0 0 1 0-4.2V7.4H2.3a11 11 0 0 0 0 9.8L6 14.4Z"/><path fill="#EA4335" d="M12 5.5c1.6 0 3 .5 4.1 1.6l3.1-3.1A11 11 0 0 0 2.3 7.4L6 10.2c.9-2.6 3.2-4.7 6-4.7Z"/></svg>
            Entrar com Google
          </button>

          <div className="em-foot-t">Ainda não tem conta? <b>Criar conta grátis</b></div>
        </div>
      </div>
    </div>
  );
}