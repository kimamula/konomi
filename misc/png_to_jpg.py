from PIL import Image
from os import listdir
from os.path import isfile, isdir, join, splitext

org_dir = './data/images_png'
dest_dir = './data/images'

subdirs = [d for d in listdir(org_dir) if isdir(join(org_dir, d))]

for subdir in subdirs:
    files = [f for f in listdir(join(org_dir, subdir)) if isfile(join(org_dir, subdir, f))]
    for f in files:
        image = Image.open(join(org_dir, subdir, f))
        bname, _ = splitext(f)
        rgb_im = image.convert('RGB')
        rgb_im.save(join(dest_dir, subdir, '{}.jpg'.format(bname)))