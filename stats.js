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
    const guildRedItemCounts = allDrops
        .filter(drop => drop.rarity === 'red' && drop.member !== 'Leitas')
        .reduce((acc, drop) => {
            const guild = drop.guild;
            const item = drop.item;
            if (!acc[guild]) {
                acc[guild] = {};
            }
            if (!acc[guild][item]) {
                acc[guild][item] = 0;
            }
            acc[guild][item]++;
            return acc;
        }, {});

    let guildHighlightHTML = Object.entries(guildRedItemCounts).map(([guild, items]) => {
        const guildIcon = guild === 'SHOWTIME' ? 'https://i.imgur.com/0VSezrG.png' : 'https://i.imgur.com/htONejf.png';
        const guildClass = guild === 'SHOWTIME' ? 'showtime-guild-name' : 'sunny-guild-name';

        const itemsHTML = Object.entries(items).map(([itemName, count]) => {
            let pluralItemName = itemName;
            if (count > 1 && itemName === 'Chama de Condor') {
                pluralItemName = 'Chamas de Condor';
            }
            
            return `
                <div class="item-info" style="margin-top: 10px;">
                    <img src="${itemDetails[itemName]?.img}" alt="${itemName}" style="height: 25px; width: 25px; margin-bottom: 5px;">
                    <span class="${itemDetails[itemName]?.class}" style="font-size: 0.9rem;">${count} ${pluralItemName}</span>
                </div>
            `;
        }).join('');

        return `
            <div class="guild-spotlight-item">
                <img src="${guildIcon}" alt="Ícone da Guilda">
                <p class="stat-name ${guildClass} mt-2">${guild}</p>
                ${itemsHTML}
            </div>
        `;
    }).join('');


    // --- 4. Estatística Estática (Vitórias Consecutivas) ---
    const chamberWinsHTML = `
        <div class="stat-card">
            <h3>Vitórias Consecutivas Chamber</h3>
            <img src="https://i.imgur.com/tQOXfU0.png" alt="Ícone de Chamber" style="height: 60px; margin: 10px auto;">
            <p class="stat-name" style="font-size: 1.5rem;">7 Vitórias</p>
            <p class="stat-count">Sequência Atual</p>
        </div>
    `;

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
                ${chamberWinsHTML}
            </div>
        </div>
    `;

    statsPlaceholder.innerHTML = statsHTML;
});
