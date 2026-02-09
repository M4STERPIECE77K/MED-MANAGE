export interface Appointment {
    id: number;
    patient: string;
    email: string;
    phone: string;
    service: string;
    date: string;
    time: string;
    status: 'Confirmé' | 'En attente' | 'Annulé' | 'Terminé';
    notes?: string;
}

export interface Patient {
    id: number;
    name: string;
    email: string;
    phone: string;
    lastVisit: string;
    birthDate?: string;
    address?: string;
    medicalHistory?: string;
}

export interface Service {
    id: string;
    name: string;
    icon: string;
    description: string;
    duration?: string;
    price?: string;
    status?: 'Actif' | 'Inactif';
}

export interface BookingFormData {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    date: string;
    time: string;
    service: string;
    notes?: string;
}
