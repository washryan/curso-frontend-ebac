document.getElementById("btnCarregar").addEventListener("click", () => {
  fetch("https://jsonplaceholder.typicode.com/users")
    .then(res => {
      if (!res.ok) {
        throw new Error("Erro ao buscar usuários. Status: " + res.status);
      }
      return res.json();
    })
    .then(dados => {
      const lista = document.getElementById("listaUsuarios");
      lista.innerHTML = "";
      dados.forEach(user => {
        lista.innerHTML += `<li>${user.name} - ${user.email}</li>`;
      });
    })
    .catch(erro => {
      console.error("Falha na requisição:", erro.message);
      alert("Não foi possível carregar os usuários. Tente novamente.");
    });
});
