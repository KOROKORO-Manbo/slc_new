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

//effect
import './effect/jquery.easing.1.3.js'
import './effect/modernizr.custom.56320.js'
import fSNCJM from './effect/sncjm-min.js'
fSNCJM()    // sncjmの_utilを得るための実行（main.js内で使われている）  window._util = new SNCJM.util;
import './effect/main.js'
