export const Cookie = {
    /**
     * Gets a cookie value by name. Automatically parses JSON values if detected.
     * @param {string} cookieName - The cookie name
     * @returns {string|any} The cookie value (string, parsed JSON, or empty string if not found)
     * @example
     * Cookie.get('settings'); // returns {theme: 'dark'} if JSON
     */
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
     * Sets a cookie with the specified name and value. Objects are automatically JSON stringified.
     * @param {string} cookieName - The cookie name
     * @param {string|Object} value - The cookie value
     * @param {string} [expires=''] - Expiration date in UTC string format (e.g. new Date().toUTCString())
     * @param {string} [path='/'] - The cookie path
     * @returns {void}
     * @example
     * Cookie.set('settings', {theme: 'dark'}, new Date(Date.now() + 86400000).toUTCString());
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

    /**
     * Deletes a cookie by name by setting its expiration to the past.
     * @param {string} cookieName - The cookie name
     * @param {string} [path] - The cookie path (must match the path used when setting)
     * @returns {void}
     * @example
     * Cookie.delete('settings', '/app');
     */
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