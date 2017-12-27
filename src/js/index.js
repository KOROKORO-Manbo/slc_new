require('imports-loader?this=>window!../calendar/jquery.sliderPro.min.js')
// require('imports-loader?this=>window!./jquery.inview.min.js')
// require('imports-loader?this=>window!./jquery.pretty_main.js')

import '../css/index.css'
import './jquery.js'
// import './jquery.inview.min.js'    バンドルで動作しなくなるのでbundle.jsの最後尾のWebPackの外に置いた
import './main.js'
import '../calendar/jquery.sliderPro.min.js'
import './jquery.prettyPhoto.js'
import './jquery.pretty_main.js'
