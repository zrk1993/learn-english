# The goal in 2018 is to learn  english. 
wirtten in 2017-12-22



<!DOCTYPE HTML>
<html>
<head>
  <style>
    body {
      margin: 50px;
      padding: 50px;
    }
    #myCanvas {
      border: 1px solid #444;
    }
  </style>
</head>
<body>
  <canvas id="myCanvas" width="600" height="250"></canvas>
  <script>
    var canvas = document.getElementById('myCanvas');
    var context = canvas.getContext('2d');

    canvas.width = 600;
    canvas.height = 250;


    drawBackground(context, 110, 125, 90 , 380); // 外圆
    drawBackground(context, 110, 125, 60 , 380); // 内圆

    const data = [
      {
        x: 99,
        y: 7,
        w: 25,  
        status: 'doing',
      },
      {
        x: 250,
        y: 7,
        w: 25,  
        per: .7,
        status: 'doing',
      },
      {
        x: 200,
        y: 7,
        w: 25,  
        status: 'nomal',
      },
      {
        x: 150,
        y: 7,
        w: 25,  
        status: 'error',
      },
    ];


    data.forEach(item => drawUnit(context, item));

    // 绘制一个单元
    function drawUnit(ctx, options) {
      ctx.save();

      options.h = 25;

      const per = options.per || 1; // 进度 
      const status = options.status; // 状态 ： doing, nomal, error
      const x = options.x; // 矩形左上角点 x  
      const y = options.y; // 矩形左上角点 x  
      const w = options.w; // 矩形左上角点 宽
      const h = options.h * per; // 矩形左上角点 高
      const rotate = options.rotate; // 旋转


      // 矩形
      if (status === 'doing') {
        ctx.fillStyle = '#33ff00';
        ctx.strokeStyle = '#33ff00';         
      }

      if (status === 'nomal') {
        ctx.fillStyle = '#fff';
        ctx.strokeStyle = '#555';
      }

      if (status === 'error') {
        ctx.fillStyle = '#ff5555';
        ctx.strokeStyle = '#ff5555';
      }

      ctx.fillRect(x, y + (1-per)*h, w, h);
      ctx.strokeRect(x, y + (1-per)*h, w, h);

      ctx.restore();


      // 写字
      ctx.font = '18px serif';
      ctx.fillText('01', x + 4, y + 18);
    }

    // 圆心 半径  距离
    function drawBackground(ctx, center_x, center_y, circle_r, range) {
      ctx.save();

      ctx.beginPath();

      ctx.arc(center_x, center_y, circle_r, Math.PI*1.5, Math.PI*0.5, true); // 左半圆

      ctx.lineTo(center_x + range, center_y + circle_r);

      ctx.arc(center_x + range, center_y, circle_r, Math.PI*0.5, Math.PI*1.5, true); // 右半圆

      ctx.lineTo(center_x,center_y - circle_r);

      ctx.stroke();

      ctx.restore();
    }
  </script>
</body>
</html>   
