import React from 'react';
import LoadingStyle from './loading.module.css'

class LoadingIcon extends React.Component {
    render () {
        return (
            <div className={LoadingStyle.ldsring}><div></div><div></div><div></div><div></div></div>
        )
    }
}

export default LoadingIcon;