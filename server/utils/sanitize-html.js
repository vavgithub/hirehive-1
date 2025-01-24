import sanitizeHtml from 'sanitize-html'
import he from 'he';

export function sanitizeLexicalHtml(html) {
    const decodedHTML = he.decode(html);

    const cleanHtml = sanitizeHtml(decodedHTML, {
        allowedTags: [
            'b', 'i', 'em', 'strong', 'u', 'p', 'ul', 'ol', 'li', 'a', 'blockquote',
            'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'br', 'span', 'img'
        ],
        allowedAttributes: {
            a: ['href', 'name', 'target','class'],
            img: ['src', 'alt', 'title', 'width', 'height','class'],
            '*': ['style','class'] // Allow inline styles (optional, use with caution)
        },
        allowedSchemes: ['http', 'https', 'mailto'], // Allow only specific URL schemes
        allowedSchemesByTag: {
            img: ['data'] // Allow `data:` scheme for images
        },
        // allowedStyles: {
        //     // Example styles (customize based on your requirements)
        //     '*': {
        //         'color': [/^#(0x)?[0-9a-f]+$/i, /^rgb\(/],
        //         'font-size': [/^\d+(?:px|em|%)$/],
        //         'text-align': [/^left|right|center|justify$/],
        //         'background-color': [/^#(0x)?[0-9a-f]+$/i, /^rgb\(/]
        //     }
        // },
        transformTags: {
            'a': (tagName, attribs) => {
                // Force all links to open in a new tab
                return {
                    tagName: 'a',
                    attribs: {
                        ...attribs,
                        target: '_blank',
                        rel: 'noopener noreferrer'
                    }
                };
            }
        },
        enforceHtmlBoundary: true // Ensures no HTML escapes outside
    });
    return cleanHtml;
}

