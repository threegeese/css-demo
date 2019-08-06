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

// 色彩
let color = document.getElementById('color')
let drawColor = color.getContext('2d')

for(let i=0; i<6; i++) {
  for(let j=0; j<6; j++) {
    drawColor.fillStyle = `rgb(${Math.floor(255-42.5*i)}, ${Math.floor(255-42.5*j)}, 0)`
    drawColor.fillRect(j*20, i*20, 20, 20)
  }
}

for(let i=0; i<6; i++) {
  for(let j=0; j<6; j++) {
    drawColor.strokeStyle = `rgb(0, ${Math.floor(255-42.5*i)}, ${Math.floor(255-42.5*j)})`
    drawColor.beginPath()
    drawColor.arc(152.5+j*25, 12.5+i*25, 10, 0, Math.PI*2, true)
    drawColor.stroke()
  }
}

// 线型
let drawLine = document.getElementById('line').getContext('2d')

for(let i=0; i<10; i++) {
  drawLine.lineWidth = i + 1
  drawLine.beginPath()
  drawLine.moveTo(5+i*14, 5)
  drawLine.lineTo(5+i*14, 140)
  drawLine.stroke()
}

drawLine.strokeStyle = '#09f'
drawLine.beginPath();
drawLine.moveTo(160, 10)
drawLine.lineTo(290, 10)
drawLine.moveTo(160, 140)
drawLine.lineTo(290, 140)
drawLine.lineWidth = 1
drawLine.stroke()

let lineCap = ['butt','round','square']
drawLine.strokeStyle = 'black'
for (let i=0; i<lineCap.length; i++){
  drawLine.lineWidth = 15
  drawLine.lineCap = lineCap[i]
  drawLine.beginPath()
  drawLine.moveTo(180+i*50, 10)
  drawLine.lineTo(180+i*50, 140)
  drawLine.stroke()
}

// 虚线
let dottedLine = document.getElementById('dottedLine').getContext('2d')
dottedLine.setLineDash([4, 2])
dottedLine.strokeRect(10, 10, 100, 100)
dottedLine.beginPath()
dottedLine.moveTo(10, 140)
dottedLine.lineTo(100, 140)
dottedLine.stroke()

let offset = 0
function clearScreen() {
  dottedLine.clearRect(120, 0, 180, canvas.height)
  dottedLine.setLineDash([4, 2])
  dottedLine.lineDashOffset = -offset
  dottedLine.strokeRect(140, 10, 100, 100)
}

function march() {
  offset += 1
  if (offset > 16) {
    offset = 0
  }
  clearScreen()
  setTimeout(march, 20)
}

march()

// 渐变
let gradients = document.getElementById('gradients').getContext('2d')
let lineGrad = gradients.createLinearGradient(20, 20, 120, 120)
lineGrad.addColorStop(0, '#08ffc8')
lineGrad.addColorStop(0.5, '#eb5f5d')

gradients.fillStyle = lineGrad
gradients.fillRect(0, 0, 100, 100)

let radgrad = gradients.createRadialGradient(150, 50, 10, 160, 60, 30)
radgrad.addColorStop(0, '#e41749')
radgrad.addColorStop(0.5, '#fff3b1')
radgrad.addColorStop(1, 'rgba(228, 199, 0, 0)')

gradients.fillStyle = radgrad
gradients.fillRect(120, 0, 100, 150)

// 图像
let pattern = document.getElementById('pattern').getContext('2d')
let img = new Image()
img.src = 'https://mdn.mozillademos.org/files/222/Canvas_createpattern.png'
img.onload = function () {
  let ptrn = ctx.createPattern(img, 'repeat')
  pattern.fillStyle = ptrn
  pattern.fillRect(0, 0, 150, 150)
}

// 阴影
let fontShadow = document.getElementById('fontShadow').getContext('2d')

fontShadow.shadowOffsetX = 2
fontShadow.shadowOffsetY = 2
fontShadow.shadowBlur = 2
fontShadow.shadowColor = "rgba(0, 0, 0, 0.5)"

fontShadow.font = "20px Times New Roman"
fontShadow.fillStyle = "Black"
fontShadow.fillText("Sample String", 5, 30)

// 填充规则
let evenodd = document.getElementById('evenodd').getContext('2d')
evenodd.arc(50, 50, 30, 0, Math.PI*2, true)
evenodd.arc(50, 50, 15, 0, Math.PI*2, true)
evenodd.fill("evenodd")

