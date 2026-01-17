import { useState, useEffect } from 'react';

export default function VehicleModal({ isOpen, onClose, onSave, vehicle }) {
    const [formData, setFormData] = useState({
        marca: '',
        modelo: '',
        ano: new Date().getFullYear(),
        placa: '',
        categoria: 'UberX',
        status: 'ativo',
        foto: ''
    });

    useEffect(() => {
        if (vehicle) {
            setFormData({
                marca: vehicle.marca || '',
                modelo: vehicle.modelo || '',
                ano: vehicle.ano || new Date().getFullYear(),
                placa: vehicle.placa || '',
                categoria: vehicle.categoria || 'UberX',
                status: vehicle.status || 'ativo',
                foto: vehicle.foto || ''
            });
        } else {
            setFormData({
                marca: '',
                modelo: '',
                ano: new Date().getFullYear(),
                placa: '',
                categoria: 'UberX',
                status: 'ativo',
                foto: ''
            });
        }
    }, [vehicle, isOpen]);

    if (!isOpen) return null;

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave({ ...formData, id: vehicle?.id });
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
                <h2 style={{ marginTop: 0 }}>{vehicle ? 'Editar Veículo' : 'Novo Veículo'}</h2>
                <form onSubmit={handleSubmit}>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                        <input
                            className="input-field"
                            placeholder="Marca"
                            value={formData.marca}
                            onChange={e => setFormData({ ...formData, marca: e.target.value })}
                            required
                        />
                        <input
                            className="input-field"
                            placeholder="Modelo"
                            value={formData.modelo}
                            onChange={e => setFormData({ ...formData, modelo: e.target.value })}
                            required
                        />
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                        <input
                            className="input-field"
                            type="number"
                            placeholder="Ano"
                            value={formData.ano}
                            onChange={e => setFormData({ ...formData, ano: parseInt(e.target.value) })}
                            required
                        />
                        <input
                            className="input-field"
                            placeholder="Placa"
                            value={formData.placa}
                            onChange={e => setFormData({ ...formData, placa: e.target.value })}
                            required
                        />
                    </div>

                    <select
                        className="input-field"
                        value={formData.categoria}
                        onChange={e => setFormData({ ...formData, categoria: e.target.value })}
                    >
                        <option value="UberX">UberX</option>
                        <option value="UberBlack">UberBlack</option>
                        <option value="Comfort">Comfort</option>
                    </select>

                    <select
                        className="input-field"
                        value={formData.status}
                        onChange={e => setFormData({ ...formData, status: e.target.value })}
                    >
                        <option value="ativo">Ativo</option>
                        <option value="inativo">Inativo</option>
                        <option value="manutencao">Manutenção</option>
                    </select>

                    <input
                        className="input-field"
                        placeholder="URL da Foto"
                        value={formData.foto}
                        onChange={e => setFormData({ ...formData, foto: e.target.value })}
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
