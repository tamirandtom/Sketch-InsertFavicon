var onRun = function (context) {
  let sketch = require('sketch')
  let Style = sketch.Style
  let ShapePath = sketch.ShapePath
  let Rectangle = sketch.Rectangle
  let document = sketch.getSelectedDocument()
  let page = document.selectedPage


  var selectedLayers = document.selectedLayers
  var selectedCount = selectedLayers.length
  if (selectedCount === 0) {
    sketch.UI.message('🤷‍♀️ Select a layer first')
  } else {

    sketch.UI.getInputFromUser(
      "Enter the site's url", { initialValue: 'amazon.com' },
      (err, value) => {
        if (err) {
          return
        } else {
          // Google favicon snacher URL
          let imageurl = "https://www.google.com/s2/favicons?domain=" + value;
          let imageurl_nsurl = NSURL.alloc().initWithString(imageurl);
          let nsimage = NSImage.alloc().initWithContentsOfURL(imageurl_nsurl);

          selectedLayers.forEach(function (layer, i) {
            console.log(layer)
            if (layer.type == 'ShapePath') {
              layer.style = {
                fills: [{
                  fill: 'Pattern',
                  pattern: {
                    patternType: Style.PatternFillType.Fill,
                    image: nsimage,
                  }
                }],
                borders: []
              }
              sketch.UI.message('💁‍♀️ Got favicon from ' + value)

            } else if (layer.type == 'SymbolInstance') {
              // is symbol

              layer.overrides.forEach((o) => {
                if (o.id.indexOf('_image') > -1) {
                  o.value = nsimage;
                }
              });
              sketch.UI.message('💁‍♀️ Got favicon from ' + value)

            } else {
              sketch.UI.message('🤷‍♀️ Selected layer isn\'t a shape layer or a symbol')

            }

          })

        }
      }
    )
  }




};
