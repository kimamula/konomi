# -*- coding: utf-8 -*-

# usage: python predict.py ../data/train/_/foo.png

import argparse
import numpy as np
from keras.models import load_model
from PIL import Image
from os import listdir
from os.path import isfile, join

parser = argparse.ArgumentParser(description='Predict.')
parser.add_argument('src_file', type=str, help='Source images file.')
args = parser.parse_args()

image_size = 299
model = load_model(filepath='../data/ml/final.fine_tuned.h5')

image = Image.open(args.src_file)
image = image.convert('RGB').resize((image_size, image_size), Image.ANTIALIAS)
image = np.asarray(image, dtype=np.float32).reshape(image_size, image_size, 3)
image /= 255.0

result = model.predict(np.array([image]), 1)[0]
for i, score in enumerate(result):
    print('Category-%d: %.2f' % (i, score))

# # if you want to specify directory as args.src_file
#
# files = [f for f in listdir(args.src_file) if isfile(join(args.src_file, f))]
#
# for f in files:
#     image = Image.open(join(args.src_file, f))
#     # image = Image.open(args.src_file)
#     image = image.convert('RGB').resize((image_size, image_size), Image.ANTIALIAS)
#     image = np.asarray(image, dtype=np.float32).reshape(image_size, image_size, 3)
#     image /= 255.0
#
#     result = model.predict(np.array([image]), 1)[0]
#     for i, score in enumerate(result):
#         print('%s: Category-%d: %.2f' % (f, i, score))
