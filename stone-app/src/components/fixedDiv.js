import React from 'react';
class Bottom extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            total: ""
        }
    }
    totalprice = () => {
        var total = 0;

        if(this.props.datalist ){
            this.props.datalist.map((value) => {
                return total += Number(value.totalprice)

            })
        }
        // if (total) {
        //     console.log(total)
        //     this.setState({
        //         total: total
        //     })
        // }
        return total

    }
    render() {

        return (

            <div id="fixed">
                <h1>Total : {this.totalprice()}</h1>
            </div>
        )
    }
}
export default Bottom