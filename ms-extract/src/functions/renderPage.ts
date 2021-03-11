function renderPage (pageData) {
  const renderOptions = {
    normalizeWhitespace: false,
    disableCombineTextItems: false
  }

  return pageData.getTextContent(renderOptions).then(function (textContent) {
    let lastY
    let text = ''
    for (const item of textContent.items) {
      if (lastY === item.transform[5] || !lastY) {
        text += item.str
      } else {
        text += '\n' + item.str
      }
      lastY = item.transform[5]
    }
    return text
  })
}

const options = {
  pagerender: renderPage
}

export default options
