import React, { useContext, useState, useEffect } from 'react';
import {HorizontalBar} from 'react-chartjs-2';
// import '../../css/defaults.css';
import UserContext from "../utils/UserContext";

function Bar (props) {
    const user = useContext(UserContext)
    const trade = props.selectedTrade 
    // const [selectedTrade, setSelectedTrade] = useState({})
    // console.log(props.trade)
    // const [byPrices, setByPrices] = useState(0)
    // const [toPrices, setToPrices] = useState(0)
    const [chartState, setChartState] = useState({})

    const cardNames = user.mongo.products.map(item => item.name)
    const cardPrices = user.mongo.products.map(item => item.price)

    const reducer = (accumulator, currentValue) => accumulator + currentValue;    

    useEffect(() => {
        if (props.selectedTrade.proposedBy){
            let tempChart = {
                labels: [trade.proposedBy, trade.proposedTo],
                datasets: [
            
                    // have to map over all the cards a user has
                    {
                        label: "Card values",
                        backgroundColor: ["rgba(255, 205, 86, 0.2)", "rgba(153, 102, 255, 0.2)"],
                        borderColor: ["rgb(255, 205, 86)", "rgb(153, 102, 255)"],
                        borderWidth: 1,
                        hoverBackgroundColor: ['rgba(255, 204, 86, 0.411)', 'rgba(123, 58, 253, 0.404)'],
                        hoverBorderColor: ['rgba(248, 185, 39, 0.788)', 'rgba(94, 16, 248, 0.705)'],
                        data: [trade.totalPriceBy, trade.totalPriceTo]
                    },
                ]
            }
            setChartState(tempChart)
        }
        else {
            let tempChart = {
                labels: [props.trade.proposedBy, props.trade.proposedTo],
                datasets: [
            
                    // have to map over all the cards a user has
                    {
                        label: "Card values",
                        backgroundColor: ["rgba(255, 205, 86, 0.2)", "rgba(153, 102, 255, 0.2)"],
                        borderColor: ["rgb(255, 205, 86)", "rgb(153, 102, 255)"],
                        borderWidth: 1,
                        hoverBackgroundColor: ['rgba(255, 204, 86, 0.411)', 'rgba(123, 58, 253, 0.404)'],
                        hoverBorderColor: ['rgba(248, 185, 39, 0.788)', 'rgba(94, 16, 248, 0.705)'],
                        data: [props.trade.totalPriceBy, props.trade.totalPriceTo]
                    },
                ]
            }
            setChartState(tempChart)
        }

    }, [trade])

    const options = { 
        scales: { 
            xAxes: [{
                 ticks: {
                    beginAtZero: true, 
                    // max: 10
                    } 
                }] 
            }     
        };

    return (
        <>
        <br/>
        <h2 style={{textAlign: "center"}}>Card Comparison</h2>
        <HorizontalBar options={options} data={chartState} />
        </>
    )

}

export default Bar


