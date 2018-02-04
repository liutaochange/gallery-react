require('normalize.css/normalize.css');
require('styles/App.scss');

import React from 'react';
import ReactDOM from 'react-dom';

//获取图片相关的数据
var imgData = require('../data/imgdata.json');
imgData.forEach(element => {
  element.singleUrl = require('../images/'+element.file_name)
});

//img模块
class ImgFigure extends React.Component{
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick(event) {
    event.stopPropagation();
    event.preventDefault();
    if(this.props.arrange.isCenter){
      this.props.inverse();
    }else{
      this.props.livecenter();
    }
  }
  render() {
    var styleObj = {};
    //如果props指定了pos属性，就直接使用
    if (this.props.arrange.pos) {
      styleObj = this.props.arrange.pos;
    }
    //如果props指定了rotate属性，就直接使用
    if (this.props.arrange.rotate) {
      var browser = ['Moz', 'Webkit', 'ms', 'O'];
      browser.forEach(function(ele){
        styleObj[ele + 'Transform'] = 'rotate(' + this.props.arrange.rotate + 'deg)';
      }.bind(this));
    }
    if (this.props.arrange.isCenter) {
      styleObj.zIndex = 11;
    }
    var imgFigureClassName = 'img-wamp';
    imgFigureClassName += this.props.arrange.isInverse ? ' is_inverse' : '';
    return(
      <figure className={imgFigureClassName} style={styleObj} onClick={this.handleClick}>
        <img src={this.props.data.singleUrl} alt={this.props.data.title} className="img-item"/>
        <figcaption>
          <h3 className="img-title">{this.props.data.title}</h3>
          <div className="img-back" onClick={this.handleClick}>
            <p className="img-word" dangerouslySetInnerHTML={{__html:this.props.data.desc}}>
              
            </p>
          </div>
        </figcaption>
      </figure>
    )
  }
}

//控制模块
class Controller extends React.Component{
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick(event) {
    event.stopPropagation();
    event.preventDefault();
    if(this.props.arrange.isCenter){
      this.props.inverse();
    }else{
      this.props.livecenter();
    }
  }
  render() {
    var controllerClassName = 'controller-item';
    if(this.props.arrange.isCenter){
      controllerClassName += ' is-center';
      if(this.props.arrange.isInverse){
        controllerClassName += ' is-inverse';
      }
    }
    return (
      <span className={controllerClassName} onClick={this.handleClick}></span>
    )
  }
}


/* 获取两者之间的随机数
* @param index 指定居中的图片
*/
function getRandom(min,max){
  return Math.ceil(Math.random() * (max - min) + min)
}
/* 获取0到30度之间的任意正负值
*/
function getRandomRotate(){
  return ((Math.random() > 0.5 ? '' : '-') + Math.round(Math.random() * 30));
}
//页面整体结构
class AppComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {imgsArr:[
        {
          pos:{
            top: 0,
            left: 0
          },
          rotate: 0,  //旋转角度
          isInverse: false,   //图片是否反转
          isCenter: false
        }
      ],
      Constant: {
        center:{
          left: 0,
          top:0
        },
        hPosRange:{
          leftSecX:[0,0],
          rightSecX:[0,0],
          y:[0,0]
        },
        vPosRange:{
          x:[0,0],
          topY:[0,0]
        }
      }
    }
  }
   /* 翻转图片
  * @param index 输入当前需要翻转图片的索引index值
  */
  inverse(index){
    return function(){
      var imgsArr = this.state.imgsArr;
      imgsArr[index].isInverse = !imgsArr[index].isInverse;
      this.setState({
        imgsArr: imgsArr
      });
    }.bind(this)
  }

  livecenter(index){
    return function(){
      this.rearrange(index);
    }.bind(this);
  }

  //组件加载后执行
  componentDidMount() {
    //获取舞台的大小
    var stageEle = ReactDOM.findDOMNode(this.refs.stage);
    var stageW = stageEle.scrollWidth;
    var stageH = stageEle.scrollHeight;
    var halfStageW = Math.round(stageW / 2);
    var halfStageH = Math.round(stageH / 2);

    //获取图片的大小

    var imgEle = ReactDOM.findDOMNode(this.refs.imgfig0);
    var imgW = imgEle.scrollWidth;
    var imgH = imgEle.scrollHeight;
    var halfImgW = Math.round(imgW / 2);
    var halfImgH = Math.round(imgH / 2);
    //计算区域 中心点
    var Constant = this.state.Constant;
    Constant.center = {
      left: halfStageW-halfImgW,
      top: halfStageH-halfImgH
    }
    Constant.hPosRange.leftSecX[0] = -halfImgW;
    Constant.hPosRange.leftSecX[1] = halfStageW - halfImgW * 3;
    Constant.hPosRange.rightSecX[0] = halfStageW + halfImgW;
    Constant.hPosRange.rightSecX[1] = stageW - halfImgW;
    Constant.hPosRange.y[0] = -halfImgH;
    Constant.hPosRange.y[0] = stageH - halfImgH;

    Constant.vPosRange.x[0] = halfStageW - imgW;
    Constant.vPosRange.x[1] = halfStageW;
    Constant.vPosRange.topY[0] = -halfImgH;
    Constant.vPosRange.topY[1] = halfStageH - halfImgH * 3;
    var getRandomNum = getRandom(0,16)
    this.rearrange(getRandomNum);
  }

  /* 重新布局所有图片
  * @param index 指定居中的图片
  */
  rearrange(index) {
    var imgsArr = this.state.imgsArr,
    Constant = this.state.Constant,
    center = Constant.center,
    vPosRange = Constant.vPosRange,
    hPosRange = Constant.hPosRange,
    hPosRangeLeftSecX = hPosRange.leftSecX,
    hPosRangeRightSecX = hPosRange.rightSecX,
    hPosRangeY = hPosRange.y,
    vPosRangeTopY = vPosRange.topY,
    vPosRangeX = vPosRange.x,
    imgsTopArr = [],
    topImgNum = Math.floor(Math.random() * 2),
    topImgIndex = 0,
    imgsCenterArr = imgsArr.splice(index,1);
    //居中的图片
    imgsCenterArr[0].pos = center;
    //居中的图片不需要旋转
    imgsCenterArr[0].rotate = 0;
    imgsCenterArr[0].isCenter = true;
    //取出上侧的图片状态信息
    topImgIndex = Math.ceil(Math.random() * (imgsArr.length - topImgNum));
    imgsTopArr = imgsArr.splice(topImgIndex,topImgNum);

    imgsTopArr.forEach(function(item) {
      item.pos = Object.assign({}, {
        top: getRandom(vPosRangeTopY[0],vPosRangeTopY[1]),
        left: getRandom(vPosRangeX[0],vPosRangeX[1])
      });
      item.rotate = getRandomRotate();
      item.isCenter = false;
    })
    //布局左右两侧的图片
    var leftOrRightSize = imgsArr.length;
    imgsArr.forEach(function(ele,index){
      var LeftOrRightImg = null;
      //左边区域
      if(index < leftOrRightSize / 2){
        LeftOrRightImg = hPosRangeLeftSecX;
      }else {
        LeftOrRightImg = hPosRangeRightSecX;
      }
      ele.pos = Object.assign({}, {
        top: getRandom(hPosRangeY[0],hPosRangeY[1]),
        left: getRandom(LeftOrRightImg[0],LeftOrRightImg[1])
      });
      ele.rotate = getRandomRotate();
      ele.isCenter = false;
    })

    if(imgsTopArr && imgsTopArr[0]){
      imgsArr.splice(topImgIndex,0,imgsTopArr[0]);
    }

    imgsArr.splice(index,0,imgsCenterArr[0]);
    
    this.setState({
      imgsArr: imgsArr
    });


  }


  render() {
    var controllerUnits = [],ImgFigures = [];
    imgData.forEach(function(element,index) {
      if (!this.state.imgsArr[index]) {
        this.state.imgsArr[index]={
          pos:{
            top: 0,
            left: 0
          },
          rotate: 0,
          isInverse: false
        }
      }
      ImgFigures.push(<ImgFigure data={element} ref={'imgfig'+index} key={index} arrange={this.state.imgsArr[index]} inverse={this.inverse(index)} livecenter={this.livecenter(index)}/>);
      controllerUnits.push(<Controller key={index} arrange={this.state.imgsArr[index]} inverse={this.inverse(index)} livecenter={this.livecenter(index)}/>);
    }.bind(this));
    return (
     <section className="stage" ref='stage'>
      <section className="img-sec">
        {ImgFigures}
      </section>
      <nav className="controller-nav">
        {controllerUnits}
      </nav>
     </section>
    );
  }
}

AppComponent.defaultProps = {
};

export default AppComponent;
