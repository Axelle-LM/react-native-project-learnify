const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

export function generateUUID() {
    const sections = [8, 4, 4, 4, 12]; // Longueur des sections d'un UUID
    let uuid = '';

    sections.forEach((length, index) => {
        let section = '';
        for (let i = 0; i < length; i++) {
            const randomIndex = Math.floor(Math.random() * characters.length);
            section += characters[randomIndex];
        }
        uuid += section;
        if (index < sections.length - 1) {
            uuid += '-'; // Ajout d'un séparateur entre les sections
        }
    });

    return uuid;
}