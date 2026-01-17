import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Car } from 'lucide-react';

export default function Login() {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        const result = await login(email, senha);
        if (result.success) {
            navigate('/dashboard'); // Changed redirection to dashboard
        } else {
            setError(result.message);
        }
    };

    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
            background: 'radial-gradient(circle at top right, #1e293b, #0f172a)'
        }}>
            <div className="glass-panel" style={{ padding: '3rem', width: '100%', maxWidth: '400px', textAlign: 'center' }}>
                <div style={{ marginBottom: '2rem', display: 'flex', justifyContent: 'center', gap: '10px' }}>
                    <Car size={40} color="#6366f1" />
                    <h1 style={{ margin: 0, fontSize: '2rem' }}>Uber Admin</h1>
                </div>

                {error && <p style={{ color: '#ef4444', marginBottom: '1rem' }}>{error}</p>}

                <form onSubmit={handleSubmit}>
                    <input
                        type="email"
                        placeholder="Email (joao@email.com)"
                        className="input-field"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input
                        type="password"
                        placeholder="Senha (123)"
                        className="input-field"
                        value={senha}
                        onChange={(e) => setSenha(e.target.value)}
                    />
                    <button type="submit" className="btn-primary" style={{ width: '100%', marginTop: '1rem' }}>
                        Entrar
                    </button>
                </form>

                <p style={{ marginTop: '1.5rem', fontSize: '0.8rem', opacity: 0.7 }}>
                    Use: joao@email.com / 123
                </p>
            </div>
        </div>
    );
}
