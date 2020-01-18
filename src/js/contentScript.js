window.addEventListener('load', e => {
  document.addEventListener('click', e => {
    if (e.target.id.indexOf('topic_img_') < 0) return;
    if (e.which !== 1) return;
    console.log('openning ' + e.target.src);
    window.open(e.target.src);
  });
  execScript(init, true);
  execScript('init()', true);
});

function init () {
  var timer = setInterval(() => {
    if (!window.mind) return;
    console.log('rewrite mind.operation.zoomOut');
    mind.operation.zoomOut = function(a) {
      var b = this
        , e = b.operation;
      e.zoomVal = Number(e.zoomVal) - 10;
      var d = e.zoomVal;
      if (d < 5) {
        e.zoomVal = 5;
        return
      }
      var c = d / 100;
      a.css({
        transform: "scale(" + c + ")",
        "-webkit-transform": "scale(" + c + ")",
        "-moz-transform": "scale(" + c + ")"
      });
      mind.plugins.navigator.init.call(mind)
    };
  
    mind.operation.zoomIn = function(a) {
      var b = this
        , e = b.operation;
      e.zoomVal = Number(e.zoomVal) + 10;
      var d = e.zoomVal;
      if (d > 190) {
        e.zoomVal = 190;
        return
      }
      var c = d / 100;
      a.css({
        transform: "scale(" + c + ")",
        "-webkit-transform": "scale(" + c + ")",
        "-moz-transform": "scale(" + c + ")"
      });
      mind.plugins.navigator.init.call(mind)
    };
    clearInterval(timer);
  }, 1000);
}

function execScript(code, embed, onload, onerror) {
  const s = document.createElement('script');
  if (embed) {
    s.textContent = typeof code === 'function' ? code.toString() :code;
    onload && onload();
  } else {
    s.src = code;
  }
  s.onload = () => {
    s.remove();
    onload && onload();
  };
  s.onerror = (e) => {
    onerror && onerror(e);
  };
  document.body.appendChild(s);
}