export default class BookedLeaveService {
    
    constructor(domain) {
        this.domain = domain || 'http://localhost';
        this.getHolidays = this.getHolidays.bind(this);
        this.updateHoliday = this.updateHoliday.bind(this);
        this.updateHolidays = this.updateHolidays.bind(this);
    }

    // TODO: We need to wrap our requests to check if the token is expired
    getHolidays(employeeId){
        const token = this.getToken();
        return fetch(`${this.domain}/holidays/findByEmployeeId/` + employeeId, { 
            method: 'GET',
            headers: { 
                "content-type": "Application/json",
                "authorization": "Bearer " + token
            }
        })
        .then(this._checkStatus)
        .then(response => response.json())
        .then(res => {            
            return Promise.resolve(res);
        });
    }

    updateHoliday(holiday){
        const token = this.getToken();
        return fetch(`${this.domain}/holidays/`, { 
            method: 'PUT',
            headers: { 
                "content-type": "Application/json",
                "authorization": "Bearer " + token
            },
            body: JSON.stringify({ holiday }),
        })
        .then(this._checkStatus)
        .then(response => response.json())
        .then(res => {            
            return Promise.resolve(res);
        });
    }

    updateHolidays(holidays){
        const token = this.getToken();
        return fetch(`${this.domain}/holidays/updateMultiple`, { 
            method: 'PUT',
            headers: { 
                "content-type": "Application/json",
                "authorization": "Bearer " + token
            },
            body: JSON.stringify({ holidays }),
        })
        .then(this._checkStatus)
        .then(response => response.json())
        .then(res => {            
            return Promise.resolve(res);
        });
    }

    getToken(){
        return localStorage.getItem('id_token')
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