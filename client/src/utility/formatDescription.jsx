export const formatDescription = (description) => {
    const keywords = ["Description", "Responsibilities", "Requirements"];

    // Escape special characters for regex
    const escapedKeywords = keywords.map(keyword => keyword.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&'));
    
    // Create a regex to find the keywords
    const regex = new RegExp(`(${escapedKeywords.join('|')})`, 'g');
    
    // Replace keywords with <h1> tags and add line breaks
    return description
        .replace(regex, '<h1 class="font-bold text-gray-500">$1</h1>')
        .replace(/\n/g, '<br/>');
};