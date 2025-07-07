// Este é o ficheiro central que controla a navegação.
// Para adicionar uma nova semana, basta adicionar uma nova linha a esta lista!

const pages = [
    { title: "Semana 1", url: "index.html" },
    { title: "Semana 2", url: "semana2.html" },
    { title: "Semana 3", url: "semana3.html" },
    { title: "Semana 4", url: "semana4.html" }
    // Exemplo para o futuro: { title: "Semana 5", url: "semana5.html" }
];

// Esta função vai construir o menu de navegação
function createNavigation() {
    // Encontra o local na página onde o menu deve ser inserido
    const navContainer = document.getElementById('nav-placeholder');
    if (!navContainer) return; // Se não encontrar o local, não faz nada

    // Descobre qual é a página atual para a poder destacar
    const currentPageUrl = window.location.pathname.split('/').pop();

    // Cria o HTML para os links do menu
    let navLinksHTML = pages.map(page => {
        // Verifica se o link corresponde à página atual
        const isActive = (page.url === currentPageUrl) || (currentPageUrl === '' && page.url === 'index.html');
        // Adiciona a classe 'active' ao botão da página atual
        const activeClass = isActive ? 'active' : '';
        return `<a href="${page.url}" class="${activeClass}">${page.title}</a>`;
    }).join('');

    // Insere o menu completo na página
    navContainer.innerHTML = `
        <div class="nav-section">
            <h2 class="nav-title text-2xl">Navegar entre Semanas</h2>
            <div class="nav-links">
                ${navLinksHTML}
            </div>
        </div>
    `;
}

// Executa a função para criar o menu assim que a página carregar
document.addEventListener('DOMContentLoaded', createNavigation);
