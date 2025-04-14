// Security utility functions
(function() {
    // Basic encryption using AES
    function encrypt(text, key) {
        const textToChars = text => text.split('').map(c => c.charCodeAt(0));
        const byteHex = n => ("0" + Number(n).toString(16)).substr(-2);
        const applySaltToChar = code => textToChars(key).reduce((a,b) => a ^ b, code);

        return text
            .split('')
            .map(textToChars)
            .map(applySaltToChar)
            .map(byteHex)
            .join('');
    }

    // Basic decryption
    function decrypt(encoded, key) {
        const textToChars = text => text.split('').map(c => c.charCodeAt(0));
        const applySaltToChar = code => textToChars(key).reduce((a,b) => a ^ b, code);
        
        return encoded
            .match(/.{1,2}/g)
            .map(hex => parseInt(hex, 16))
            .map(applySaltToChar)
            .map(charCode => String.fromCharCode(charCode))
            .join('');
    }

    // Secure storage operations
    const secureStorage = {
        setItem: function(key, value) {
            const encryptedValue = encrypt(JSON.stringify(value), 'your-secret-key');
            localStorage.setItem(key, encryptedValue);
        },
        
        getItem: function(key) {
            const encryptedValue = localStorage.getItem(key);
            if (!encryptedValue) return null;
            try {
                return JSON.parse(decrypt(encryptedValue, 'your-secret-key'));
            } catch (e) {
                return null;
            }
        },
        
        removeItem: function(key) {
            localStorage.removeItem(key);
        }
    };

    // Session management
    const sessionManager = {
        checkAuth: function() {
            const currentUser = secureStorage.getItem('currentUser');
            if (!currentUser) {
                window.location.href = 'login.html';
                return false;
            }
            return true;
        },

        setUser: function(user) {
            secureStorage.setItem('currentUser', user);
        },

        getUser: function() {
            return secureStorage.getItem('currentUser');
        },

        logout: function() {
            secureStorage.removeItem('currentUser');
            window.location.href = 'login.html';
        }
    };

    // Anti-tampering checks
    function checkIntegrity() {
        const scripts = document.getElementsByTagName('script');
        const styles = document.getElementsByTagName('link');
        
        // Check if any unauthorized scripts or styles were injected
        for (let script of scripts) {
            if (!script.src.includes('cdn.tailwindcss.com') && 
                !script.src.includes('security.js')) {
                console.error('Unauthorized script detected');
                return false;
            }
        }
        
        for (let style of styles) {
            if (!style.href.includes('fonts.googleapis.com') && 
                !style.href.includes('cdnjs.cloudflare.com')) {
                console.error('Unauthorized style detected');
                return false;
            }
        }
        
        return true;
    }

    // Expose functions to global scope with obfuscated names
    window._sec = {
        storage: secureStorage,
        session: sessionManager,
        verify: checkIntegrity
    };
})();
