import { useState, useEffect } from 'react';

export default function UserModal({ isOpen, onClose, onSave, user }) {
    const [formData, setFormData] = useState({
        nome: '',
        email: '',
        telefone: '',
        tipo: 'passageiro',
        foto: '' // URL
    });

    useEffect(() => {
        if (user) {
            setFormData({
                nome: user.nome || '',
                email: user.email || '',
                telefone: user.telefone || '',
                tipo: user.tipo || 'passageiro',
                foto: user.foto || ''
            });
        } else {
            setFormData({
                nome: '',
                email: '',
                telefone: '',
                tipo: 'passageiro',
                foto: ''
            });
        }
    }, [user, isOpen]);

    if (!isOpen) return null;

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave({ ...formData, id: user?.id }); // Preserve ID if editing
    };

    return (
        <div style={{
            position: 'fixed',
            top: 0, left: 0, right: 0, bottom: 0,
            background: 'rgba(0,0,0,0.7)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
            backdropFilter: 'blur(5px)'
        }}>
            <div className="glass-panel" style={{ width: '400px', padding: '2rem' }}>
                <h2 style={{ marginTop: 0 }}>{user ? 'Editar Usuário' : 'Novo Usuário'}</h2>
                <form onSubmit={handleSubmit}>
                    <input 
                        className="input-field" 
                        placeholder="Nome" 
                        value={formData.nome} 
                        onChange={e => setFormData({...formData, nome: e.target.value})} 
                        required 
                    />
                    <input 
                        className="input-field" 
                        type="email" 
                        placeholder="Email" 
                        value={formData.email} 
                        onChange={e => setFormData({...formData, email: e.target.value})} 
                        required 
                    />
                    <input 
                        className="input-field" 
                        placeholder="Telefone" 
                        value={formData.telefone} 
                        onChange={e => setFormData({...formData, telefone: e.target.value})} 
                    />
                    <select 
                        className="input-field" 
                        value={formData.tipo} 
                        onChange={e => setFormData({...formData, tipo: e.target.value})}
                    >
                        <option value="passageiro">Passageiro</option>
                        <option value="motorista">Motorista</option>
                        <option value="admin">Admin</option>
                    </select>
                    <input 
                        className="input-field" 
                        placeholder="URL da Foto" 
                        value={formData.foto} 
                        onChange={e => setFormData({...formData, foto: e.target.value})} 
                    />

                    <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end', marginTop: '1rem' }}>
                        <button type="button" onClick={onClose} style={{
                            background: 'transparent',
                            border: '1px solid var(--glass-border)',
                            color: 'var(--text-color)',
                            padding: '10px 20px',
                            borderRadius: '8px',
                            cursor: 'pointer'
                        }}>Cancelar</button>
                        <button type="submit" className="btn-primary">Salvar</button>
                    </div>
                </form>
            </div>
        </div>
    );
}
