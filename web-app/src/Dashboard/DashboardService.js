import decode from 'jwt-decode';

export default class DashboardService {
    constructor(domain) {
        this.domain = domain || 'http://localhost' 
        this.getUserProfile = this.getUserProfile.bind(this)
        this.getUser = this.getUser.bind(this)
        this.getUserEmail = this.getUserEmail.bind(this)
    }

    // TODO: We need to wrap our requests to check if the token is expired

    getUserProfile(firstname, lastname) {

        if(!firstname){
            let names = this.getNamesFromEmail();

            firstname = names[0];
            lastname = names[1];
        }

        return fetch(`${this.domain}/employees/findByForenameAndSurname/` + firstname, + '/' + lastname, {
            method: "GET",
            headers: { "content-type": "Application/json"},
        })
        .then(this._checkStatus)
        .then(response => response.json())
        .then(res => {
            this.setUser(res)
            return Promise.resolve(res);
        })
    }

    setUser(user) {
        localStorage.setItem('user_object', user)
    }

    getUser() {
        return localStorage.getItem('user_object')
    }

    getUserEmail() {
        return localStorage.getItem('user_email')
    }

    getNamesFromEmail(){
        const email = this.DashboardService.getUserEmail();

        var splitOne = email.split(".");
        var splitTwo = splitOne[1].split("@");
    
        const firstName = splitOne[0];
        const lastName = splitTwo[0];

        return { firstName, lastName };
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