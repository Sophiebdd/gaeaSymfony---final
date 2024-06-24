import React, { useState } from 'react';

function Show  ( userShow )  {
   

    const initialUsers = typeof userShow.user === 'string' ? JSON.parse(userShow.user) : userShow;
    const [user, setUser] = useState(initialUsers);

    

    
    return (
        <>
            <div className="App">
                <h1 key={user.id}>Informations de l'utilisateur: {user.nom} {user.prenom}</h1>
                <table className='table'>
                    <thead>
                        <tr>
                            <th>E-mail</th>
                            <th>Adresse</th>
                            <th>Téléphone</th>
                            <th>Date de naissance</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr key={user.id}>
                            <td>{user.email}</td>
                            <td>{user.adresse}</td>
                            <td>{user.tel}</td>
                            <td>{new Date(user.birthdate).toLocaleDateString()}</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <h2>Tableau de ses possessions:</h2>
            <table className='table'>
                <thead>
                    <tr>
                        <th>Possessions</th>
                        <th>Type</th>
                        <th>Valeur</th>
                    </tr>
                </thead>
                <tbody>
                    {user.possession?.map((possession, index) => (
                        <tr key={index}>
                            <td>{possession.nom}</td>
                            <td>{possession.type}</td>
                            <td>{possession.valeur}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    );
}

export default Show;