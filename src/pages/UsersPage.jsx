import { useEffect, useState } from 'react';
import api from '../services/api';
import Sidebar from '../components/Sidebar';
import UserModal from '../components/UserModal';
import { Plus, Edit, Trash } from 'lucide-react';

export default function UsersPage() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [modalOpen, setModalOpen] = useState(false);
    const [currentUser, setCurrentUser] = useState(null);

    const loadUsers = () => {
        setLoading(true);
        api.get('/usuarios')
            .then(res => setUsers(res.data))
            .catch(err => console.error(err))
            .finally(() => setLoading(false));
    };

    useEffect(() => {
        loadUsers();
    }, []);

    const handleAdd = () => {
        setCurrentUser(null);
        setModalOpen(true);
    };

    const handleEdit = (user) => {
        setCurrentUser(user);
        setModalOpen(true);
    };

    const handleDelete = async (id) => {
        if (window.confirm('Tem certeza que deseja excluir este usuário?')) {
            try {
                await api.delete(`/usuarios/${id}`);
                loadUsers();
            } catch (error) {
                console.error('Erro ao excluir usuário:', error);
                alert('Erro ao excluir usuário');
            }
        }
    };

    const handleSave = async (userData) => {
        try {
            if (userData.id) {
                // Edit
                // Merge with existing data to prevent data loss (e.g. preferences)
                const originalUser = users.find(u => u.id === userData.id);
                const payload = { ...originalUser, ...userData };
                await api.put(`/usuarios/${userData.id}`, payload);
            } else {
                // Create
                await api.post('/usuarios', userData);
            }
            setModalOpen(false);
            loadUsers();
        } catch (error) {
            console.error('Erro ao salvar usuário:', error);
            alert('Erro ao salvar usuário');
        }
    };

    return (
        <div className="page-container">
            <Sidebar />
            <div className="content-area">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                    <h1>Usuários</h1>
                    <button className="btn-primary" onClick={handleAdd} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <Plus size={20} /> Novo Usuário
                    </button>
                </div>

                {loading ? <p>Carregando...</p> : (
                    <div className="glass-panel" style={{ overflow: 'hidden' }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                            <thead>
                                <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                                    <th style={{ padding: '1rem' }}>Nome</th>
                                    <th style={{ padding: '1rem' }}>Email</th>
                                    <th style={{ padding: '1rem' }}>Tipo</th>
                                    <th style={{ padding: '1rem' }}>Telefone</th>
                                    <th style={{ padding: '1rem', textAlign: 'right' }}>Ações</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.map(user => (
                                    <tr key={user.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                                        <td style={{ padding: '1rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
                                            {user.foto && <img src={user.foto} alt="" style={{ width: 32, height: 32, borderRadius: '50%', objectFit: 'cover' }} />}
                                            {user.nome}
                                        </td>
                                        <td style={{ padding: '1rem' }}>{user.email}</td>
                                        <td style={{ padding: '1rem' }}>
                                            <span style={{
                                                padding: '4px 8px',
                                                borderRadius: '4px',
                                                background: user.tipo === 'motorista' ? 'rgba(99, 102, 241, 0.2)' : user.tipo === 'admin' ? 'rgba(234, 179, 8, 0.2)' : 'rgba(236, 72, 153, 0.2)',
                                                color: user.tipo === 'motorista' ? '#818cf8' : user.tipo === 'admin' ? '#facc15' : '#f472b6',
                                                fontSize: '0.8rem'
                                            }}>
                                                {user.tipo}
                                            </span>
                                        </td>
                                        <td style={{ padding: '1rem' }}>{user.telefone}</td>
                                        <td style={{ padding: '1rem', textAlign: 'right' }}>
                                            <button onClick={() => handleEdit(user)} style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer', marginRight: '10px' }}>
                                                <Edit size={18} />
                                            </button>
                                            <button onClick={() => handleDelete(user.id)} style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer' }}>
                                                <Trash size={18} />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            <UserModal
                isOpen={modalOpen}
                onClose={() => setModalOpen(false)}
                onSave={handleSave}
                user={currentUser}
            />
        </div>
    );
}

