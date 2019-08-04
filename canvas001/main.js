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
drawPath.arc(75,75,50,0,Math.PI*2,true)
drawPath.moveTo(110,75)
drawPath.arc(75,75,35,0,Math.PI,false)
drawPath.moveTo(65,65);
drawPath.arc(60,65,5,0,Math.PI*2,true)
drawPath.moveTo(95,65);
drawPath.arc(90,65,5,0,Math.PI*2,true)
drawPath.strokeStyle = 'blue'
drawPath.stroke()

drawPath.beginPath()
drawPath.moveTo(145,25)
drawPath.lineTo(245,25)
drawPath.lineTo(145,105)
drawPath.fill()

drawPath.beginPath()
drawPath.moveTo(245,125)
drawPath.lineTo(145,125)
drawPath.lineTo(245,45);
drawPath.closePath()
drawPath.stroke()

// 二次贝塞尔曲线及三次贝塞尔曲线