import React, { Component, Fragment } from 'react';
import Button from '@material-ui/core/Button';

import Toast from '../components/toast'

class Home extends Component {
    render() {
        return (
            <Fragment>
                <div>Home</div>
                <Button type="button" variant="contained" color="primary" onClick={() => { Toast.info('普通提示') }}>Toast</Button>
            </Fragment>
        );
    }
}

export default Home;