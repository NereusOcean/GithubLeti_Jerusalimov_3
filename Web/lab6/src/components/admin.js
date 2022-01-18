import React from 'react';
import "./admin.css"


export default class Admin extends React.Component{
    render(){
        return (
            <div className="Admin">
                <nav className="one">
                    <ul>
                        <li> Admin </li>
                        <li id="b"  onClick={this.props.start_torgs}> Начать торги </li>
                    </ul>
                </nav>

                <div className="brokers">
                    {get_brokers(this.props.brokers)}
                </div>
            </div>
        );

        function get_brokers(br){
            let brokers=[];
            let table = [];
            let broker = [];
            table.push(
                <tr>
                    <th>Имя</th>
                    <th>Бюджет</th>
                    <th>id</th>
                    <th>Количество</th>
                    <th>Стоимость</th>
                    <th>На торгах</th>
                    <th>Стоимость акций на торгах</th>
                </tr>
            );
            broker.push(<table>{table}</table>)

            for (let i = 0; i < br.length;i++){


                table.push(
                    <tr>
                        <td rowspan="4"> {br[i].name} </td>
                        <td rowSpan="4"> {br[i].money} </td>
                    </tr>
                );
                for (let j = 0; j < br[i].stocks.length; j++){
                    table.push(
                        <tr>
                            <td>{j}</td>
                            <td>{br[i].stocks[j]}</td>
                            <td>{br[i].price[j]}</td>
                            <td>{br[i].ontorg_stocks[j]}</td>
                            <td>{br[i].ontorg_price[j]}</td>
                        </tr>
                    )
                }


            }
            brokers.push(<div className = "broker" > {table}</div>)
            return <div style={{display:"grid",justifyContent: "center"}}>{brokers}</div>
        }
    }

}
