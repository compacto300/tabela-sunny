document.addEventListener('DOMContentLoaded', function() {
    if (typeof allDrops === 'undefined' || typeof itemDetails === 'undefined') {
        console.error("Os dados dos drops (allDrops) ou detalhes dos itens (itemDetails) não foram encontrados.");
        return;
    }

    const statsPlaceholder = document.getElementById('stats-placeholder');
    if (!statsPlaceholder) return;

    // --- 1. Cálculo do Drop Rate dos Itens ---
    const totalDrops = allDrops.length;
    const itemCounts = allDrops.reduce((acc, drop) => {
        acc[drop.item] = (acc[drop.item] || 0) + 1;
        return acc;
    }, {});

    const itemPercentages = Object.entries(itemCounts)
        .map(([name, count]) => ({
            name,
            count,
            percentage: ((count / totalDrops) * 100).toFixed(1)
        }))
        .sort((a, b) => b.count - a.count);

    let dropRateHTML = itemPercentages.map(item => `
        <li class="stat-list-item">
            <div class="item-info">
                <img src="${itemDetails[item.name]?.img || ''}" alt="${item.name}">
                <span class="item-name ${itemDetails[item.name]?.class || ''}">${item.name}</span>
            </div>
            <span class="item-percentage">${item.percentage}%</span>
        </li>
    `).join('');

    // --- 2. Cálculo de Quem Bidou Mais (excluindo Leitas) ---
    const memberCounts = allDrops
        .filter(drop => drop.member !== 'Leitas')
        .reduce((acc, drop) => {
            acc[drop.member] = (acc[drop.member] || 0) + 1;
            return acc;
        }, {});
    
    const topBidders = Object.entries(memberCounts)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 3);

    let topBiddersHTML = topBidders.map(([name, count]) => {
        const guild = allDrops.find(drop => drop.member === name).guild;
        const guildIcon = guild === 'SHOWTIME' ? 'https://i.imgur.com/0VSezrG.png' : 'https://i.imgur.com/htONejf.png';
        return `
            <li class="stat-list-item">
                <div class="item-info">
                    <span class="stat-name">${name}</span>
                    <img src="${guildIcon}" alt="Ícone da Guilda" class="guild-logo-stat">
                </div>
                <span class="item-percentage">${count} Itens</span>
            </li>
        `;
    }).join('');

    // --- 3. Destaque das Guildas (Itens Raros) ---
    const rarityOrder = { 'red': 1, 'purple': 2, 'yellow': 3, 'grey': 4 };
    const guildHighlights = allDrops
        .filter(drop => drop.rarity === 'red' && drop.member !== 'Leitas')
        .reduce((acc, drop) => {
            if (!acc[drop.guild]) {
                acc[drop.guild] = { guild: drop.guild, item: drop.item };
            }
            return acc;
        }, {});

    let guildHighlightHTML = Object.values(guildHighlights).map(highlight => {
        const guildIcon = highlight.guild === 'SHOWTIME' ? 'https://i.imgur.com/0VSezrG.png' : 'https://i.imgur.com/htONejf.png';
        const guildClass = highlight.guild === 'SHOWTIME' ? 'showtime-guild-name' : 'sunny-guild-name';
        return `
            <div class="guild-spotlight-item">
                <img src="${guildIcon}" alt="Ícone da Guilda">
                <p class="stat-name ${guildClass} mt-2">${highlight.guild}</p>
                <div class="item-info">
                    <img src="${itemDetails[highlight.item]?.img}" alt="${highlight.item}">
                    <span class="${itemDetails[highlight.item]?.class}">${highlight.item}</span>
                </div>
            </div>
        `;
    }).join('');


    // --- Monta o HTML final e insere na página ---
    const statsHTML = `
        <div class="stats-section">
            <h2 class="stats-title text-4xl">Estatísticas Gerais</h2>
            <div class="stats-grid">
                <div class="stat-card">
                    <h3>Drop Rate dos Itens</h3>
                    <ul class="stat-list">${dropRateHTML}</ul>
                </div>
                <div class="stat-card">
                    <h3>Quem Bidou Mais Itens</h3>
                    <ul class="stat-list" style="text-align: left;">${topBiddersHTML}</ul>
                </div>
                <div class="stat-card">
                    <h3>Destaque (Itens Vermelhos)</h3>
                    <div class="guild-spotlight-container">${guildHighlightHTML}</div>
                </div>
            </div>
        </div>
    `;

    statsPlaceholder.innerHTML = statsHTML;
});
