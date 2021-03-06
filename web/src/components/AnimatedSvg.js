import React from 'react'
import ReactVivus from 'react-vivus'

/**
 *  Animates a svg based on vivus.js
 * style -> style of the image ( CSS IN JS )
 * path -> the path to the SVG
 * type -> Defines what kind of animation will be used: delayed, sync, oneByOne, scenario. [Default: delayed]
 * duration -> Animation duration, in frames. [Default: 200]
 * Timing animation function for the complete SVG. Options are: EASE, EASE_IN, EASE_OUT and EASE_OUT_BOUNCE
 * id -> an id must be provided in order for the react wrapper to work
 * 
 * All params should be string instead of duration which is an integer! 
 *
 * @param {*} { style, path, type, duration, animTimingFunction, id }
 */

const animatedTimingFunctions = ['EASE_OUT_BOUNCE', 'EASE', 'EASE_IN', 'EASE_OUT']
const typeOfAnimation = ['delayed', 'sync', 'oneByOne', 'scenario']



const AnimatedSvg = ({ style, src, type, duration, animTimingFunction, id }) => {
  const randomTimingFunction = animatedTimingFunctions[Math.floor(Math.random() * animatedTimingFunctions.length)]
  const randomType = typeOfAnimation[Math.floor(Math.random() * typeOfAnimation.length)]

  return <ReactVivus
    id={id}
    option={{
      file: src,
      type: type ? type : randomType,
      animTimingFunction: animTimingFunction ? animTimingFunction : randomTimingFunction,
      duration
    }}
    style={style}
  />
};

export default AnimatedSvg;
