import imgUrl from '../img/test.jpg';
import '../css/index.css';
import '../scss/main.scss';
import '../less/main.less';
import './name';

const testImg = new Image();
testImg.src = imgUrl;
document.querySelector('body').appendChild(testImg);
