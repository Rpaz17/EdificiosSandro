import api from './api';

export function fetchNotificaciones(params) {
    return api.get('/notificaciones', { params });
}

export function crearNotificacionInterna(data) {
    return api.post('/notificaciones/internal', data);
}

export function fetchNotificacionesNoLeidas() {
    return api.get('/notificaciones', { params: { estado: 'no-leida' } });
}

export function marcarNotificacionesLeidas() {
    return api.put('/notificaciones', { params: { estado: 'leida' } });
}

export function createNotificacionInterna (data) {
    return api.post('/notificaciones/internal', data);
}