import { createGlobalStyle } from "styled-components";
import React from 'react';
import $ from 'jquery';
import Header from './Header.jsx';
import Menu from './Menu.jsx';
import Sidebar from './Sidebar.jsx';
import exampleData from './exampleData.js';
import styled from 'styled-components'


const GlobalStyles = styled.div`
  body {
    @import url('https://fonts.googleapis.com/css?family=Montserrat&display=swap');
    font-family: 'Montserrat', sans-serif;
  }
`


class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            q: window.location.pathname.split('/restaurant/')[1],
            res: []
        }
    }


    search() {
        $.ajax({
            method: 'GET',
            url: '/API/restaurant/' + this.state.q,
            success: (data) => {
                // data = JSON.parse(data);
                this.setState({
                    res: data
                })
            },
            error: (err) => {
                console.log(err);
            }
        })
    }

    componentDidMount() {
        this.search();
    }
    render() {
        if (Object.keys(this.state.res).length === 0) {
            console.log('empttyyyy')
            return <div></div>
        } else {
            console.log('got something', this.state.res, this.state.res.menus)
            return (
                <div>
                    <GlobalStyles>
                        <Header res={this.state.res} />
                        {/* <Menu menus={this.state.res.menus} /> */}
                        <Menu menus={this.state.res} />
                    </GlobalStyles>
                    {/* <Sidebar res={this.state.res} /> */}
                </div>

            )
        }

    }
}

export default App;


//https://github.com/ganderzz/react-scroll-to
//https://newyork-anthonyng.github.io/articles/deliberate_practice/005_react_scroll_to/source.html
//https://codeburst.io/what-i-learned-from-reading-react-scroll-to-5018ed3726fa
// switch (this.state.page) {
//     case 'Overview':
//     case 'Photos':
//     case 'Menu':
//     case 'Reviews':
//     case 'Twitter':
// }
