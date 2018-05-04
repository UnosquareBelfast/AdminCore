import decode from 'jwt-decode';

export default class DashboardService {
    constructor(domain) {
        this.domain = domain || 'http://localhost' 
        this.getUserProfile = this.getUserProfile.bind(this)
        this.getUserEmail = this.getUserEmail.bind(this)
    }

    // TODO: We need to wrap our requests to check if the token is expired

    getUserProfile(firstname, lastname) {

        const token = this.getToken();
        console.log('DashboardService - Get User Profile: ', firstname, lastname, ' Token: ', token);

        return fetch(`${this.domain}/employees/findByForenameAndSurname/` + firstname + '/' + lastname, {
            method: "GET",
            headers: { 
                "Content-Type": "Application/json",
                "Authorization": "Bearer " + token
            },
        })
        .then(_checkStatus =>{
            console.log('_checkStatus portion of fetch block: ', response);
        })
        .then(response => { 
            console.log('Response before .json: ', response);
            response.json()
            console.log('Response: ', response);
        })
        .then(res => {
            console.log('Res: ', res);
            return Promise.resolve(res);
        })
    }

    getToken(){
        return localStorage.getItem('id_token')
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
        console.log('_checkStatus call')
        if (response.status >= 200 && response.status < 300) {
            console.log('200 Response')
            return response
        } else {
            var error = new Error(response.statusText)
            error.response = response
            console.log('Error Response')
            throw error
        }
    }
}