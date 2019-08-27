import React from 'react';
import { API } from 'aws-amplify';
import { Auth } from 'aws-amplify';

var QuickSightEmbedding = require("amazon-quicksight-embedding-sdk");

const Embed = ({}) => {
    
    var jwtToken;
    var payloadSub;
    var email;
    
    Auth.currentSession()
    .then(data => { console.log(data); jwtToken = data.idToken.jwtToken; payloadSub = data.idToken.payload.sub; email = data.idToken.payload.email; console.log(jwtToken + " - " + payloadSub + " - " + email); } )
    .catch(err => console.log(err));
    
    async function handleClick(e) {
        e.preventDefault();
        let myInit = { // OPTIONAL
            headers: {}, // OPTIONAL
            response: true, // OPTIONAL (return the entire Axios response object instead of only response.data)
            queryStringParameters: {  // OPTIONAL
                jwtToken: jwtToken,
                payloadSub: payloadSub,
                email: email
            }
        }
        const data = await API.get('quicksight', '/getQuickSightDashboardEmbedURL', myInit);
        console.log(data);
        console.log('The link was clicked.');
        var containerDiv = document.getElementById("dashboardContainer");
        var dashboard;
        var options = {
            url: data.data.data.EmbedUrl,
            container: containerDiv,
            parameters: {
                country: "United States"
            },
            scrolling: "no",
            height: "700px",
            width: "1000px"
        };
        dashboard = QuickSightEmbedding.embedDashboard(options);
    }
    return (
        <>
        <h1>Quicksight Embed </h1>
        <div id="dashboardContainer"></div>
        <a href="#" onClick={handleClick}>
          Show me the Dashboard!!!!!
        </a>
        </>
    );
}

export default Embed;