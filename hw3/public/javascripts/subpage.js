function invisibleMask(img){
    var invisibleMask = document.getElementById('invisiblemask').getContext("2d")
    var unmask = document.getElementById('unmask').getContext('2d')
    var imgdata
    var textData
    var processData = function (originalData,bit){
        var data = originalData.data
        for(var i=0;i<data.length;i++){
            if(i%4===bit){
                if(data[i] % 2 === 0){
                    data[i] = 0;
                } else {
                    data[i] = 255;
                }
            }
            else if(i%4===3){
            }
            else {
                data[i]=0;
            }
        }
        unmask.putImageData(imgdata,0,0)
    }
    var merge_data = function (bit) {
        var oData = imgdata.data
        var newData = textData
        for(var i=0;i<oData.length;i++){
            if(i%4===bit){
                //对目标通道
                if(newData[i+(3-bit)]===0&&(oData[i]%2===1)){
                    //没有信息的像素
                    if(oData[i]===255){
                        oData[i]--;
                    }
                    else {
                        oData[i]++;
                    }
                }
                else if(newData[i+(3-bit)]!==0&&(oData[i]%2===0)){
                    //有信息的像素
                    oData[i]++;
                }
            }
        }
        invisibleMask.putImageData(imgdata,0,0)
        return imgdata
    }
    var setSize = function (id,width,height){
        document.getElementById(id).setAttribute("width",width)
        document.getElementById(id).setAttribute("height",height)
    }
    img.onload = function () {
        var bit = Math.floor(Math.random() * 3)//这里使用随机通道写水印，对应即可得到到a通道
        invisibleMask.font = '30px Microsoft Yahei'
        invisibleMask.fillText('Rubisco的水印'+bit,30,30)
        textData = invisibleMask.getImageData(0,0,img.width,img.height).data
        var width = img.width
        var height = img.height
        setSize('invisiblemask',width,height)
        setSize('unmask',width,height)
        setSize('visiblemask',width,height)
        invisibleMask.drawImage(img,0,0,width,height)
        imgdata = invisibleMask.getImageData(0,0,width,height)
        processData(merge_data(bit),bit)
    }
}
function createWaterMark() {
    const angle = -20;
    const txt = 'Rubisco'
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, 180, 100);
    ctx.globalAlpha = 0.9;
    ctx.font = `32px serif`
    ctx.fillStyle = "red"
    ctx.rotate(Math.PI / 180 * angle);
    ctx.fillText(txt, 0, 50);
    console.log(canvas.toDataURL())
    return canvas.toDataURL();
}



var link = window.location.search.substring(1)
link = "images/"+link
var a = document.getElementById('image')
a.href = link
var img = document.createElement('img')
img.src = link
img.alt = link
var div = document.getElementById('visiblemask')
div.innerHTML = "<img src="+link+" alt="+link+"} />"
div.style.backgroundImage = "url("+createWaterMark()+")"
a.appendChild(img)
invisibleMask(img)


