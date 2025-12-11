import api from './api';

export function fetchApartamentos() {
    return api.get('/apartamentos');
}

export function fetchApartamentoById(id) {
    return api.get(`/apartamentos/${id}`);
}

export function createApartamento(data) {
    return api.post('/apartamentos', data);
}

export function updateApartamento(id, data) {
    return api.put(`/apartamentos/${id}`, data);
}

export function deleteApartamento(id) {
    return api.delete(`/apartamentos/${id}`);
}