# Konomi
Score human faces based on my personal preference.

Live demo is running at https://kimamula.github.io/konomi/

## Run locally

You have to enable [Shape Detection API](https://www.chromestatus.com/feature/4757990523535360) to run this app locally.

```sh
$ npm isntall
$ npm start
```

### __NOTE__

Currently, you have to edit `node_modules/@tensorflow/tfjs-converter/dist/operations/executors/matrices_executor.js` before you run `npm start` as described in https://github.com/tensorflow/tfjs/issues/85.

## How did I execute learning

1. Collect face images from Web by using [`FaceDetector`](https://wicg.github.io/shape-detection-api/#face-detection-api).
1. Classify the collected images and put them as follows.

```
data/
    images/
        _/      -> face images I do not like, including images which are not actually faces (error of FaceDetector)
            _001.png
            _002.png
            ...
        like/   -> face images I like
            like001.png
            like002.png
            ...
```

3. Convert images to `.jpg` as the following step does not accept `.png`.
1. Execute learning using [`retrain.py`](https://github.com/googlecodelabs/tensorflow-for-poets-2/blob/master/scripts/retrain.py) in [tensorflow-for-poet2 repository](https://github.com/googlecodelabs/tensorflow-for-poets-2). 

```
$ IMAGE_SIZE=224
$ ARCHITECTURE="mobilenet_1.0_${IMAGE_SIZE}"
$ DATA_DIR=/path/to/data/dir/shown/above
$ python -m scripts.retrain \
  --bottleneck_dir="${DATA_DIR}"/bottlenecks \
  --model_dir="${DATA_DIR}"/models/"${ARCHITECTURE}" \
  --summaries_dir="${DATA_DIR}"/training_summaries/"${ARCHITECTURE}" \
  --output_graph="${DATA_DIR}"/retrained_graph.pb \
  --output_labels="${DATA_DIR}"/retrained_labels.txt \
  --architecture="${ARCHITECTURE}" \
  --image_dir="${DATA_DIR}"/images \
  --how_many_training_steps=2000 \
  --learning_rate=0.0005 \
  --testing_percentage=20 \
  --validation_percentage=20 \
  --flip_left_right \
  --random_brightness=50
```

5. Convert the resulting model file (`retrained_graph.pb`) to SavedModel format using [create_saved_model.py](misc/create_saved_model.py).

```sh
$ python -m misc.create_saved_model
```

6. Convert the SavedModel with [tensorflowjs_converter](https://github.com/tensorflow/tfjs-converter/)

```sh
$ tensorflowjs_converter \
  --input_format=tf_saved_model \
  --saved_model_tags=serve \
  --output_node_names="final_result" \
  ./data/saved-model \
  ./data/tfjs
```

## Supported browsers

This app supports browsers which meet either of the following conditions.

- Browsers which support [Shape Detection API](https://www.chromestatus.com/feature/4757990523535360)
- Browsers which support [WASM](https://caniuse.com/#search=webassembly) and [Web Workers](https://caniuse.com/#search=webworkers)
