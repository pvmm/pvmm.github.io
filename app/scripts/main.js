/*
*
*  Push Notifications codelab
*  Copyright 2015 Google Inc. All rights reserved.
*
*  Licensed under the Apache License, Version 2.0 (the "License");
*  you may not use this file except in compliance with the License.
*  You may obtain a copy of the License at
*
*      https://www.apache.org/licenses/LICENSE-2.0
*
*  Unless required by applicable law or agreed to in writing, software
*  distributed under the License is distributed on an "AS IS" BASIS,
*  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
*  See the License for the specific language governing permissions and
*  limitations under the License
*
*/

/* eslint-env browser, es6 */

'use strict';

const applicationServerPublicKey = '<Your Public Key>';
const canvas = document.getElementById('canvas');
const pushButton = document.querySelector('.js-push-btn');

let isSubscribed = false;
let swRegistration = null;

function urlB64ToUint8Array(base64String) {
  const padding = '='.repeat((4 - base64String.length % 4) % 4);
  const base64 = (base64String + padding)
    .replace(/\-/g, '+')
    .replace(/_/g, '/');

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

function drawCharts(element) {
    var myChart = echarts.init(element);
    var option = {
        title: {
            text: 'ECharts 入门示例'
        },
        tooltip: {},
        legend: {
            data:['销量']
        },
        xAxis: {
            data: ["衬衫","羊毛衫","雪纺衫","裤子","高跟鞋","袜子"]
        },
        yAxis: {},
        series: [{
            name: '销量',
            type: 'bar',
            data: [5, 20, 36, 10, 10, 20]
        }]
    };

    myChart.setOption(option);
}

function initializeUi() {
  drawCharts(canvas);

  pushButton.addEventListener('click', function() {
    pushButton.disabled = true;
    document.location = 'http://pvmm.github.io';
    pushButton.disabled = false;
  });

  pushButton.disabled = false;
}

function initializeComm() {
  if (navigator.serviceWorker.controller != null) {
    var messageChannel = new MessageChannel();
    messageChannel.port1.addEventListener('message', replyHandler);
    messageChannel.port1.start();
    navigator.serviceWorker.controller.postMessage("ping!", [messageChannel.port2]);
  }
}

function replyHandler(event) {
  console.log('main.js received', event.data); // this comes from the ServiceWorker
}

// Service worker code
if ('serviceWorker' in navigator) {
  navigator.serviceWorker
    .register('/app/sw.js')
    .then(function(swReg) { 
      console.log('Service Worker registered', swReg); 
      swRegistration = swReg;
      initializeUi();
    })
    .catch(function(error) {
      console.error('Service Worker Error', error);
    });
} else {
  console.warn('Reload not supported');
  pushButton.textContent = 'Reload not supported';
}

