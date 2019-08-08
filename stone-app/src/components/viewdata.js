import React from 'react';

class List extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            data: null
        }
    }
    componentWillMount() {
        this.props.total()
        console.log(this.props.value)
    }

    render() {
        return (
            // this.props.value ?
            <tbody>
                {!this.props.value.stone && !this.props.value.balance ?
                    <tr>
                        <td colSpan="3">{this.props.value.date}</td>
                        <td colSpan="4">{this.props.value.totalprice} (previous balance)</td>
                    </tr>
                    : null}
                    {this.props.value.stone ?
                    < tr >
                        <td>{this.props.index + 1}</td>
                        <td>{this.props.value.date}</td>
                        <td>{this.props.value.newDate}</td>
                        <td>{this.props.value.stone}</td>
                        <td>{this.props.value.weigth}</td>
                        <td>{this.props.value.perkarat}</td>
                        <td>{this.props.value.totalprice}</td>
                        <td></td>
                    </tr >
                    : this.props.value.balance ?
                        <tr>
                            <td>{this.props.index + 1}</td>
                            <td>{this.props.value.date}</td>
                            <td>
                                {this.props.value.total}
                                (total)
                            </td>
                            <td>
                                {this.props.value.totalprice}
                                (received)
                             </td>
                            <td>
                                {this.props.value.balance}
                                (balance)
                            </td>
                            <td></td>
                            <td></td>
                        </tr>
                        : null}
            </tbody>
            // :null


        )
    }
}
export default List