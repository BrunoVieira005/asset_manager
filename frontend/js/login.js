async function loginUser() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
        const response = await fetch('https://assetmanager.vercel.app/api/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });

        // Verifique se a resposta foi bem-sucedida (status 2xx)
        if (response.ok) {
            const data = await response.json();  // Somente faz parse do JSON se a resposta for bem-sucedida

            // Armazena o token e o email no localStorage
            localStorage.setItem('token', data.token);
            localStorage.setItem('email', data.email);

            alert(data.message || "Login bem-sucedido!"); // Mensagem de sucesso
            
            // Redireciona o usuário para a página inicial ou dashboard após o login
            window.location.href = 'index.html'; 
        } else {
            const data = await response.json();  // Tenta obter o JSON da resposta de erro
            alert(data.message || "Erro ao fazer login"); // Mensagem de erro
        }
    } catch (error) {
        console.error("Erro:", error);
        alert("Erro ao fazer login: " + error.message);  // Exibe o erro detalhado
    }
}
