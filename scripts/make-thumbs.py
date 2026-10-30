"""Make 16:10 card thumbnails (960x600) for the home page. Usage: python3 scripts/make-thumbs.py . (needs Pillow)"""
import sys
from pathlib import Path
from PIL import Image
root = Path(sys.argv[1]); out = root / 'assets/products/thumbs'; out.mkdir(exist_ok=True)
# slug: (source, horizontal anchor 0..1, vertical anchor 0..1, zoom: fraction of the source width kept)
SPEC = {
    'survey-map': ('assets/products/gis-map.jpg', .3, .5, .72),
    'ecommerce-back-office': ('assets/products/erp-overview.jpg', 0, 0, .62),
    'soherdocs': ('evidence/soherdocs/soherdocs-workflow-poster.png', .5, .5, 1),
    'rigforge': ('assets/products/rigforge-home.jpg', .5, .3, 1),
    'robotops-twin': ('assets/products/robotops-cell.jpg', 1, .5, 1),
    'pi-agent-harness': ('evidence/pi-agent-harness/terminal-04-run-poster.png', 0, 0, .8),
    'blender-asset-director': ('assets/products/asset-director-poster.jpg', .5, .5, 1),
    'private-ai-datacenter': ('assets/products/datacenter-explorer.jpg', 0, 0, .9),
}
for slug, (src, ax, ay, zoom) in SPEC.items():
    im = Image.open(root / src).convert('RGB')
    w = im.width * zoom; h = w * 10 / 16
    if h > im.height: h = im.height; w = h * 16 / 10
    x = (im.width - w) * ax; y = (im.height - h) * ay
    im.crop((round(x), round(y), round(x + w), round(y + h))).resize((960, 600), Image.LANCZOS).save(out / f'{slug}.jpg', quality=78, optimize=True, progressive=True)
    print(slug, (out / f'{slug}.jpg').stat().st_size // 1024, 'KB')
