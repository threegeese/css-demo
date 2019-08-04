// 基本用法
let canvas = document.getElementById('tutorial')
let ctx = canvas.getContext('2d')

ctx.fillStyle = 'cyan'
ctx.fillRect(10, 10, 100, 100)

ctx.fillStyle = "rgb(200,0,0)"
ctx.fillRect(160, 10, 55, 50)

ctx.fillStyle = "rgba(0, 0, 200, 0.5)"
ctx.fillRect(180, 30, 55, 50)

// 绘制图形
let rectangle = document.getElementById('drawRectangle')
let drawRect = rectangle.getContext('2d')

drawRect.fillRect(25, 25, 100, 100)
drawRect.clearRect(45, 45, 60, 60)
drawRect.strokeRect(50, 50, 50, 50)

// 绘制路径
let path = document.getElementById('drawPath')
let drawPath = path.getContext('2d')

drawPath.beginPath()
drawPath.arc(75, 75, 50, 0, Math.PI*2, true)
drawPath.moveTo(110, 75)
drawPath.arc(75, 75, 35, 0, Math.PI,false)
drawPath.moveTo(65, 65);
drawPath.arc(60, 65, 5, 0, Math.PI*2, true)
drawPath.moveTo(95, 65);
drawPath.arc(90, 65, 5, 0, Math.PI*2, true)
drawPath.strokeStyle = 'blue'
drawPath.stroke()

drawPath.beginPath()
drawPath.moveTo(145, 25)
drawPath.lineTo(245, 25)
drawPath.lineTo(145, 105)
drawPath.fill()

drawPath.beginPath()
drawPath.moveTo(245, 125)
drawPath.lineTo(145, 125)
drawPath.lineTo(245, 45);
drawPath.closePath()
drawPath.stroke()

// 二次贝塞尔曲线及三次贝塞尔曲线
let curve = document.getElementById('curve')
let drawCurve = curve.getContext('2d')

drawCurve.beginPath()
drawCurve.moveTo(75, 25)
drawCurve.quadraticCurveTo(25, 25, 25, 62.5)
drawCurve.quadraticCurveTo(25, 100, 50, 100)
drawCurve.quadraticCurveTo(50, 120, 30, 125)
drawCurve.quadraticCurveTo(60, 120, 65, 100)
drawCurve.quadraticCurveTo(125, 100, 125, 62.5)
drawCurve.quadraticCurveTo(125, 25, 75, 25)
drawCurve.stroke()

drawCurve.beginPath()
drawCurve.moveTo(200, 40)
drawCurve.bezierCurveTo(200, 37, 195, 25, 175, 25)
drawCurve.bezierCurveTo(145, 25, 145, 62.5, 145, 62.5)
drawCurve.bezierCurveTo(145, 80, 165, 102, 200, 120)
drawCurve.bezierCurveTo(235, 102, 255,80, 255, 62.5)
drawCurve.bezierCurveTo(255, 62.5, 255, 25, 225, 25)
drawCurve.bezierCurveTo(215, 25, 200, 37, 200, 40)
drawCurve.fill()

// Path2D 对象
let path2d = document.getElementById('path2d')
let drawPath2D = path2d.getContext('2d')

let paintRectangle= new Path2D()
paintRectangle.rect(10, 10, 50, 50)

let paintCircle = new Path2D()
paintCircle,moveTo(125, 35)
paintCircle.arc(100, 35, 25, 0, 2 * Math.PI)

drawPath2D.stroke(paintRectangle)
drawPath2D.fill(paintCircle)

//