document.addEventListener('DOMContentLoaded', function() {
    const weekMatch = document.title.match(/Semana (\d+)/);
    if (!weekMatch) return;

    const currentWeek = parseInt(weekMatch[1], 10);
    const tableBody = document.getElementById('drops-table-body');
    if (!tableBody) return;

    // Define o início da contagem como a primeira segunda-feira do período.
    const firstMonday = new Date('2025-06-30T00:00:00-03:00'); 
    const weekStartDate = new Date(firstMonday);
    weekStartDate.setDate(weekStartDate.getDate() + (currentWeek - 1) * 7);
    
    const daysOfWeek = ["Domingo", "Segunda-feira", "Terça-feira", "Quarta-feira", "Quinta-feira", "Sexta-feira", "Sábado"];
    const guildRotation = ["SHOWTIME", "SUNNY"];
    
    // Calcula o número total de dias de rotação (não-domingos) antes desta semana.
    let rotationDaysBefore = 0;
    for (let i = 1; i < currentWeek; i++) {
        rotationDaysBefore += 6; // 6 dias de rotação por semana.
    }
    
    // O índice inicial depende da paridade dos dias de rotação anteriores.
    let currentGuildIndex = (rotationDaysBefore % 2);

    for (let i = 0; i < 7; i++) {
        const day = new Date(weekStartDate);
        day.setDate(day.getDate() + i);
        
        const dayOfWeek = day.getDay();
        const dateString = `${daysOfWeek[dayOfWeek]}, ${day.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' })}`;
        const dateISO = day.toISOString().split('T')[0];

        let dayClass = '';
        let dayGuild = '';

        if (dayOfWeek === 0) { // Domingo
            dayClass = 'leitas-day';
            dayGuild = 'SUNNY'; // Regra especial para o Leitas.
        } else {
            dayGuild = guildRotation[currentGuildIndex];
            dayClass = dayGuild.toLowerCase();
            currentGuildIndex = 1 - currentGuildIndex; // Alterna para o próximo dia de rotação.
        }

        tableBody.innerHTML += generateDayRows(dateString, dateISO, dayClass, dayGuild, currentWeek);
    }
    
    populateTableWithData(currentWeek);
    populateEventData(currentWeek);
});

function generateDayRows(dateDisplay, dateISO, dayClass, dayGuild, week) {
    const guildInfo = dayGuild === 'SHOWTIME' 
        ? { nameClass: 'showtime-guild-name', name: 'SHOWTIME', logo: 'https://i.imgur.com/0VSezrG.png' }
        : { nameClass: 'sunny-guild-name', name: 'SUNNY', logo: 'https://i.imgur.com/htONejf.png' };

    return `
        <tr class="${dayClass}" data-date="${dateISO}" data-period="13:00" data-week="${week}">
            <td>${dateDisplay}</td>
            <td><div>13:00</div><div class="flex items-center justify-center mt-1"><span>Dia</span><span class="ml-2">☀️</span></div></td>
            <td class="item-cell">...</td>
            <td class="member-cell">...</td>
            <td><div class="guild-cell-content"><span class="${guildInfo.nameClass}">${guildInfo.name}</span><img src="${guildInfo.logo}" class="guild-logo"></div></td>
        </tr>
        <tr class="${dayClass}" data-date="${dateISO}" data-period="21:00" data-week="${week}">
            <td>${dateDisplay}</td>
            <td><div>21:00</div><div class="flex items-center justify-center mt-1"><span>Noite</span><span class="ml-2">🌙</span></div></td>
            <td class="item-cell">...</td>
            <td class="member-cell">...</td>
            <td><div class="guild-cell-content"><span class="${guildInfo.nameClass}">${guildInfo.name}</span><img src="${guildInfo.logo}" class="guild-logo"></div></td>
        </tr>
    `;
}

function populateTableWithData(currentWeek) {
    if (typeof allDrops === 'undefined') return;

    const weekDrops = allDrops.filter(drop => drop.week === currentWeek && !drop.event);

    weekDrops.forEach(drop => {
        const rows = document.querySelectorAll(`tr[data-date="${drop.date}"][data-period="${drop.period}"]`);
        
        rows.forEach(row => {
            const itemCell = row.querySelector('.item-cell');
            const memberCell = row.querySelector('.member-cell');

            const itemHTML = `
                <img src="${itemDetails[drop.item]?.img || ''}" class="item-icon" alt="${drop.item}">
                <span class="${itemDetails[drop.item]?.class || ''}">${drop.item}</span>`;
            
            if (itemCell.innerHTML === '...') {
                itemCell.innerHTML = itemHTML;
                memberCell.innerHTML = drop.member;
            } else {
                const newRow = row.cloneNode(true);
                newRow.querySelector('.item-cell').innerHTML = itemHTML;
                newRow.querySelector('.member-cell').innerHTML = drop.member;
                row.parentNode.insertBefore(newRow, row.nextSibling);
            }
        });
    });
}

function populateEventData(currentWeek) {
    if (typeof allDrops === 'undefined') return;

    const eventDrops = allDrops.filter(drop => drop.week === currentWeek && drop.event);
    const tableBody = document.getElementById('drops-table-body');

    eventDrops.forEach(drop => {
        const guildInfo = drop.guild === 'SHOWTIME' 
            ? { nameClass: 'showtime-guild-name', name: 'SHOWTIME', logo: 'https://i.imgur.com/0VSezrG.png' }
            : { nameClass: 'sunny-guild-name', name: 'SUNNY', logo: 'https://i.imgur.com/htONejf.png' };
        
        const itemHTML = `
            <img src="${itemDetails[drop.item]?.img || ''}" class="item-icon" alt="${drop.item}">
            <span class="${itemDetails[drop.item]?.class || ''}">${drop.item}</span>`;

        const dateDisplay = new Date(drop.date + 'T00:00:00-03:00').toLocaleDateString('pt-BR', { weekday: 'long', day: '2-digit', month: '2-digit', year: 'numeric' });

        const newRow = document.createElement('tr');
        newRow.className = 'castle-siege';
        newRow.innerHTML = `
            <td>${dateDisplay}</td>
            <td><div>${drop.period}</div><div class="flex items-center justify-center mt-1"><span>${drop.event}</span></div></td>
            <td>${itemHTML}</td>
            <td>${drop.member}</td>
            <td><div class="guild-cell-content"><span class="${guildInfo.nameClass}">${guildInfo.name}</span><img src="${guildInfo.logo}" class="guild-logo"></div></td>
        `;
        tableBody.appendChild(newRow);
    });
}
