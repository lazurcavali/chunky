import React from 'react'
import { Screen } from 'react-dom-chunky'

export default class CloudPlatform extends Screen {
  constructor(props) {
    super(props)
    this.state = { ...this.state }
  }

  componentDidMount() {
    super.componentDidMount()
  }

  components() {
    return super.components().concat([])
  }
}
