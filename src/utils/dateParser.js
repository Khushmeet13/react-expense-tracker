import { parse } from 'date-fns';

export const parseDatePhrase = (phrase, keywords) => {
    console.log('Parsing phrase:', phrase);
    const today = new Date();
    let targetDate = new Date(today);

    switch (phrase) {
        case 'today':
            break; // Default is today's date
        case 'tomorrow':
            targetDate.setDate(today.getDate() + 1);
            break;
        case 'yesterday':
            targetDate.setDate(today.getDate() - 1);
            break;
        case 'dayaftertomorrow':
            targetDate.setDate(today.getDate() + 2);
            break;
        case 'daybeforeyesterday':
            targetDate.setDate(today.getDate() - 2);
            break;
        case 'next':
            // Handle phrases like "next week Saturday"
            // Assuming the next day is always mentioned after "next"
            const nextDay = keywords[keywords.indexOf('next') + 1];
            targetDate = getNextDayOfWeek(nextDay, today);
            break;
        case 'last':
            // Handle phrases like "last week"
            // Assuming the last day is always mentioned after "last"
            const lastDay = keywords[keywords.indexOf('last') + 1];
            targetDate = getLastDayOfWeek(lastDay, today);
            break;
        default:
            // If the phrase doesn't match predefined cases, attempt to parse it as a date
            targetDate = parse(phrase, 'MMMM d, yyyy', new Date()); 
            break;
    }

    return targetDate;
};


export const getNextDayOfWeek = (day, currentDate) => {
    const daysOfWeek = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
    const targetDayIndex = daysOfWeek.indexOf(day.toLowerCase());

    const currentDayIndex = currentDate.getDay();
    const daysUntilTargetDay = (7 + targetDayIndex - currentDayIndex) % 7; 
    const targetDate = new Date(currentDate);
    targetDate.setDate(currentDate.getDate() + daysUntilTargetDay);

    return targetDate;
};


export const getLastDayOfWeek = (day, currentDate) => {
    const daysOfWeek = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
    const targetDayIndex = daysOfWeek.indexOf(day.toLowerCase());

    const currentDayIndex = currentDate.getDay();
    const daysSinceLastTargetDay = (currentDayIndex - targetDayIndex + 7) % 7; 
    const targetDate = new Date(currentDate);
    targetDate.setDate(currentDate.getDate() - daysSinceLastTargetDay);

    return targetDate;
};