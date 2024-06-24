import React, { useState } from 'react';
import AddUserModal from './AddUserModal';


function Index({ users }) {
///////////////// DECODAGE DU JSON EN TABLEAU POUR LA FONCTION MAP ///////////////
    const initialUsers = typeof users === 'string' ? JSON.parse(users) : users;

    const [userList, setUserList] = useState(initialUsers);


    


/////////////////// FONCTION DELETE ////////////////////////
const handleDeleteUser = (id) => {
    fetch(`/index/users/${id}`, { 
        method: 'DELETE'
    })
    .then(response => response.json())
    .then(data => {
        if (data.message === 'L\'utilisateur a bien été supprimé') {
            const updatedUsers = userList.filter(user => user.id !== id);
            setUserList(updatedUsers);
        } else {
            throw new Error('Failed to delete user');
        }
    })
    .catch(error => {
        console.error('Error deleting user:', error);
    });
};

    


////////////////////// FENETRE MODALE DE CREATION /////////////////////////////////////////////
const [modalIsOpen, setModalIsOpen] = useState(false);

const handleUserSubmit = async (userData) => {
    console.log('Submitting user', userData);
    
    try {
        const response = await fetch('/api/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
        });

        if (response.ok) {
            console.log('User added successfully');
            setModalIsOpen(false);  
            
        } else {
            const errorData = await response.json();
            console.error('Failed to add user', errorData);
            
        }
    } catch (error) {
        console.error('Error submitting user:', error);
        
    }
};





////////////////////// TABLEAU DES UTILISATEURS ///////////////////////////
    return (
        <div className="App">
            <h1>Liste des utilisateurs</h1>
            <table className='table'>
                <thead>
                    <tr>
                        <th>Nom Prénom</th>
                        <th>E-mail</th>
                        <th>Adresse</th>
                        <th>Téléphone</th>
                        <th>Date de naissance</th>
                        <th>Age</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {userList.map((user) => (
                        <tr key={user.id}>
                            <td>
                                <a href={`/index/${user.id}`}>
                                    {user.nom} {user.prenom}
                                </a>
                            </td>
                            <td>{user.email}</td>
                            <td>{user.adresse}</td>
                            <td>{user.tel}</td>
                            <td>{new Date(user.birthdate).toLocaleDateString()}</td>
                            <td>{user.age}</td>
                            <td>
                                <button className='btn btn-danger' onClick={() => handleDeleteUser(user.id)}>Supprimer</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <button onClick={() => setModalIsOpen(true)}>Ajouter un utilisateur</button>
            <AddUserModal
                isOpen={modalIsOpen}
                onRequestClose={() => setModalIsOpen(false)}
                onUserSubmit={handleUserSubmit}
            />
            
        </div>
    );
}

export default Index;