import { useEffect, useState } from 'react';
import api from '../services/api';
import Sidebar from '../components/Sidebar';
import VehicleModal from '../components/VehicleModal';
import { Plus, Edit, Trash } from 'lucide-react';

export default function VehiclesPage() {
    const [vehicles, setVehicles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [modalOpen, setModalOpen] = useState(false);
    const [currentVehicle, setCurrentVehicle] = useState(null);

    const loadVehicles = () => {
        setLoading(true);
        api.get('/veiculos')
            .then(res => setVehicles(res.data))
            .catch(err => console.error(err))
            .finally(() => setLoading(false));
    };

    useEffect(() => {
        loadVehicles();
    }, []);

    const handleAdd = () => {
        setCurrentVehicle(null);
        setModalOpen(true);
    };

    const handleEdit = (vehicle) => {
        setCurrentVehicle(vehicle);
        setModalOpen(true);
    };

    const handleDelete = async (id) => {
        if (window.confirm('Tem certeza que deseja excluir este veículo?')) {
            try {
                await api.delete(`/veiculos/${id}`);
                loadVehicles();
            } catch (error) {
                console.error('Erro ao excluir veículo:', error);
                alert('Erro ao excluir veículo');
            }
        }
    };

    const handleSave = async (vehicleData) => {
        try {
            if (vehicleData.id) {
                // Edit
                // Merge with existing data if needed
                const originalVehicle = vehicles.find(v => v.id === vehicleData.id);
                const payload = { ...originalVehicle, ...vehicleData };
                await api.put(`/veiculos/${vehicleData.id}`, payload);
            } else {
                // Create
                // Ensure motoristaId is set (for now, maybe hardcode or leave empty if JSON server allows)
                // If we need a motoristaId, we should probably pick one or default to 1 for this demo
                // user didn't ask for generic generic assignment, so let's default to motorista 1 or just send data
                const payload = { ...vehicleData, motoristaId: 1 };
                await api.post('/veiculos', payload);
            }
            setModalOpen(false);
            loadVehicles();
        } catch (error) {
            console.error('Erro ao salvar veículo:', error);
            alert('Erro ao salvar veículo');
        }
    };

    return (
        <div className="page-container">
            <Sidebar />
            <div className="content-area">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                    <h1>Veículos</h1>
                    <button className="btn-primary" onClick={handleAdd} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <Plus size={20} /> Novo Veículo
                    </button>
                </div>

                {loading ? <p>Carregando...</p> : (
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1rem' }}>
                        {vehicles.map(vehicle => (
                            <div key={vehicle.id} className="glass-panel" style={{ padding: '1rem', display: 'flex', flexDirection: 'column', gap: '10px', position: 'relative' }}>
                                {vehicle.foto && (
                                    <img src={vehicle.foto} alt={vehicle.modelo} style={{ width: '100%', height: '150px', objectFit: 'cover', borderRadius: '8px' }} />
                                )}
                                <div>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                                        <h3 style={{ margin: 0 }}>{vehicle.marca} {vehicle.modelo}</h3>
                                        <div style={{ display: 'flex', gap: '5px' }}>
                                            <button onClick={() => handleEdit(vehicle)} style={{ background: 'rgba(255,255,255,0.1)', border: 'none', color: '#fff', borderRadius: '4px', padding: '4px', cursor: 'pointer' }}>
                                                <Edit size={16} />
                                            </button>
                                            <button onClick={() => handleDelete(vehicle.id)} style={{ background: 'rgba(239, 68, 68, 0.2)', border: 'none', color: '#ef4444', borderRadius: '4px', padding: '4px', cursor: 'pointer' }}>
                                                <Trash size={16} />
                                            </button>
                                        </div>
                                    </div>
                                    <span style={{ fontSize: '0.9rem', opacity: 0.7 }}>{vehicle.placa} • {vehicle.ano}</span>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto' }}>
                                    <span style={{
                                        padding: '4px 8px',
                                        borderRadius: '4px',
                                        background: 'rgba(255,255,255,0.1)',
                                        fontSize: '0.8rem'
                                    }}>
                                        {vehicle.categoria}
                                    </span>
                                    <span style={{
                                        color: vehicle.status === 'ativo' ? '#4ade80' : '#94a3b8',
                                        fontWeight: 'bold',
                                        fontSize: '0.9rem'
                                    }}>
                                        {vehicle.status.toUpperCase()}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            <VehicleModal
                isOpen={modalOpen}
                onClose={() => setModalOpen(false)}
                onSave={handleSave}
                vehicle={currentVehicle}
            />
        </div>
    );
}

