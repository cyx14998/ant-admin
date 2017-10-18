import React from 'react';
import ReactDOM from 'react-dom';
// import store from '../../models/home';
// import $db from '../../common/dal.js';
import './index.less';
import {NavBar } from 'antd-mobile';
import $db from '../../common/dal.js';

class Farm extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            dataLoaded: false
        }
    }
    componentDidMount() {
        this.setState({
            dataLoaded: true
        })
    }
    leftIcon(){

    }
    farmClick(){

    }
    render(){
        var farm1Url = $db.imgUrl + 'f0df5f1e-84dd-469f-9b16-9e013dc1d631';
        var farm2Url = $db.imgUrl + 'fe778a08-000b-4c3f-8f41-c89ef7bad5ac';
        return <div className={this.state.dataLoaded ? "container" : 'none'}>
                <NavBar
                    mode="light"
                    onLeftClick={this.leftIcon.bind(this)}
                >有机生态农场</NavBar>
                <div className="content">
                    <div className="farm-list">
                        <div className="farm-item" onClick={this.farmClick.bind(this)}>
                            <img src={farm1Url} alt=""/>
                            <p className="title">果道夫有机生态农场</p>
                        </div>
                        <div className="farm-item" onClick={this.farmClick.bind(this)}>
                            <img src={farm2Url} alt=""/>
                            <p className="title">果道夫有机生态农场</p>
                        </div>
                        <div className="farm-item" onClick={this.farmClick.bind(this)}>
                            <img src={farm1Url} alt=""/>
                            <p className="title">果道夫有机生态农场</p>
                        </div>
                        <div className="farm-item" onClick={this.farmClick.bind(this)}>
                            <img src={farm2Url} alt=""/>
                            <p className="title">果道夫有机生态农场</p>
                        </div>
                        <div className="farm-item" onClick={this.farmClick.bind(this)}>
                            <img src={farm1Url} alt=""/>
                            <p className="title">果道夫有机生态农场</p>
                        </div>
                        <div className="farm-item" onClick={this.farmClick.bind(this)}>
                            <img src={farm2Url} alt=""/>
                            <p className="title">果道夫有机生态农场</p>
                        </div>
                    </div>
                </div>
            </div>
    }
}

ReactDOM.render(<Farm></Farm>, document.getElementById('reactwrapper'));