import { useEffect, useState } from 'react';
import api from '../services/api';
import Sidebar from '../components/Sidebar';

export default function VehiclesPage() {
    const [vehicles, setVehicles] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        api.get('/veiculos')
            .then(res => setVehicles(res.data))
            .catch(err => console.error(err))
            .finally(() => setLoading(false));
    }, []);

    return (
        <div className="page-container">
            <Sidebar />
            <div className="content-area">
                <h1>Veículos</h1>

                {loading ? <p>Carregando...</p> : (
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1rem' }}>
                        {vehicles.map(vehicle => (
                            <div key={vehicle.id} className="glass-panel" style={{ padding: '1rem', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                {vehicle.foto && (
                                    <img src={vehicle.foto} alt={vehicle.modelo} style={{ width: '100%', height: '150px', objectFit: 'cover', borderRadius: '8px' }} />
                                )}
                                <div>
                                    <h3 style={{ margin: 0 }}>{vehicle.marca} {vehicle.modelo}</h3>
                                    <span style={{ fontSize: '0.9rem', opacity: 0.7 }}>{vehicle.placa}</span>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
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
        </div>
    );
}
