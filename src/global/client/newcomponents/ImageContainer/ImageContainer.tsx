/// <reference path="../../../../../typings/tsd.d.ts" />

import './_ImageContainer.scss';
import * as React from 'react';

export interface IImageContainerProps {
    width: number;
    height: number;
    url: string;
    gutter?: number;
}

/**
 * @class ContentRow
 * @augments {React.Component}
 */
export class ImageContainer extends React.Component<IImageContainerProps, {}> {

    public render(): React.ReactElement<{}> {

        const contextTypes = {
            a: React.PropTypes.string
        };

        const childContextTypes = {
            b: React.PropTypes.string
        };

        let getChildContext = function getChildContext() {
            return {
                b: this.props.b
            };
        };

        let ratioadjustment = (( this.props.height / this.props.width ) * 100);
        let gutter = this.props.gutter ? {
            'left': this.props.gutter / 2 + 'px',
            'right': this.props.gutter / 2 + 'px',
            'bottom': this.props.gutter / 2 + 'px',
            'top': this.props.gutter / 2 + 'px'
        } : {};

        const containernames = 'image-container';

        return (
            <div className={containernames}>
                <div className='background-ratio-adjustment' style={{ 'paddingTop':ratioadjustment + '%' }}></div>
                <div className='background-image-container' style={gutter}>
                    <div className='gutter-spacing' /*style={ gutter }*/>
                        <div className='background-image' style={{ 'backgroundImage':'url(' + this.props.url +')' }}>
                            {this.props.width} x {this.props.height}
                            {this.context.a}
                            {this.context.b}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

