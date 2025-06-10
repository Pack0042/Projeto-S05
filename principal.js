const eventos = [
    {
        id: 1,
        title: 'Semana do Software 2025',
        date: '12/05',
        time: '10:00',
        location: 'Salão de Eventos',
        type: 'tech',
        description: 'Uma semana inteira dedicada à tecnologia e inovação, com palestras, workshops e hackathons.',
        image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&q=80&w=800&h=400'
    },
    {
        id: 2,
        title: 'Workshop de IoT',
        date: '12/01',
        time: '08:00',
        location: 'Laboratório CS&I',
        type: 'tech',
        description: 'Workshop prático sobre Internet das Coisas e suas aplicações na indústria 4.0.',
        image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=800&h=400'
    },
    {
        id: 3,
        title: 'Festa dos Alunos 2025',
        date: '18/05',
        time: '19:00',
        location: 'Área Esportiva do Inatel',
        type: 'cultural',
        description: 'Venha comemorar a melhor Festa dos Alunos de todos os tempos!',
        image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&q=80&w=800&h=400'
    },
    {
        id: 4,
        title: 'Feira de Oportunidades',
        date: '04/05',
        time: '10:00',
        location: 'Salão de Eventos',
        type: 'academic',
        description: 'Venha conhecer empresas e projetos com destaque na área da engenharia.',
        image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=800&h=400'
    }
];

function AbrirMenu() {
    document.getElementById("menu_aba").style.display = "block"; 
    document.getElementById("main").style.display = "none"; 
}

function FecharMenu() {
    document.getElementById("menu_aba").style.display = "none";   
    document.getElementById("main").style.display = "flex";  
}

function CarregarTema() {
    let Tema = localStorage.getItem("Tema");

    if (Tema == "Inatel") {
        TemaInatel();
    } else if (Tema == "Dark") {
        TemaDark();
    }
}

function SalvarTema(TemaEscolhido) {
    localStorage.setItem("Tema", TemaEscolhido);
}

function TemaInatel() {
    document.documentElement.style.setProperty('--cor-click', '#126ae2');
    document.documentElement.style.setProperty('--cor-sombra', '#0a599b');
    document.documentElement.style.setProperty('--cor-text', 'black');
    document.documentElement.style.setProperty('--cor-back1', '#edf2f4');
    document.documentElement.style.setProperty('--cor-back2', '#1b61ca');
    document.documentElement.style.setProperty('--cor-tema', 'black');
    document.documentElement.style.setProperty('--md-sys-color-primary', '#126ae2');
    SalvarTema("Inatel");
}

function TemaDark() {
    const cores = {
        '--cor-click': '#CEF09D',
        '--cor-sombra': '#9b0a59',
        '--cor-text': 'black',
        '--cor-back1': '#38184C',
        '--cor-back2': '#4f6a93',
        '--cor-tema': 'white',
        '--md-sys-color-primary': '#CEF09D'
    };

    SalvarTema("Dark");

    for (const [variavel, valor] of Object.entries(cores)) {
        document.documentElement.style.setProperty(variavel, valor);
    }
}


function CriarEventos() {
    const carousel = document.querySelector(".carousel");
    eventos.forEach(Evento => {
        const CardEvento = document.createElement("div");
        CardEvento.classList.add("CardEvento");

        CardEvento.innerHTML = `
            <img src="${Evento.image}" alt="${Evento.title}">
            <div class="info">
                <h3>${Evento.title}</h3>
                <p>${Evento.description}</p>
                <p><span class="material-symbols-outlined icon">event</span> ${Evento.date} às ${Evento.time} <span class="material-symbols-outlined icon">pin_drop</span> ${Evento.location}</p>
            </div>
        `;

        carousel.appendChild(CardEvento);
    });
}


document.addEventListener("DOMContentLoaded", function () {
    const carousel = document.querySelector(".carousel");
    let index = 0;
    let interval;

    function nextCard() {
        index = (index + 1) % eventos.length;
        updateCarousel();
    }

    function prevCard() {
        index = (index - 1 + eventos.length) % eventos.length;
        updateCarousel();
    }

    function updateCarousel() {
        carousel.style.transform = `translateX(-${index * 100}%)`;
    }

    function IniciaPassarAuto() {
        interval = setInterval(nextCard, 5000);
    }

    function CancelaPassarAuto() {
        clearInterval(interval);
    }

    document.getElementById('nextBtn').addEventListener('click', () => {
        nextCard();
        CancelaPassarAuto();
        IniciaPassarAuto();
    });

    document.getElementById('prevBtn').addEventListener('click', () => {
        prevCard();
        CancelaPassarAuto();
        IniciaPassarAuto();
    });

    carousel.addEventListener('mouseenter', CancelaPassarAuto);
    carousel.addEventListener('mouseleave', IniciaPassarAuto);

    let startX;
    carousel.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
    });

    carousel.addEventListener('touchend', (e) => {
        let endX = e.changedTouches[0].clientX;
        if (startX - endX > 50) nextCard();
        if (endX - startX > 50) prevCard();
        CancelaPassarAuto();
        IniciaPassarAuto();
    });


    IniciaPassarAuto();
});

