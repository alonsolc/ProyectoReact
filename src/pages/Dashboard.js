import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import serviceMainUsers from "../services/serviceMainUsers";

class Dashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            reportOne: []
        };
    }

    componentDidMount() {
        this.reportOne();
    }

    reportOne = () => {
        serviceMainUsers.reportOne()
            .then(res => {
                this.setState({ reportOne: res.data.data });
                console.log("reportOne", this.state.reportOne);
            })
            .catch((error) => {
                console.log(error);
            });
    }

    render() {

        const options = {
            chart: {
                type: 'column'
            },
            title: {
                text: 'Number of users by creation date'
            },
            yAxis: {
                allowDecimals: false,
                title: {
                    text: 'Number of users'
                }
            },
            series: this.state.reportOne
        };

        return (
            <React.Fragment>
                
                <HighchartsReact highcharts={Highcharts} options={options} />
            </React.Fragment>
        );
    }
}

export default Dashboard;