export default class RequestHolidayService {
    
    constructor(domain) {
        this.domain = domain || 'http://localhost';
        this.requestHoliday = this.requestHoliday.bind(this);
        this.requestHolidays = this.requestHolidays.bind(this);
    }

    // TODO: We need to wrap our requests to check if the token is expired
    requestHoliday(holiday){
        return fetch(`${this.domain}/`, { 
            method: 'POST',
            headers: { "content-type": "Application/json"},
            body: JSON.stringify({ holiday }),
        })
        .then(this._checkStatus)
        .then(response => response.json())
        .then(res => {            
            return Promise.resolve(res);
        });
    }

    requestHolidays(holidays){
        return fetch(`${this.domain}/createMultiple`, { 
            method: 'POST',
            headers: { "content-type": "Application/json"},
            body: JSON.stringify({ holidays }),
        })
        .then(this._checkStatus)
        .then(response => response.json())
        .then(res => {            
            return Promise.resolve(res);
        });
    }

    _checkStatus(response) {
        if (response.status >= 200 && response.status < 300) {
            return response
        } else {
            var error = new Error(response.statusText)
            error.response = response
            throw error
        }
    }
}