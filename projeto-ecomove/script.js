let usuarioLogado = null;

const avatares = {
    'Usuário_01': 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80',
    'Usuário_02': 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80',
    'Usuário_03': 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80',
    'default': 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80'
};

const iconesTipo = {
    'Bicicleta': '<i class="fa-solid fa-bicycle"></i>',
    'Caminhada': '<i class="fa-solid fa-person-walking"></i>',
    'Transporte público': '<i class="fa-solid fa-bus"></i>'
};

let atividades = [
    { id: 1, usuario: 'Usuário_03', tipo: 'Caminhada', distancia: 2, duracao: 30, co2: 0.22, likes: 1, liked: false, data: '09:15 - 05/10/24' },
    { id: 2, usuario: 'Usuário_02', tipo: 'Transporte público', distancia: 10, duracao: 50, co2: 0.35, likes: 0, liked: false, data: '20:40 - 15/08/24' },
    { id: 3, usuario: 'Usuário_01', tipo: 'Bicicleta', distancia: 10, duracao: 50, co2: 0.35, likes: 0, liked: false, data: '18:30 - 12/08/24' },
    { id: 4, usuario: 'Usuário_01', tipo: 'Caminhada', distancia: 5, duracao: 50, co2: 0.35, likes: 0, liked: false, data: '05:30 - 09/07/24' }
];

document.getElementById('btn-auth').addEventListener('click', () => {
    if (usuarioLogado) {
        realizarLogout();
    } else {
        alternarAba('login');
        document.getElementById('modal-login').classList.remove('hidden');
    }
});

function alternarAba(aba) {
    limparErros();
    if (aba === 'cadastrar') {
        document.getElementById('form-login-body').classList.add('hidden');
        document.getElementById('form-cadastro-body').classList.remove('hidden');
        document.getElementById('modal-title').innerHTML = '<i class="fa-solid fa-user-plus"></i> Cadastro';
    } else {
        document.getElementById('form-cadastro-body').classList.add('hidden');
        document.getElementById('form-login-body').classList.remove('hidden');
        document.getElementById('modal-title').innerHTML = '<i class="fa-solid fa-lock"></i> Login';
    }
}

function fecharModal() {
    document.getElementById('modal-login').classList.add('hidden');
    limparErros();
}

function limparErros() {
    const inputs = document.querySelectorAll('.modal input');
    const errors = document.querySelectorAll('.error-message');
    inputs.forEach(i => i.classList.remove('input-error'));
    errors.forEach(e => e.innerText = '');
}

function realizarLogin() {
    limparErros();
    const email = document.getElementById('login-email').value;
    const senha = document.getElementById('login-senha').value;
    let valido = true;

    if (!email) {
        document.getElementById('login-email').classList.add('input-error');
        document.getElementById('err-email').innerText = 'email obrigatório';
        valido = false;
    }

    if (!senha) {
        document.getElementById('login-senha').classList.add('input-error');
        document.getElementById('err-senha').innerText = 'senha obrigatória';
        valido = false;
    }

    if (!valido) return;

    usuarioLogado = { nome: 'Usuário_01' };
    fecharModal();

    document.getElementById('btn-auth').innerHTML = '<i class="fa-solid fa-right-from-bracket"></i> Logout';
    document.getElementById('btn-atividade').disabled = false;
    document.getElementById('profile-name').innerText = usuarioLogado.nome;

    const avatarContainer = document.getElementById('user-avatar');
    avatarContainer.innerHTML = `<img src="${avatares['Usuário_01']}" alt="Avatar">`;
}

function realizarCadastro() {
    limparErros();
    const nome = document.getElementById('cad-nome').value;
    const email = document.getElementById('cad-email').value;
    const senha = document.getElementById('cad-senha').value;
    let valido = true;

    if (!nome) {
        document.getElementById('cad-nome').classList.add('input-error');
        document.getElementById('err-cad-nome').innerText = 'nome obrigatório';
        valido = false;
    }
    if (!email) {
        document.getElementById('cad-email').classList.add('input-error');
        document.getElementById('err-cad-email').innerText = 'email obrigatório';
        valido = false;
    }
    if (!senha) {
        document.getElementById('cad-senha').classList.add('input-error');
        document.getElementById('err-cad-senha').innerText = 'senha obrigatória';
        valido = false;
    }

    if (!valido) return;

    // Login automático após cadastro
    usuarioLogado = { nome: nome };
    avatares[nome] = avatares['default'];
    fecharModal();

    document.getElementById('btn-auth').innerHTML = '<i class="fa-solid fa-right-from-bracket"></i> Logout';
    document.getElementById('btn-atividade').disabled = false;
    document.getElementById('profile-name').innerText = usuarioLogado.nome;

    const avatarContainer = document.getElementById('user-avatar');
    avatarContainer.innerHTML = `<img src="${avatares['default']}" alt="Avatar">`;
}

function realizarLogout() {
    usuarioLogado = null;
    document.getElementById('btn-auth').innerHTML = '<i class="fa-solid fa-right-to-bracket"></i> Login';
    document.getElementById('btn-atividade').disabled = true;
    document.getElementById('profile-name').innerText = 'EcoMove';
    document.getElementById('user-avatar').innerHTML = `<img src="logo.png" alt="EcoMove Logo">`;
    document.getElementById('sec-cadastrar').classList.add('hidden');
}

document.getElementById('btn-atividade').addEventListener('click', () => {
    if (usuarioLogado) {
        document.getElementById('sec-cadastrar').classList.toggle('hidden');
    }
});

function salvarAtividade() {
    const tipo = document.getElementById('tipo-atividade').value;
    const distMetros = parseFloat(document.getElementById('input-distancia').value);
    const duracao = parseInt(document.getElementById('input-duracao').value);

    if (!distMetros || !duracao) {
        alert('Preencha a distância e a duração corretamente!');
        return;
    }

    const distKm = distMetros / 1000;
    const co2 = (distKm * 0.035).toFixed(2);

    const novaAtividade = {
        id: Date.now(),
        usuario: usuarioLogado.nome,
        tipo: tipo,
        distancia: distKm,
        duracao: duracao,
        co2: co2,
        likes: 0,
        liked: false,
        data: 'Agora'
    };

    atividades.unshift(novaAtividade);
    renderizarAtividades(atividades);
    document.getElementById('sec-cadastrar').classList.add('hidden');
    document.getElementById('input-distancia').value = '';
    document.getElementById('input-duracao').value = '';
}

function renderizarAtividades(lista) {
    const feed = document.getElementById('feed-atividades');
    feed.innerHTML = '';

    lista.forEach(item => {
        const div = document.createElement('div');
        div.className = 'card-atividade';

        const avatarUrl = avatares[item.usuario] || avatares['default'];
        const icone = iconesTipo[item.tipo] || '';

        div.innerHTML = `
            <div class="card-left">
                <img class="user-avatar-feed" src="${avatarUrl}" alt="${item.usuario}">
                <div class="card-info">
                    <h4>${icone} ${item.tipo}</h4>
                    <p><strong>${item.usuario}</strong></p>
                    <p>${item.distancia} km | ${item.duracao} min | ${item.co2} kg CO₂ evitado</p>
                    <small>${item.data}</small>
                </div>
            </div>
            <div>
                <span class="like-btn ${item.liked ? 'active' : ''}" onclick="toggleLike(${item.id})">
                    <i class="${item.liked ? 'fa-solid' : 'fa-regular'} fa-heart"></i> ${item.likes}
                </span>
            </div>
        `;
        feed.appendChild(div);
    });
}

function toggleLike(id) {
    if (!usuarioLogado) {
        alternarAba('login');
        document.getElementById('modal-login').classList.remove('hidden');
        return;
    }
    const item = atividades.find(a => a.id === id);
    if (item) {
        item.liked = !item.liked;
        item.likes += item.liked ? 1 : -1;
        renderizarAtividades(atividades);
    }
}

function filtrar(tipo) {
    if (tipo === 'Todos') {
        renderizarAtividades(atividades);
    } else {
        const filtradas = atividades.filter(a => a.tipo === tipo);
        renderizarAtividades(filtradas);
    }
}

renderizarAtividades(atividades);