export const formatDescription = (description) => {
    // Check if description is undefined or null
    if (description == null) {
        console.warn('Description is undefined or null');
        return '';
    }

    const keywords = ["Description", "Responsibilities", "Requirements", "Job Overview:", "Key Responsibilities:", "Required Skills and Qualifications:", "Preferred Skills:", "What We Offer:"];

    // Escape special characters for regex
    const escapedKeywords = keywords.map(keyword => keyword.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&'));
    
    // Create a regex to find the keywords
    const regex = new RegExp(`(${escapedKeywords.join('|')})`, 'g');
    
    // Replace keywords with <h1> tags and add line breaks
    return description
        .replace(regex, '<h1 class="typography-h4 font-bold text-white my-2 ">$1</h1>')
        .replace(/\n/g, '<br>'); // Replace newlines with <br> tags
};