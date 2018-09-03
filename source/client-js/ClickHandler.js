// this is a static class
require('isomorphic-fetch');
const ClickHandler = {
    apiUrl: process.env.API_URL || 'http://localhost:8080/api/',
    addClickListeners: function() {
        const body = document.querySelector('body');
        body.addEventListener('click', this.handleClicked);
    },
    handleClicked: function(e) {
        const clicked = e.target;
        if (clicked.hasAttribute('data-clickable')) {
            e.preventDefault();
            ClickHandler[clicked.getAttribute('data-clickable')](clicked);
        }
    },
    // addItemToReq: function(element) {
    //     const requestId = element.getAttribute('data-reqId');
    //     console.log(requestId);
    // },
    deleteRequest: function(element) {
        const requestId = element.getAttribute('data-reqId');
        if (confirm("Are you sure you want to delete this request?  This action CANNOT be undone!")) {
            const url = this.apiUrl + 'requests/' + requestId;
            fetch(url, {
                    method: 'delete'
                })
                .then((response) => {
                    const redirectUrl = window.location.origin + '/requests';
                    window.location.href = redirectUrl;
                })
                .catch(error => console.error('Fetch Error: ', error));
        }
    },
    submitRequest: function(element) {
        const requestId = element.getAttribute('data-reqId');
        const url = this.apiUrl + 'requests/' + requestId;
        const updateData = {
            id: requestId,
            status: 'submitted'
        };
        fetch(url, {
                method: 'put',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(updateData)
            })
            .then((response) => {
                const redirectUrl = window.location.origin + '/requests/' + requestId;
                window.location.href = redirectUrl;
            })
            .catch(error => console.error('Fetch Error: ', error));
    },
}

module.exports = ClickHandler;