import tensorflow as tf
from tensorflow.python.saved_model import signature_constants
from tensorflow.python.saved_model import tag_constants

export_dir = './data/saved-model'
graph_pb = './data/retrained_graph.pb'

builder = tf.saved_model.builder.SavedModelBuilder(export_dir)

with tf.gfile.GFile(graph_pb, 'rb') as f:
    graph_def = tf.GraphDef()
    graph_def.ParseFromString(f.read())

with tf.Session(graph=tf.Graph()) as sess:
    tf.import_graph_def(graph_def, name='')
    g = tf.get_default_graph()
    inp = g.get_tensor_by_name('input:0')
    out = g.get_tensor_by_name('final_result:0')

    predict_signature = tf.saved_model.signature_def_utils.predict_signature_def({'input': inp}, {'output': out})

    builder.add_meta_graph_and_variables(sess, [tag_constants.SERVING], signature_def_map={
        signature_constants.DEFAULT_SERVING_SIGNATURE_DEF_KEY: predict_signature
    })

builder.save()
