import React from 'react'
import Component from '../core/Component'
import Text from './Text'
import { renderResponsive } from '../utils/responsive'
import { Icon, Button } from 'antd'


export default class BuyInfo extends Component {
  constructor (props) {
    super(props)
		this.state = { ...this.state, hovered: false }
  }

  componentDidMount () {
		super.componentDidMount()
	}
	
	renderText () {
    return renderResponsive('text',
      <Text source={this.props.text} style={{
        width: `90vw`,
        padding: '10px',
        color: '#455A64',
        paddingBottom: '60px'
      }} />,
      <Text source={this.props.text} style={{
        width: `70vw`,
        color: '#455A64',
        paddingBottom: '60px'
      }} />)
	}

	renderButton () {
    const { path, link } = this.props.components.getAccess
		return <Button href={path? path : link} type="primary" style={{backgroundColor: this.state.hovered ? this.props.hoveredButtonColor : this.props.buttonColor, border: 0, marginBottom: '30px'}} onMouseEnter={() => {this.setState({hovered: true})}}  onMouseLeave={() => {this.setState({hovered: false})}}>
			{this.props.action}<Icon type="arrow-right" style={{marginLeft: this.state.hovered ? '30px' : '5px'}} />
		</Button>
	}

  renderComponent () {
		return (<div 
			style={{ display: 'flex', flexDirection: 'column', flex: 1, justifyContent: 'center', alignItems: 'center', margin: '100px 15px', backgroundColor: '#FBFBFB' }} 
			>
			{ this.renderText() }
			{ this.renderButton() }
    </div>)
  }
}
