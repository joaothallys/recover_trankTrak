document.getElementById('recoveryForm').addEventListener('submit', async function(event) {
    event.preventDefault();
    
    const email = document.getElementById('email').value;
    const novaSenha = document.getElementById('novaSenha').value;
    
    const requestBody = {
        email_usuario: email,
        nova_senha: novaSenha
    };
    
    try {
        const response = await fetch('https://node-deploy-api-d20r.onrender.com/usuario/senha', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestBody)
        });
        
        if (response.ok) {
            document.getElementById('mensagemSucesso').textContent = 'Senha alterada com sucesso!';
            document.getElementById('mensagemSucesso').classList.remove('hidden');
            document.getElementById('mensagemErro').classList.add('hidden');
        } else {
            document.getElementById('mensagemErro').textContent = 'Erro ao alterar a senha. Por favor, tente novamente.';
            document.getElementById('mensagemErro').classList.remove('hidden');
            document.getElementById('mensagemSucesso').classList.add('hidden');
        }
    } catch (error) {
        console.error('Erro ao enviar solicitação:', error);
        document.getElementById('mensagemErro').textContent = 'Erro ao enviar solicitação. Por favor, tente novamente mais tarde.';
        document.getElementById('mensagemErro').classList.remove('hidden');
        document.getElementById('mensagemSucesso').classList.add('hidden');
    }
});
