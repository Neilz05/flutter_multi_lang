import Service from '@ember/service';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';

export default class ApiService extends Service {
  @service session;
  @service router;

  /**
   * Custom fetch method that wraps native fetch with additional functionality
   * @param {string} url - The URL to make the request to
   * @param {Object} options - Fetch options (method, headers, body, etc.)
   * @returns {Promise<Response>} - The fetch response
   */
  async customFetch(url, options = {}) {
    // Merge default headers with computed headers and any provided headers
    let defaultOptions = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'bearer ' + this.session.data.authenticated.sessionID,
        ...this.headers, // Include authentication headers from computed property
        ...(options.headers || {}) // Override with any custom headers
      }
    };
    if (sessionStorage.getItem('csrf_token')) {
      defaultOptions.headers['X-CSRF-Token'] = sessionStorage.getItem('csrf_token');
    }

    // Combine default options with provided options
    let mergedOptions = { ...defaultOptions, ...options };
    //console.log('Making request to:', url, 'with options:', mergedOptions);

    // Log the request details to sessionStorage for debugging purposes
    /*
    sessionStorage.setItem('lastRequest', JSON.stringify({
      url,
      method: mergedOptions.method || 'GET',
      timestamp: new Date().toISOString()
    }));
    */
    try {
      // Make the actual HTTP request
      let response = await fetch(url, mergedOptions);
      //console.log('Response Received From:', url, 'Response:', response);
      // Extract and store CSRF token from response headers for future requests
      if (response.ok) {
        response.headers.forEach((value, key) => {
          if (key === 'x-csrf-token') {
            sessionStorage.setItem('csrf_token', value);
          }
        });
      }

      // Check if the response indicates an error status
      if (!response.ok) {
        if (url.indexOf('Device.UserInterface.HTTPAccess') !== -1) {
          console.error('HTTP error! status:', response.status);
          if (response.status === 401) {
            this.session.clearSessionCheckTimeout();
            this.router.transitionTo('sessionend');
          } else {
            this.session.invalidate();
          }
        }
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return response;
    } catch (error) {
      // Log any errors that occur during the fetch operation
      //console.error('Fetch error:', error);
      throw error;
    }
  }
}
