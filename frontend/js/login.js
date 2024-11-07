function loginUser() {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
  
    fetch("/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Falha no login: ' + response.statusText);
        }
        return response.json();
      })
      .then(data => {
        console.log("Login bem-sucedido", data);
        // Armazenar token ou redirecionar, por exemplo
        localStorage.setItem('token', data.token);
        window.location.href = 'index.html';  // Exemplo de redirecionamento
      })
      .catch(error => {
        console.error("Erro ao tentar logar", error);
        alert("Erro: " + error.message);
      });
  }  