async function loginUser() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
        const response = await fetch('https://assetmanager.vercel.app/api/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });

        const textResponse = await response.text(); // Leitura como texto
        console.log("Resposta do servidor:", textResponse); // Verifique o que está sendo retornado

        // Tentando analisar o JSON, caso a resposta seja um JSON válido
        let data;
        try {
            data = JSON.parse(textResponse);
        } catch (err) {
            console.error("Erro ao parsear JSON:", err);
            alert("Resposta do servidor não é JSON válido.");
            return;
        }

        if (response.ok) {
            // Armazena o token e o email no localStorage
            localStorage.setItem('token', data.token);
            localStorage.setItem('email', data.email);

            alert(data.message || "Login bem-sucedido!"); // Mensagem de sucesso
            
            // Redireciona o usuário para a página inicial ou dashboard após o login
            window.location.href = 'index.html'; 
        } else {
            alert(data.message || "Erro ao fazer login"); // Mensagem de erro
        }
    } catch (error) {
        console.error("Erro:", error);
        alert("Erro ao fazer login");
    }
}