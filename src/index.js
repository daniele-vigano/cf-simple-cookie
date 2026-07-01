export const Cookie = {
    get: (cookieName) => {
        if ( !cookieName || typeof cookieName !== 'string' || cookieName.trim() === '' ) {
            return '';
        }

        // Escape special regex characters in cookieName
        const escapedName = cookieName.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        const re = new RegExp(`(?:^|;\\s*)${escapedName}=([^;]*)`);
        const sMatch = document.cookie.match(re);

        if ( sMatch && sMatch[1] ) {
            let decodedValue;

            try {
                decodedValue = decodeURIComponent(sMatch[1]);
            } catch (e) {
                // If decoding fails, return the raw value
                decodedValue = sMatch[1];
            }

            const trimmedValue = decodedValue.trim();
            const looksLikeStructuredJSON = trimmedValue.startsWith('{') || trimmedValue.startsWith('[');

            if ( looksLikeStructuredJSON ) {
                try {
                    return JSON.parse(trimmedValue);
                } catch (e) {
                    return decodedValue;
                }
            }

            return decodedValue;
        }
        return '';
    },

    /**
     * @param {string} cookieName - The cookie name
     * @param {string|object} value - The cookie value
     * @param {string} [expires=''] - Expiration date in UTC string format (e.g. new Date().toUTCString())
     * @param {string} [path='/'] - The cookie path
     */
    set: (cookieName, value, expires = '', path = '/') => {
        if ( !cookieName || typeof cookieName !== 'string' || cookieName.trim() === '' ) {
            console.warn('Cookie: cookieName is required and must be a non-empty string');
            return;
        }

        const encodedValue = typeof value === 'object' ? encodeURIComponent(JSON.stringify(value)) : encodeURIComponent(value);
        let cookieString = `${cookieName}=${encodedValue}`;

        if ( expires ) {
            cookieString += `; expires=${expires}`;
        }
        if ( path ) {
            cookieString += `; path=${path}`;
        }

        document.cookie = cookieString;
    },

    delete: (cookieName, path) => {
        if ( !cookieName || typeof cookieName !== 'string' || cookieName.trim() === '' ) {
            console.warn('Cookie: cookieName is required and must be a non-empty string');
            return;
        }

        let cookieString = `${cookieName}=; expires=${new Date(0).toUTCString()}`;
        if ( path ) {
            cookieString += `; path=${path}`;
        }

        document.cookie = cookieString;
    }
};

export default Cookie;