import React from 'react';
import { API, Auth } from 'aws-amplify';
import CircularProgress from '@material-ui/core/CircularProgress';
import { withStyles } from '@material-ui/core/styles';

var QuickSightEmbedding = require("amazon-quicksight-embedding-sdk");

const useStyles = theme => ({
  loading: {
    alignContent: 'center',
    justifyContent: 'center',
    display: 'flex',
    marginTop: theme.spacing(4),
  },
});

class Embed extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            loader: true
        };
    }
    
    componentDidMount() {
        this.getQuickSightDashboardEmbedURL();
    }
    
    getQuickSightDashboardEmbedURL = async () => {
        const data = await Auth.currentSession();
        const jwtToken = data.idToken.jwtToken;
        const payloadSub = data.idToken.payload.sub;
        const email = data.idToken.payload.email;
        
        const params = { 
            headers: {},
            response: true,
            queryStringParameters: {
                jwtToken: jwtToken,
                payloadSub: payloadSub,
                email: email
            }
        }
        const quicksight = await API.get('quicksight', '/getQuickSightDashboardEmbedURL', params);
        console.log(quicksight);
        const containerDiv = document.getElementById("dashboardContainer");
        
        const options = {
            url: quicksight.data.data.EmbedUrl,
            container: containerDiv,
            parameters: {
                country: "United States"
            },
            scrolling: "no",
            height: "800px",
            width: "912px",
            footerPaddingEnabled: true,
        };
        const dashboard = QuickSightEmbedding.embedDashboard(options);
        this.setState({ loader: false });
    };
    
    render() {
        const { classes } = this.props;
        return (
            <div>
                { this.state.loader && (
                    <div className={classes.loading}> <CircularProgress /> </div>
                )}
                <div id="dashboardContainer"></div>
            </div>
        );
    }
}

export default withStyles(useStyles)(Embed);