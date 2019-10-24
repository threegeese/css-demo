/**
 * A canvas background component
 * Inspired by http://evanyou.me/
 * Learn from https://github.com/hustcc/ribbon.js
 */
import React from "react"
import PropTypes from 'prop-types'

class Background extends React.Component {
  constructor (props) {
    super(props)

    // 用来存放坐标的数组
    this.position = []

    this.colorRange = 0

    this.draw = this.draw.bind(this)
    this.drawRibbon = this.drawRibbon.bind(this)
  }

  render () {
    return <canvas id="canvas"></canvas>
  }
  
  draw (pointOne, pointTwo) {
    let g2d = document.querySelector('#canvas').getContext('2d')
    
    // 笔触开始的点（最开始是原点，后面变成上一次的最后的点）
    g2d.beginPath()
    g2d.moveTo(pointOne.x, pointOne.y)

    // 第一次划线
    g2d.lineTo(pointTwo.x, pointTwo.y)

    // 第二次划线（注意第二次点的坐标）
    let size = this.props.size
    let x1 = pointTwo.x + (Math.random() * 2 - 0.25) * size
    let y1 = pointTwo.y + (Math.random() * 2 - 1.1) * size
    while (y1 > this.props.height || y1 < 0) {
      y1 = pointTwo.y + (Math.random() * 2 - 1.1) * size
    }
    g2d.lineTo(x1, y1)
    
    g2d.closePath()

    // 上色并填充
    let cos = Math.cos, pi = Math.PI * 2
    this.colorRange -= pi / -50
    let r = this.colorRange

    g2d.fillStyle = '#' + (
      cos(r) * 127 + 128 << 16 |
      cos(r + pi / 3) * 127 + 128 << 8 | 
      cos(r + pi / 3 * 2) * 127 + 128
    ).toString(16)
    
    g2d.fill()

    // 更新坐标
    this.position[0] = this.position[1]
    this.position[1] = { x: x1, y: y1 }
  }

  drawRibbon () {
    let g2d = document.querySelector('#canvas').getContext('2d')

    let { width, height, size } = this.props

    // 清空画布
    g2d.clearRect(0, 0, width, height)

    // 初始化坐标点并开始绘画
    this.position = [{ x: 0, y: height * 0.7 + size }, { x: 0, y: height * 0.7 - size }]

    // 画一条彩色丝带
    while(this.position[1].x < width + size) {
      this.draw(this.position[0], this.position[1])
    }
    if (this.colorRange > 100)
      this.colorRange = 0
  }

  componentDidMount () {
    let canvas = document.querySelector('#canvas')
    let g2d = canvas.getContext('2d')

    
    let { width, height, alpha, zIndex } = this.props
    let pr = window.devicePixelRatio || 1
    
    canvas.width = width * pr
    canvas.height = height * pr
    
    g2d.scale(pr, pr)
    g2d.globalAlpha = alpha
    
    // canvas.style.cssText = 'opacity: ' + alpha + ';position:fixed;top:0;left:0;z-index: ' + zIndex + ';width:100%;height:100%;pointer-events:none;'
    let canvasStyles = {
      'opacity': alpha,
      'z-index': zIndex,
      'position': 'fixed',
      'top': 0,
      'left': 0,
      'width': '100%',
      'height': '100%',
      'pointer-events': 'none',
    }
    for (let prop in canvasStyles) {
      canvas.style[prop] = canvasStyles[prop]
    }

    document.onclick = this.drawRibbon
    document.ontouchstart = this.drawRibbon
    this.drawRibbon()
  }
}

// Background 组件的默认属性：
Background.defaultProps = {
  width: window.innerWidth,
  height: window.innerHeight,
  size: 120,
  zIndex: -2,
  alpha: 0.6,
}

// 使用 PropTypes 进行类型检测
Background.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  size: PropTypes.number,
  zIndex: PropTypes.number,
  alpha: PropTypes.number
}

export default Background
