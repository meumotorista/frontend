import { NavLink } from 'react-router-dom';
import { Users, Car, LogOut, LayoutDashboard } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function Sidebar() {
    const { logout, user } = useAuth();

    return (
        <div className="sidebar">
            <div style={{ marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Car size={28} color="#6366f1" />
                <h2 style={{ margin: 0 }}>Uber Admin</h2>
            </div>

            <div style={{ marginBottom: '2rem' }}>
                <p style={{ margin: 0, fontWeight: 'bold' }}>{user?.nome}</p>
                <p style={{ margin: 0, fontSize: '0.8rem', opacity: 0.7 }}>{user?.tipo}</p>
            </div>

            <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', flex: 1 }}>
                <NavLink to="/dashboard" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
                    <LayoutDashboard size={20} /> Dashboard
                </NavLink>
                <NavLink to="/usuarios" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
                    <Users size={20} /> Usuários
                </NavLink>
                <NavLink to="/veiculos" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
                    <Car size={20} /> Véiculos
                </NavLink>
            </nav>

            <button onClick={logout} className="nav-link" style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: '#ef4444' }}>
                <LogOut size={20} /> Sair
            </button>
        </div>
    );
}
