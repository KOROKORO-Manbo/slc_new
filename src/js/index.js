require('imports-loader?this=>window!../calendar/jquery.sliderPro.min.js')
// require('imports-loader?this=>window!./jquery.inview.min.js')
// require('imports-loader?this=>window!./jquery.pretty_main.js')

import '../css/index.css'
import './jquery.js'
import myInview from './jquery.inview.min.export.js'
import './main.js'
import '../calendar/jquery.sliderPro.min.js'
import './jquery.prettyPhoto.js'
import './jquery.pretty_main.js'

myInview()

import './xmas_effect/rectangleEmitter.js'
import './xmas_effect/snow.js'
import myClassie from './xmas_effect/classie.js'
// import './xmas_effect/main.js'
myClassie()
