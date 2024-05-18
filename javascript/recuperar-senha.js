const nodemailer = require('nodemailer');

// Configurar o transporte de e-mail
const transporter = nodemailer.createTransport({
    service: 'smtp.hostinger.com',
    port: 587,
    auth: {
        user: 'joao.thallys@chatshub.com.br',
        pass: 'iu36O!jBufFm#qTB~u+hH$+VqzIizzae'
    }
});

// Função para enviar e-mail de recuperação de senha
function enviarEmailRecuperacaoSenha(email) {
    const linkRecuperacaoSenha = `http://seusite.com/recuperar-senha?token=`;
    const mailOptions = {
        from: 'joao.thallys@chatshub.com.br',
        to: email,
        subject: 'Recuperação de Senha',
        html: `<p>Você solicitou a recuperação de senha. Clique <a href="${linkRecuperacaoSenha}">aqui</a> para redefinir sua senha.</p>`
    };

    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            console.error('Erro ao enviar e-mail:', error);
            // Exibir mensagem de erro ao usuário
            alert('Ocorreu um erro ao enviar o e-mail de recuperação de senha. Por favor, tente novamente mais tarde.');
        } else {
            console.log('E-mail enviado:', info.response);
            // Exibir mensagem de sucesso ao usuário
            alert('Um e-mail de recuperação de senha foi enviado para o seu endereço de e-mail.');
        }
    });
}


document.getElementById('recoveryForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    // Obter o e-mail digitado pelo usuário
    const email = document.getElementById('email').value;
    
    // Chamando a função para enviar o e-mail de recuperação de senha
    enviarEmailRecuperacaoSenha(email);
});
