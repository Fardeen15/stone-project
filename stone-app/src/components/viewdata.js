import React from 'react';

class List extends React.Component {
    constructor(props){
        super(props)
    }
    componentWillMount(){
        this.props.total()
    }

    render() {
        return (
            this.props.value.stone?
            < tr >
                <td>{this.props.index + 1}</td>
                <td>{this.props.value.date}</td>
                <td>{this.props.value.stone}</td>
                <td>{this.props.value.weigth}</td>
                <td>{this.props.value.perkarat}</td>
                <td>{this.props.value.totalprice}</td>
                <td></td>
            </tr >
            : <tr>
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
        )
    }
}
export default List