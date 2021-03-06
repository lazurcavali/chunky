import React, { PureComponent } from 'react'
import Component from '../core/Component'
import Media from './Media'
import Timer from './Timer'
import { Icon } from 'antd'
import { Button } from '@rmwc/button'
import { Typography } from '@rmwc/typography'
import { Data } from 'react-chunky'

export default class Cover extends Component {
  constructor(props) {
    super(props)
    this.state = {
      strings: null,
      selectedLanguage: null
    }
  }

  componentDidMount() {
    super.componentDidMount()
    Data.Cache.retrieveCachedItem('selectedLanguage')
      .then(selectedLanguage => {
        this.setState({ selectedLanguage })
      })
      .catch(() => {
        return
      })
    if (this.props.theme && this.props.theme.translatedStrings)
      fetch(this.props.theme.translatedStrings)
        .then(response => response.json())
        .then(translatedTexts => {
          this.setState({ strings: translatedTexts[this.props.translationKey] })
        })
        .catch(() => '')
  }

  renderDefaultContent() {
    if (this.props.video) {
      return <div />
    }

    return (
      <div
        style={{
          position: 'absolute',
          backgroundColor: `rgba(0,0,0,${this.props.opacity})`,
          width: '100vw',
          height: '100%',
          top: 0,
          left: 0,
          display: 'flex',
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column'
        }}
      >
        {this.renderCoverTitle()}
        {this.renderCoverSubtitle()}
        {this.renderCoverAction()}
      </div>
    )
  }

  renderSectionContent() {
    if (this.props.video) {
      return <div />
    }

    return (
      <div
        style={{
          position: 'absolute',
          backgroundColor: `rgba(0,0,0,${this.props.opacity})`,
          display: 'flex',
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column'
        }}
      >
        {this.renderCoverTitle()}
        {this.renderCoverSubtitle()}
        {this.renderCoverAction()}
      </div>
    )
  }

  renderIcons() {
    if (!this.props.social) {
      return
    }

    const margin = this.props.isSmallScreen ? '0 0 5px 0' : '0 95px 35px 0'
    const align = this.props.isSmallScreen ? 'center' : 'flex-end'
    const { social } = this.props
    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'flex-end',
          alignSelf: align,
          margin
        }}
      >
        {Object.keys(social).map(key => {
          return this.renderIcon(social[key], key)
        })}
      </div>
    )
  }

  renderIcon(props, key) {
    const size = this.props.isSmallScreen ? 20 : 28

    return (
      <div>
        <Icon
          type={key}
          onClick={this.onLinkClick.bind(this, props.url)}
          className="icon"
          style={{
            cursor: 'pointer',
            fontSize: size,
            padding: '10px'
          }}
        />
        <style jsx>{`
          div :global(.icon) {
            color: ${'#CFD8DC'};
          }
          div :global(.icon):hover {
            color: ${'#00bcd4'};
          }
        `}</style>
      </div>
    )
  }

  onLinkClick(url) {
    window.open(url, '_blank')
  }

  renderIcoContent() {
    if (this.props.video) {
      return <div />
    }

    return (
      <div
        style={{
          position: 'absolute',
          backgroundColor: `rgba(0,0,0,${this.props.opacity})`,
          width: '100vw',
          height: '100vh',
          top: 0,
          left: 0,
          display: 'flex',
          flex: 1,
          justifyContent: 'space-around',
          textAlign: 'center',
          alignItems: 'center',
          flexDirection: 'column'
        }}
      >
        <div style={{ display: 'flex', flex: 1 }} />
        <div
          style={{
            display: 'flex',
            flex: 3,
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
            textAlign: 'center'
          }}
        >
          {this.renderCoverTitle()}
          {this.renderCoverSubtitle()}
        </div>
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            flex: 2,
            justifyContent: 'space-around',
            width: '100%',
            padding: '0 50px'
          }}
        >
          {this.renderLogos()}
          {this.renderCoverTimeline()}
        </div>
        {this.renderIcons()}
      </div>
    )
  }

  renderCoverTitle() {
    if (!this.props.title) {
      return <div />
    }

    const titleAdditionalStyle = this.props.titleStyle
      ? this.props.titleStyle
      : {}

    const translatedTitle =
      this.props.translation &&
      this.state.strings &&
      this.state.selectedLanguage
        ? this.state.strings[this.state.selectedLanguage].title
        : this.props.title
    return (
      <Typography
        use="headline4"
        style={{
          margin: '20px',
          color: this.props.color,
          ...titleAdditionalStyle
        }}
      >
        {' '}
        {translatedTitle}
      </Typography>
    )
  }

  renderCoverTimeline() {
    const backgroundColor = '#00ACC1',
      textColor = '#ffffff'

    return (
      <div style={{ maxWidth: 450, maxHeight: 300 }}>
        <Timer
          periods={this.props.timedPeriods}
          textColor={textColor}
          simple
          actionTitle="Buy tokens"
          onAction={this.triggerEvent()}
        />
      </div>
    )
  }

  renderIcoCoverTitle() {
    if (!this.props.title) {
      return <div />
    }

    const titleAdditionalStyle = this.props.subtitleStyle
      ? this.props.subtitleStyle
      : {}

    return (
      <Typography
        use="headline4"
        style={{
          margin: '20px',
          color: this.props.color,
          ...titleAdditionalStyle
        }}
      >
        {' '}
        {this.props.title}
      </Typography>
    )
  }

  renderCoverSubtitle() {
    if (!this.props.subtitle) {
      return <div />
    }

    const subtitleAdditionalStyle = this.props.subtitleStyle
      ? this.props.subtitleStyle
      : {}

    const translatedSubtitle =
      this.props.translation &&
      this.state.strings &&
      this.state.selectedLanguage
        ? this.state.strings[this.state.selectedLanguage].subtitle
        : this.props.subtitle

    return (
      <Typography
        use="headline5"
        style={{
          margin: '20px',
          color: this.props.color,
          ...subtitleAdditionalStyle
        }}
      >
        {' '}
        {translatedSubtitle}{' '}
      </Typography>
    )
  }

  renderLogos() {
    return <div style={{ position: 'absolute', left: '5%', top: '55%' }} />
  }

  renderVideo() {
    if (this.props.isSmallScreen) {
      return <div />
    }

    const backgroundColor = '#00ACC1',
      textColor = '#ffffff'

    return (
      <div
        style={{ padding: 20, width: 450, height: 300, position: 'relative' }}
      >
        <Media
          video={this.props.introVideo}
          width={450}
          height={300}
          style={{ position: 'absolute', top: 0, left: 0 }}
        />
      </div>
    )
  }

  renderCoverAction() {
    if (!this.props.primaryActionTitle) {
      return <div />
    }
    return (
      <Button
        onClick={this.triggerAction.bind(this)}
        raised
        theme="secondary-bg text-primary-on-secondary"
        style={{ margin: '20px' }}
      >
        {' '}
        {this.props.primaryActionTitle}{' '}
      </Button>
    )
  }

  triggerAction() {
    const link = this.props.cover.link
    if (link) {
      this.onLinkClick(link)
    }
    this.triggerEvent()
  }

  get presentationHeight() {
    return 500
  }

  get simpleHeight() {
    return 300
  }

  get menuHeight() {
    return 75
  }

  renderSimpleContent(height, title) {
    return (
      <div
        style={{
          position: 'absolute',
          backgroundColor: `rgba(0,0,0,${this.props.opacity})`,
          width: '100vw',
          height: `${height}px`,
          top: 0,
          left: 0,
          display: 'flex',
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column'
        }}
      >
        <Typography
          use="headline3"
          style={{ margin: '20px', color: this.props.color }}
        >
          {' '}
          {title}{' '}
        </Typography>
      </div>
    )
  }

  renderPresentationContent() {
    const title = this.props.title
    return (
      <div
        style={{
          position: 'absolute',
          width: '100vw',
          display: 'flex',
          top: `${this.presentationHeight - this.menuHeight - 20}`,
          flex: 1,
          justifyContent: 'flex-end',
          alignItems: 'flex-start',
          flexDirection: 'column'
        }}
      >
        <Typography
          use="headline4"
          style={{
            margin: '20px',
            position: 'absolute',
            bottom: '-100px',
            color: this.props.color
          }}
        >
          {' '}
          {title}{' '}
        </Typography>
      </div>
    )
  }

  renderMedia(style, playing, innerHeight) {
    if (!this.props.image && !this.props.video) {
      return <div />
    }

    return (
      <Media
        cache={this.props.cache}
        video={this.props.video}
        image={this.props.image}
        imageSmall={this.props.imageSmall}
        playing={playing}
        innerHeight={innerHeight}
        style={style}
      />
    )
  }

  renderDefault(title) {
    const height = this.props.height
    const coverStyle = {
      width: '100%',
      height: `${height}px`,
      objectFit: 'cover',
      objectPosition: 'center center'
    }
    const coverPlaying = this.props.scroll < 200

    return (
      <div
        style={{
          backgroundColor: this.props.backgroundColor,
          marginTop: `${this.props.offset}px`,
          height: `${height}px`,
          display: 'flex',
          flex: 1,
          alignItems: 'center',
          flexDirection: 'column',
          justifyContent: 'center'
        }}
      >
        {this.renderMedia(coverStyle, coverPlaying)}
        {this.renderDefaultContent()}
      </div>
    )
  }

  renderSimple(height, title) {
    const coverStyle = {
      width: '100%',
      backgroundColor: this.props.backgroundColor,
      height: `${height}px`,
      objectFit: 'cover',
      objectPosition: 'center center'
    }
    const coverPlaying = this.props.scroll < 200

    return (
      <div
        style={{
          backgroundColor: this.props.backgroundColor,
          marginTop: `${this.props.offset}px`,
          height: `${height}px`,
          display: 'flex',
          flex: 1,
          alignItems: 'center',
          flexDirection: 'column',
          justifyContent: 'center'
        }}
      >
        {this.renderMedia(coverStyle, coverPlaying)}
        {this.renderSimpleContent(height, title)}
      </div>
    )
  }

  renderPresentation() {
    const height = this.presentationHeight
    const coverStyle = {
      width: '100%',
      height: `${height}px`,
      backgroundColor: this.props.backgroundColor,
      objectFit: 'cover',
      objectPosition: 'center center'
    }
    const coverPlaying = this.props.scroll < 200

    return (
      <div
        style={{
          backgroundColor: this.props.backgroundColor,
          marginTop: `${this.props.offset}px`,
          height: `${height + 2}px`,
          display: 'flex',
          overflow: 'hidden',
          flex: 1,
          alignItems: 'center',
          flexDirection: 'column',
          justifyContent: 'center'
        }}
      >
        {this.renderMedia(coverStyle, coverPlaying, `${height - 100}px`)}
        {this.renderPresentationContent()}
      </div>
    )
  }

  renderSection() {
    const height = this.props.height
    const coverStyle = {
      width: '100%',
      height: `${height}px`,
      objectFit: 'cover',
      opacity: 0.8,
      objectPosition: 'center center'
    }
    const coverPlaying = this.props.scroll < 200

    return (
      <div
        style={{
          backgroundColor: this.props.backgroundColor,
          marginTop: `${this.props.offset}px`,
          height: `${height}px`,
          display: 'flex',
          flex: 1,
          alignItems: 'center',
          flexDirection: 'column',
          justifyContent: 'center'
        }}
      >
        {this.renderMedia(coverStyle, coverPlaying)}
        {this.renderSectionContent()}
      </div>
    )
  }

  renderIco(title) {
    const height = this.props.height
    const coverStyle = {
      width: '100%',
      height: `${height}px`,
      objectFit: 'cover',
      objectPosition: 'center center'
    }
    const coverPlaying = this.props.scroll < 200

    return (
      <div
        style={{
          backgroundColor: this.props.backgroundColor,
          marginTop: `${this.props.offset}px`,
          height: `${height}px`,
          display: 'flex',
          flex: 1,
          alignItems: 'center',
          flexDirection: 'column',
          justifyContent: 'center'
        }}
      >
        {this.renderMedia(coverStyle, coverPlaying)}
        {this.renderIcoContent()}
      </div>
    )
  }

  renderMenu() {
    return this.renderSimple(this.menuHeight)
  }

  get type() {
    return this.props.type || 'default'
  }

  render() {
    switch (this.type) {
      case 'presentation':
        return this.renderPresentation()
      case 'simple':
        return this.renderSimple(this.simpleHeight, this.props.title)
      case 'menu':
        return this.renderMenu()
      case 'ico':
        return this.renderIco(this.props.title)
      case 'section':
        return this.renderSection()
      default:
        return this.renderDefault()
    }
  }
}
