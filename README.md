# konomi
Score human faces based on my personal preference.

Live demo is running at https://kimamula.github.io/konomi/

# Run locally

```sh
$ npm isntall
$ npm start
```

# How did I execute learning

1. Collect face images from Web by using [`FaceDetector`](https://wicg.github.io/shape-detection-api/#face-detection-api).
1. Classify the collected images and put them as follows.

```
data/
    images/
        _/      -> face images I do not like
            _001.png
            _002.png
            ...
        error/  -> images which are not actually faces (detection error)
            error001.png
            error002.png
            ...
        like/   -> face images I like
            like001.png
            like002.png
            ...
        other/   -> face images which I do not want to include as candidates, such as faces on illustrations
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

5. Convert the resulting model file (`retrained_graph.pb`) to the format that can be used by deeplearn.js.
    - Unfortunately, this functionality is not officially provided by deeplearn.js.
    - Thus I used a [script](https://github.com/kimamula/deeplearnjs/commit/c2d74413122991e5cf82c6cb45b4ebab69976f4f) I wrote myself.

# Supported browsers

This app supports browsers which meet either of the following conditions.

- [Browsers on which FaceDetector is available](https://www.chromestatus.com/feature/4757990523535360)
- Browsers which support [WASM](https://caniuse.com/#search=webassembly) and [ServiceWorker](https://caniuse.com/#search=serviceworkers)
