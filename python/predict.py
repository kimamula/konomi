# -*- coding: utf-8 -*-

# usage: python predict.py ../data/train/_/foo.png

import argparse
import numpy as np
from keras.models import load_model
from PIL import Image
from os import listdir
from os.path import isfile, join
from keras.utils.generic_utils import CustomObjectScope
from keras.applications.mobilenet import relu6, DepthwiseConv2D

parser = argparse.ArgumentParser(description='Predict.')
parser.add_argument('src_file', type=str, help='Source images file.')
args = parser.parse_args()

image_size = 224

# https://github.com/keras-team/keras/issues/7431#issuecomment-334959500
with CustomObjectScope({'relu6': relu6, 'DepthwiseConv2D': DepthwiseConv2D}):
    model = load_model(filepath='../data/ml/final.fine_tuned.h5')

# # if you want to specify file as args.src_file
#
# image = Image.open(args.src_file)
# image = image.convert('RGB').resize((image_size, image_size), Image.ANTIALIAS)
# image = np.asarray(image, dtype=np.float32).reshape(image_size, image_size, 3)
# image /= 255.0
#
# result = model.predict(np.array([image]), 1)[0]
# for i, score in enumerate(result):
#     print('Category-%d: %.2f' % (i, score))

# if you want to specify directory as args.src_file

files = [f for f in listdir(args.src_file) if isfile(join(args.src_file, f))]

for f in files:
    image = Image.open(join(args.src_file, f))
    image = image.convert('RGB').resize((image_size, image_size), Image.ANTIALIAS)
    image = np.asarray(image, dtype=np.float32).reshape(image_size, image_size, 3)
    image /= 255.0

    result = model.predict(np.array([image]), 1)[0]
    for i, score in enumerate(result):
        print('%s: Category-%d: %.2f' % (f, i, score))
