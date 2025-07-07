// Este é o ficheiro central com todos os dados dos drops.
// Para adicionar novos drops, basta adicionar um novo objeto ao final da lista.

const allDrops = [
    // Semana 1 - Dados Reais
    { week: 1, date: "2025-07-02", period: "13:00", member: "PaiCalvo", item: "Crystal of Chaos", guild: "SHOWTIME", rarity: "yellow" },
    { week: 1, date: "2025-07-02", period: "21:00", member: "WolfKiller", item: "Crystal of Chaos", guild: "SHOWTIME", rarity: "yellow" },
    { week: 1, date: "2025-07-03", period: "13:00", member: "Nyx", item: "Crystal of Chaos", guild: "SUNNY", rarity: "yellow" },
    { week: 1, date: "2025-07-03", period: "21:00", member: "Nesgo", item: "Crystal of Chaos", guild: "SUNNY", rarity: "yellow" },
    { week: 1, date: "2025-07-04", period: "13:00", member: "PaiCalvo", item: "Crystal of Chaos", guild: "SHOWTIME", rarity: "yellow" },
    { week: 1, date: "2025-07-04", period: "13:00", member: "Lua", item: "Pena de Condor", guild: "SHOWTIME", rarity: "purple" },
    { week: 1, date: "2025-07-04", period: "21:00", member: "Balena", item: "Chama de Condor", guild: "SHOWTIME", rarity: "red" },
    { week: 1, date: "2025-07-05", period: "13:00", member: "Suellen", item: "Pena de Condor", guild: "SUNNY", rarity: "purple" },
    { week: 1, date: "2025-07-05", period: "13:00", member: "Shivu", item: "Crystal of Chaos", guild: "SUNNY", rarity: "yellow" },
    { week: 1, date: "2025-07-05", period: "21:00", member: "Damu", item: "Crystal of Chaos", guild: "SUNNY", rarity: "yellow" },
    { week: 1, date: "2025-07-06", period: "13:00", member: "Leitas", item: "Crystal of Chaos", guild: "SUNNY", rarity: "yellow" },
    { week: 1, date: "2025-07-06", period: "21:00", member: "Leitas", item: "Crystal of Chaos", guild: "SUNNY", rarity: "yellow" },
    { week: 1, date: "2025-07-06", period: "21:30", member: "Nesgo", item: "Crystal of Chaos", guild: "SUNNY", rarity: "yellow", event: "Castle Siege" },
    { week: 1, date: "2025-07-06", period: "21:30", member: "Balena", item: "Pena de Condor", guild: "SHOWTIME", rarity: "purple", event: "Castle Siege" },
    { week: 1, date: "2025-07-06", period: "21:30", member: "GeoFxx", item: "Pena de Condor", guild: "SUNNY", rarity: "purple", event: "Castle Siege" },
    { week: 1, date: "2025-07-06", period: "21:30", member: "Leitas", item: "Chama de Condor", guild: "SUNNY", rarity: "red", event: "Castle Siege" },
    { week: 1, date: "2025-07-06", period: "21:30", member: "Leitas", item: "Chama de Condor", guild: "SUNNY", rarity: "red", event: "Castle Siege" },
    { week: 1, date: "2025-07-06", period: "21:30", member: "Balena", item: "Baú de Arcanjo", guild: "SHOWTIME", rarity: "grey", event: "Castle Siege" },
    { week: 1, date: "2025-07-06", period: "21:30", member: "LF", item: "Chama de Condor", guild: "SHOWTIME", rarity: "red", event: "Castle Siege" },
    
    // Semana 2
    { week: 2, date: "2025-07-07", period: "13:00", member: "GeoFxx", item: "Crystal of Chaos", guild: "SHOWTIME", rarity: "yellow" },
];

const itemDetails = {
    "Crystal of Chaos": { img: "https://i.imgur.com/8KBqrWc.png", class: "crystal-color" },
    "Pena de Condor": { img: "https://i.imgur.com/USJWfue.png", class: "pena-color" },
    "Chama de Condor": { img: "https://i.imgur.com/HrNP7sU.png", class: "chama-color" },
    "Baú de Arcanjo": { img: "https://i.imgur.com/eI96EXs.png", class: "bau-arcanjo-color" }
};
