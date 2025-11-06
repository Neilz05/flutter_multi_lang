import Base from 'ember-simple-auth/authenticators/base';
import { inject as service } from '@ember/service';

export default class TR181Authenticator extends Base {
    @service intl

    restore(data) {
        // Ensure sessionId is present in the stored session data
        if (data) {
            return Promise.resolve(data);
        } else {
            return Promise.reject('Session data missing or invalid');
        }
    }

    authenticate(username, password) {
        return fetch('/session', {
            method: 'POST',
            cache: 'no-cache',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: username,
                password: password
            })
        }).then(response => {
    
            if (!response.ok){
                return Promise.reject()
            }
            let csrf_token = response.headers.get('X-CSRF-Token');
            if (csrf_token) {
                sessionStorage.setItem('csrf_token', csrf_token);
            } else {
                console.warn('CSRF token not found in response headers');
            }
            return response.json()
        }).then(data => {
    
            if (!data)
                return Promise.reject()
            
            return {
                ...data,
                username: username,
            }
        }).catch(err => {
            throw new Error('Authentication Failed')
        })
    }

    invalidate() {
        // Clear session and credentials from localStorage and sessionStorage
        localStorage.clear();
        sessionStorage.clear();

        return Promise.resolve();
    }
}
