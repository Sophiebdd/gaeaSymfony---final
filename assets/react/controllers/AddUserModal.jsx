import React, { useState } from 'react';
import Modal from 'react-modal';
import Input from './Input';

Modal.setAppElement('#root'); // Important pour l'accessibilité

function AddUserModal({ isOpen, onRequestClose, onUserSubmit }) {
    const [formData, setFormData] = useState({
        nom: '',
        prenom: '',
        adresse: '',
        tel: '',
        email: '',
        birthdate: ''
        
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = () => {
        onUserSubmit(formData); 
        onRequestClose(); 
    };

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            contentLabel="Ajouter un utilisateur"
        >
        <h2>Ajouter un nouvel utilisateur</h2>
        <form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
        <Input name="nom" label="Nom" value={formData.nom} onChange={handleChange} />
        <Input name="prenom" label="Prénom" value={formData.prenom} onChange={handleChange} />
        <Input name="adresse" label="Adresse" value={formData.adresse} onChange={handleChange} />
        <Input name="tel" label="Numéro de téléphone" value={formData.tel} onChange={handleChange} />
        <Input name="email" label="E-mail" value={formData.email} onChange={handleChange} />
        <Input name="birthdate" label="Date d'anniversaire" type="date" value={formData.birthdate} onChange={handleChange} />
                
                <button type="submit">Ajouter</button>
            </form>
            <button onClick={onRequestClose}>Fermer</button>
        </Modal>
    );
}

export default AddUserModal;

