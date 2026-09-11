// Element screenshots include overlapping siblings. Isolate the slide before
// capturing rather than assuming a cropped screenshot excludes player chrome.
export async function isolateSlide(page, slide) {
  await slide.evaluate(el => el.setAttribute('data-slide-capture', ''))
  await page.addStyleTag({ content: `
    body * { visibility: hidden !important; }
    [data-slide-capture], [data-slide-capture] * { visibility: visible !important; }
    [data-slide-capture] *, [data-slide-capture] *::before, [data-slide-capture] *::after { animation: none !important; transition: none !important; }
  ` })
  await page.mouse.move(1599, 899)
  await assertCleanCapture(page)
}

export async function assertCleanCapture(page) {
  const outside = await page.evaluate(() => {
    const root = document.querySelector('[data-slide-capture]')
    if (!root) return ['Capture root missing']
    const area = root.getBoundingClientRect()
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT)
    const found = []
    while (walker.nextNode()) {
      const node = walker.currentNode, el = node.parentElement
      if (!node.textContent.trim() || root.contains(el) || el.closest('script,style')) continue
      const style = getComputedStyle(el)
      if (style.visibility !== 'visible' || style.display === 'none') continue
      const range = document.createRange(); range.selectNodeContents(node)
      for (const rect of range.getClientRects()) if (rect.width && rect.height && rect.right > area.left && rect.left < area.right && rect.bottom > area.top && rect.top < area.bottom) {
        found.push(node.textContent.trim().slice(0,100)); break
      }
    }
    return found
  })
  if (outside.length) throw new Error(`Outside text overlaps slide: ${outside.join('; ')}`)
}
