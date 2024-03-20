export async function createUser(email, password) {
    const response = await fetch('http://localhost:8000/auth/register' , {
            method: 'POST', // Lo mandamos como metodo Post
            body: JSON.stringify({username: email, password: password}), // El metodo POST siempre necedita un body, header o algo
            headers: {
                'Content-type': "aplication/json"
            }        
        });

        // Si response da ok mandaremos el mensaje de creado correctamente
        if (!response.ok) {
            throw new Error('Error al crear el usuario');
            
        }
}