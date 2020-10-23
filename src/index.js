(function () {
  // 获取画布元素
  const canvas = document.querySelector("#app");
  const ctx = canvas.getContext("2d");

  // 窗口尺寸
  const innerWidth = window.innerWidth;
  const innerHeight = window.innerHeight;

  // 设置画布尺寸
  canvas.width = innerWidth * 2;
  canvas.height = innerHeight * 2;
  canvas.style.width = innerWidth + "px";
  canvas.style.height = innerHeight + "px";
  ctx.scale(2, 2);

  // 参数
  const hexagonAngle = Math.PI / 6; // 30 degrees in radians
  const sideLength = 64;
  const boardWidth = 100;
  const boardHeight = 100;

  const hexHeight = Math.sin(hexagonAngle) * sideLength;
  const hexRadius = Math.cos(hexagonAngle) * sideLength;
  const hexRectangleHeight = sideLength + 2 * hexHeight;
  const hexRectangleWidth = 2 * hexRadius;

  // 开始动画
  render();

  // 监听鼠标位置
  canvas.addEventListener("mousemove", onMouseMove);
  window.addEventListener("resize", onResize);

  function onResize() {
    // 窗口尺寸
    const innerWidth = window.innerWidth;
    const innerHeight = window.innerHeight;

    // 设置画布尺寸
    canvas.width = innerWidth * 2;
    canvas.height = innerHeight * 2;
    canvas.style.width = innerWidth + "px";
    canvas.style.height = innerHeight + "px";
    ctx.scale(2, 2);
    render();
  }

  function onMouseMove(event) {
    var x, y, hexX, hexY, screenX, screenY;

    x = event.offsetX || event.layerX;
    y = event.offsetY || event.layerY;

    // Not so sccurate
    hexY = Math.floor(y / (hexHeight + sideLength));
    hexX = Math.floor((x - (hexY % 2) * hexRadius) / hexRectangleWidth);

    screenX = hexX * hexRectangleWidth + (hexY % 2) * hexRadius;
    screenY = hexY * (hexHeight + sideLength);

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    drawBoard(boardWidth, boardHeight);

    // Check if the mouse's coords are on the board
    if (hexX >= 0 && hexX < boardWidth) {
      if (hexY >= 0 && hexY < boardHeight) {
        ctx.fillStyle = "#333333";
        drawHexagon(screenX, screenY, true);
        drawPoint(
          screenX + hexRectangleWidth / 2,
          screenY + sideLength,
          hexHeight
        );
      }
    }
  }

  function drawPoint(x, y, radian = 3) {
    ctx.beginPath();
    ctx.arc(x, y, radian, 0, 2 * Math.PI);
    ctx.fillStyle = "#FFF";
    ctx.strokeStyle = "#333";
    ctx.lineWidth = 1;
    ctx.stroke();
    ctx.fill();
    ctx.closePath();
  }

  function drawBoard(width, height) {
    for (let i = 0; i < width; ++i) {
      for (let j = 0; j < height; ++j) {
        drawHexagon(
          i * hexRectangleWidth + (j % 2) * hexRadius,
          j * (sideLength + hexHeight),
          false
        );
      }
    }
  }

  function drawHexagon(x, y, fill = true) {
    ctx.lineWidth = 0.1;
    ctx.strokeStyle = "#333333";
    ctx.beginPath();
    ctx.moveTo(x + hexRadius, y);
    ctx.lineTo(x + hexRectangleWidth, y + hexHeight);
    ctx.lineTo(x + hexRectangleWidth, y + hexHeight + sideLength);
    ctx.lineTo(x + hexRadius, y + hexRectangleHeight);
    ctx.lineTo(x, y + sideLength + hexHeight);
    ctx.lineTo(x, y + hexHeight);
    ctx.closePath();

    if (fill) {
      ctx.fill();
    } else {
      ctx.stroke();
    }
  }

  function render() {
    drawBoard(boardWidth, boardHeight);
    // window.requestAnimationFrame(render);
  }
})();
