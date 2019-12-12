export default {
  // screenshots(id, cb) {
  //   var canvas = document.createElement("canvas");
  //   var scale = 1.3;
  //   canvas.width = 620;
  //   canvas.height = 1026;
  //   canvas.getContext("2d").scale(scale, 1.3);
  //   var opts = {
  //     scale: scale,
  //     canvas: canvas,
  //     useCORS: true
  //   };
  //   setTimeout(() => {
  //     html2canvas(document.getElementById(id), opts).then(function (canvas) {
  //       var context = canvas.getContext("2d");
  //       var testImg = canvas.toDataURL("image/jpeg", 1);
  //       // console.log(testImg)
  //       cb && cb(testImg);
  //     });
  //   }, 200);

  //   // 缩略图
  //   var canvasd = document.createElement("canvas");
  //   canvasd.width = 10;
  //   canvasd.height = 10;
  //   var optd = {
  //     scale: 1,
  //     canvas: canvasd,
  //     useCORS: true
  //   };
  //   setTimeout(() => {
  //     html2canvas(document.getElementById(id), optd).then(function (canvas) {
  //       var context = canvas.getContext("2d");
  //       var baseImg2 = canvas.toDataURL("image/jpeg", 0.01);
  //     });
  //   }, 200);

  // },
}
