/**
 * Created by Q on 6/29/2015.
 */
'use strict';

var express= require('express');
var app = express();
app.use(express.static(__dirname+'/app'));
app.listen(process.env.PORT||8000);
