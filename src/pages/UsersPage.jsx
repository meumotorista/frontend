import { useEffect, useState } from 'react';
import api from '../services/api';
import Sidebar from '../components/Sidebar';

export default function UsersPage() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        api.get('/usuarios')
            .then(res => setUsers(res.data))
            .catch(err => console.error(err))
            .finally(() => setLoading(false));
    }, []);

    return (
        <div className="page-container">
            <Sidebar />
            <div className="content-area">
                <h1>Usuários</h1>

                {loading ? <p>Carregando...</p> : (
                    <div className="glass-panel" style={{ overflow: 'hidden' }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                            <thead>
                                <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                                    <th style={{ padding: '1rem' }}>Nome</th>
                                    <th style={{ padding: '1rem' }}>Email</th>
                                    <th style={{ padding: '1rem' }}>Tipo</th>
                                    <th style={{ padding: '1rem' }}>Avaliação</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.map(user => (
                                    <tr key={user.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                                        <td style={{ padding: '1rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
                                            {user.foto && <img src={user.foto} alt="" style={{ width: 32, height: 32, borderRadius: '50%' }} />}
                                            {user.nome}
                                        </td>
                                        <td style={{ padding: '1rem' }}>{user.email}</td>
                                        <td style={{ padding: '1rem' }}>
                                            <span style={{
                                                padding: '4px 8px',
                                                borderRadius: '4px',
                                                background: user.tipo === 'motorista' ? 'rgba(99, 102, 241, 0.2)' : 'rgba(236, 72, 153, 0.2)',
                                                color: user.tipo === 'motorista' ? '#818cf8' : '#f472b6',
                                                fontSize: '0.8rem'
                                            }}>
                                                {user.tipo}
                                            </span>
                                        </td>
                                        <td style={{ padding: '1rem' }}>⭐ {user.avaliacao}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
}
