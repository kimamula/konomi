/**
 * Welcome to your Workbox-powered service worker!
 *
 * You'll need to register this file in your web app and you should
 * disable HTTP caching for this file too.
 * See https://goo.gl/nhQhGp
 *
 * The rest of the code is auto-generated. Please don't update this file
 * directly; instead, make changes to your Workbox build configuration
 * and re-run your build process.
 * See https://goo.gl/2aRDsh
 */

importScripts("https://storage.googleapis.com/workbox-cdn/releases/3.0.0/workbox-sw.js");

workbox.core.setCacheNameDetails({prefix: "konomi"});

workbox.skipWaiting();

/**
 * The workboxSW.precacheAndRoute() method efficiently caches and responds to
 * requests for URLs in the manifest.
 * See https://goo.gl/S9QRab
 */
self.__precacheManifest = [
  {
    "url": "330df6ab5699c2016aa1d93deb7a72de.png",
    "revision": "561dd548067fbaea3278683f9128b8a0"
  },
  {
    "url": "6ca0258f5e847422f2ddc9b8d077d6c0.js",
    "revision": "f9e1931566ead048a6a62d8f346f3a3d"
  },
  {
    "url": "index.html",
    "revision": "491bd2909d616163f0243ae7dde05eaf"
  },
  {
    "url": "dl-manifest/final_training_ops_biases_final_biases",
    "revision": "86d06f17551672cd63352c2f78fea9d6"
  },
  {
    "url": "dl-manifest/final_training_ops_weights_final_weights",
    "revision": "b62cf3a5a94378fcc59fd8a70caa8cc2"
  },
  {
    "url": "dl-manifest/manifest.json",
    "revision": "d2d9cc535beefe75f7ce53b62d26a840"
  },
  {
    "url": "dl-manifest/MobilenetV1_Conv2d_0_BatchNorm_beta",
    "revision": "8305fa5672b5c9cdbaff9f1d2bd071b7"
  },
  {
    "url": "dl-manifest/MobilenetV1_Conv2d_0_BatchNorm_gamma",
    "revision": "8500cad345f41536f5e9dabaef5e537e"
  },
  {
    "url": "dl-manifest/MobilenetV1_Conv2d_0_BatchNorm_moving_mean",
    "revision": "58de8a0f318e38172001a35c7621be04"
  },
  {
    "url": "dl-manifest/MobilenetV1_Conv2d_0_BatchNorm_moving_variance",
    "revision": "d80872017c47f81ec1a0214fad11f56e"
  },
  {
    "url": "dl-manifest/MobilenetV1_Conv2d_0_weights",
    "revision": "385d1c6e69eb9c955332fa766fa5a966"
  },
  {
    "url": "dl-manifest/MobilenetV1_Conv2d_1_depthwise_BatchNorm_beta",
    "revision": "387029721b84ecee6a48a0571a2bc157"
  },
  {
    "url": "dl-manifest/MobilenetV1_Conv2d_1_depthwise_BatchNorm_gamma",
    "revision": "4a6e46246c050928af117416515a8390"
  },
  {
    "url": "dl-manifest/MobilenetV1_Conv2d_1_depthwise_BatchNorm_moving_mean",
    "revision": "98704a5f46c820a585c5e1bc210f775c"
  },
  {
    "url": "dl-manifest/MobilenetV1_Conv2d_1_depthwise_BatchNorm_moving_variance",
    "revision": "82d3f699b312a8bac11bc13736538690"
  },
  {
    "url": "dl-manifest/MobilenetV1_Conv2d_1_depthwise_depthwise_weights",
    "revision": "401dd2a76dfc6b091a051cc0ab4d823b"
  },
  {
    "url": "dl-manifest/MobilenetV1_Conv2d_1_pointwise_BatchNorm_beta",
    "revision": "796122d9f188676f72a5a1dc1fb04cc2"
  },
  {
    "url": "dl-manifest/MobilenetV1_Conv2d_1_pointwise_BatchNorm_gamma",
    "revision": "0c59d8c2088091cc9093e7ad063166b8"
  },
  {
    "url": "dl-manifest/MobilenetV1_Conv2d_1_pointwise_BatchNorm_moving_mean",
    "revision": "4e8f4b2df59482c8096e32dedc9880ee"
  },
  {
    "url": "dl-manifest/MobilenetV1_Conv2d_1_pointwise_BatchNorm_moving_variance",
    "revision": "52908d3b4b49c0fb0f6f0d07601796ad"
  },
  {
    "url": "dl-manifest/MobilenetV1_Conv2d_1_pointwise_weights",
    "revision": "d404bdeb901a95f6b1ef4902d4f8d8dc"
  },
  {
    "url": "dl-manifest/MobilenetV1_Conv2d_10_depthwise_BatchNorm_beta",
    "revision": "8d8cfa5867a0bd8f795b763e40a06a5f"
  },
  {
    "url": "dl-manifest/MobilenetV1_Conv2d_10_depthwise_BatchNorm_gamma",
    "revision": "8dfc863ca1f4ee118ef68edce70812e8"
  },
  {
    "url": "dl-manifest/MobilenetV1_Conv2d_10_depthwise_BatchNorm_moving_mean",
    "revision": "35e5142ccb7a3b9c82807328dba50f3e"
  },
  {
    "url": "dl-manifest/MobilenetV1_Conv2d_10_depthwise_BatchNorm_moving_variance",
    "revision": "9ba8c7bf25bb4d3b8551dbbfb84042c1"
  },
  {
    "url": "dl-manifest/MobilenetV1_Conv2d_10_depthwise_depthwise_weights",
    "revision": "f89e498ab807db30cf81a001c5e545fb"
  },
  {
    "url": "dl-manifest/MobilenetV1_Conv2d_10_pointwise_BatchNorm_beta",
    "revision": "0dd6f5bd0754d212a192f58ac9826d4f"
  },
  {
    "url": "dl-manifest/MobilenetV1_Conv2d_10_pointwise_BatchNorm_gamma",
    "revision": "da2922bb3430bd09620fbe60785f0ccc"
  },
  {
    "url": "dl-manifest/MobilenetV1_Conv2d_10_pointwise_BatchNorm_moving_mean",
    "revision": "5391369eaa96af603a0e27c11fd5079d"
  },
  {
    "url": "dl-manifest/MobilenetV1_Conv2d_10_pointwise_BatchNorm_moving_variance",
    "revision": "fe7fdd85c0818f89ee3e6347a969d9a7"
  },
  {
    "url": "dl-manifest/MobilenetV1_Conv2d_10_pointwise_weights",
    "revision": "f0140732bc85326dce55b619dbdf00dc"
  },
  {
    "url": "dl-manifest/MobilenetV1_Conv2d_11_depthwise_BatchNorm_beta",
    "revision": "bbc3045277c424071ed22116ea51d737"
  },
  {
    "url": "dl-manifest/MobilenetV1_Conv2d_11_depthwise_BatchNorm_gamma",
    "revision": "9fc5ecee8c76880cc76e45abc5156312"
  },
  {
    "url": "dl-manifest/MobilenetV1_Conv2d_11_depthwise_BatchNorm_moving_mean",
    "revision": "9bb7097c8f6d001831cc5eb9fddc35e1"
  },
  {
    "url": "dl-manifest/MobilenetV1_Conv2d_11_depthwise_BatchNorm_moving_variance",
    "revision": "a82e783678d256395b8257d8b092764f"
  },
  {
    "url": "dl-manifest/MobilenetV1_Conv2d_11_depthwise_depthwise_weights",
    "revision": "d048a2ffe32ce488bbdcb36cac3e6e44"
  },
  {
    "url": "dl-manifest/MobilenetV1_Conv2d_11_pointwise_BatchNorm_beta",
    "revision": "0c8d51bb6a5b73905afb4a98fa82f3d3"
  },
  {
    "url": "dl-manifest/MobilenetV1_Conv2d_11_pointwise_BatchNorm_gamma",
    "revision": "22469034eb2255dd44e6e842c82745d9"
  },
  {
    "url": "dl-manifest/MobilenetV1_Conv2d_11_pointwise_BatchNorm_moving_mean",
    "revision": "40183d7baba1f575a1972c41bc41fd64"
  },
  {
    "url": "dl-manifest/MobilenetV1_Conv2d_11_pointwise_BatchNorm_moving_variance",
    "revision": "21930dbbac49fed033a4e9f8f8716d0d"
  },
  {
    "url": "dl-manifest/MobilenetV1_Conv2d_11_pointwise_weights",
    "revision": "6803481cf17699966ba300e786c0cdbe"
  },
  {
    "url": "dl-manifest/MobilenetV1_Conv2d_12_depthwise_BatchNorm_beta",
    "revision": "6d7974dff1a3b4c93de217208b05c141"
  },
  {
    "url": "dl-manifest/MobilenetV1_Conv2d_12_depthwise_BatchNorm_gamma",
    "revision": "a05f6bd44120a2ded3350c0511ada3fb"
  },
  {
    "url": "dl-manifest/MobilenetV1_Conv2d_12_depthwise_BatchNorm_moving_mean",
    "revision": "e667cac280d321fa3eb119086a096fb5"
  },
  {
    "url": "dl-manifest/MobilenetV1_Conv2d_12_depthwise_BatchNorm_moving_variance",
    "revision": "e3c5320e04984e6eb9960793f086568e"
  },
  {
    "url": "dl-manifest/MobilenetV1_Conv2d_12_depthwise_depthwise_weights",
    "revision": "6041eaa6aff8a3267ffd523eff347502"
  },
  {
    "url": "dl-manifest/MobilenetV1_Conv2d_12_pointwise_BatchNorm_beta",
    "revision": "45bdc4e0731541b9a7a1a868b3c1f233"
  },
  {
    "url": "dl-manifest/MobilenetV1_Conv2d_12_pointwise_BatchNorm_gamma",
    "revision": "317552b60fb7c36f5b96baace59efe54"
  },
  {
    "url": "dl-manifest/MobilenetV1_Conv2d_12_pointwise_BatchNorm_moving_mean",
    "revision": "ea0c25860ee734fc541b7a9ec9be272d"
  },
  {
    "url": "dl-manifest/MobilenetV1_Conv2d_12_pointwise_BatchNorm_moving_variance",
    "revision": "81cd19f2d47aa05c824baf2302c7b390"
  },
  {
    "url": "dl-manifest/MobilenetV1_Conv2d_12_pointwise_weights",
    "revision": "e5ee267da50b87ca200102490144e0ff"
  },
  {
    "url": "dl-manifest/MobilenetV1_Conv2d_13_depthwise_BatchNorm_beta",
    "revision": "a51c8d3e632d5a777776d8acb886909d"
  },
  {
    "url": "dl-manifest/MobilenetV1_Conv2d_13_depthwise_BatchNorm_gamma",
    "revision": "fd7832df7929016e99d2567121c1d816"
  },
  {
    "url": "dl-manifest/MobilenetV1_Conv2d_13_depthwise_BatchNorm_moving_mean",
    "revision": "837f570ca5700db9604f0a9e2f4b0014"
  },
  {
    "url": "dl-manifest/MobilenetV1_Conv2d_13_depthwise_BatchNorm_moving_variance",
    "revision": "ac42a13f2556b68e7a38493276d63135"
  },
  {
    "url": "dl-manifest/MobilenetV1_Conv2d_13_depthwise_depthwise_weights",
    "revision": "4c82eefba6e6ece0233dcc6081ef7e90"
  },
  {
    "url": "dl-manifest/MobilenetV1_Conv2d_13_pointwise_BatchNorm_beta",
    "revision": "adfb3bb82a6b348323e0929476e84034"
  },
  {
    "url": "dl-manifest/MobilenetV1_Conv2d_13_pointwise_BatchNorm_gamma",
    "revision": "a7d6a10743397133f2d15cd62cc7399c"
  },
  {
    "url": "dl-manifest/MobilenetV1_Conv2d_13_pointwise_BatchNorm_moving_mean",
    "revision": "47b341e363961892c132b12aa826c7b0"
  },
  {
    "url": "dl-manifest/MobilenetV1_Conv2d_13_pointwise_BatchNorm_moving_variance",
    "revision": "231b03a6d58be63f98037b8173bb7a04"
  },
  {
    "url": "dl-manifest/MobilenetV1_Conv2d_13_pointwise_weights",
    "revision": "149b42a88c75bdb720dda16d5279455d"
  },
  {
    "url": "dl-manifest/MobilenetV1_Conv2d_2_depthwise_BatchNorm_beta",
    "revision": "5d586113eeab5a976972f7a42d1e72e4"
  },
  {
    "url": "dl-manifest/MobilenetV1_Conv2d_2_depthwise_BatchNorm_gamma",
    "revision": "0d71da8a9e17144ad16caa28f83cfba9"
  },
  {
    "url": "dl-manifest/MobilenetV1_Conv2d_2_depthwise_BatchNorm_moving_mean",
    "revision": "b945818b45033d4ff358cf9d56a06295"
  },
  {
    "url": "dl-manifest/MobilenetV1_Conv2d_2_depthwise_BatchNorm_moving_variance",
    "revision": "7097c221ac0f9df504af368d319eb70e"
  },
  {
    "url": "dl-manifest/MobilenetV1_Conv2d_2_depthwise_depthwise_weights",
    "revision": "3809cdcc1f4b96c29627feb9ce15f411"
  },
  {
    "url": "dl-manifest/MobilenetV1_Conv2d_2_pointwise_BatchNorm_beta",
    "revision": "6fd1a60f6f106801df25267d1c06a6a4"
  },
  {
    "url": "dl-manifest/MobilenetV1_Conv2d_2_pointwise_BatchNorm_gamma",
    "revision": "ce968d7055745719d234a09aad862466"
  },
  {
    "url": "dl-manifest/MobilenetV1_Conv2d_2_pointwise_BatchNorm_moving_mean",
    "revision": "07f2f28975b2768b09ade75f928010c5"
  },
  {
    "url": "dl-manifest/MobilenetV1_Conv2d_2_pointwise_BatchNorm_moving_variance",
    "revision": "c2959a782f533fff1079bcdf3e5b0626"
  },
  {
    "url": "dl-manifest/MobilenetV1_Conv2d_2_pointwise_weights",
    "revision": "c9518afcf3d731524648e43c21975b28"
  },
  {
    "url": "dl-manifest/MobilenetV1_Conv2d_3_depthwise_BatchNorm_beta",
    "revision": "ec9fa9e63f904f8e60957d4721b1e635"
  },
  {
    "url": "dl-manifest/MobilenetV1_Conv2d_3_depthwise_BatchNorm_gamma",
    "revision": "1f1795c2d1315fa23ad49a76226069da"
  },
  {
    "url": "dl-manifest/MobilenetV1_Conv2d_3_depthwise_BatchNorm_moving_mean",
    "revision": "ae73caca7873d0cdbd0835c3f977dffc"
  },
  {
    "url": "dl-manifest/MobilenetV1_Conv2d_3_depthwise_BatchNorm_moving_variance",
    "revision": "ebbf833dc98c3a52c0064c40579a0b3b"
  },
  {
    "url": "dl-manifest/MobilenetV1_Conv2d_3_depthwise_depthwise_weights",
    "revision": "8d691ea59c553501cb21605eb75464a1"
  },
  {
    "url": "dl-manifest/MobilenetV1_Conv2d_3_pointwise_BatchNorm_beta",
    "revision": "c1f1f756df335e57a7478c8baf57328a"
  },
  {
    "url": "dl-manifest/MobilenetV1_Conv2d_3_pointwise_BatchNorm_gamma",
    "revision": "f36e0056229a886f7c824514f6f0913e"
  },
  {
    "url": "dl-manifest/MobilenetV1_Conv2d_3_pointwise_BatchNorm_moving_mean",
    "revision": "07831ce6d94d9d247072c94253659cd8"
  },
  {
    "url": "dl-manifest/MobilenetV1_Conv2d_3_pointwise_BatchNorm_moving_variance",
    "revision": "8168ccc253820bfed537b3c75720e7ca"
  },
  {
    "url": "dl-manifest/MobilenetV1_Conv2d_3_pointwise_weights",
    "revision": "6efad2e7dccda4211516ba3ab14692e7"
  },
  {
    "url": "dl-manifest/MobilenetV1_Conv2d_4_depthwise_BatchNorm_beta",
    "revision": "9a5e3d1f5fdf0f2f91a7775e469ed36b"
  },
  {
    "url": "dl-manifest/MobilenetV1_Conv2d_4_depthwise_BatchNorm_gamma",
    "revision": "d04f795990dfd5a4c4d6336e04c0e177"
  },
  {
    "url": "dl-manifest/MobilenetV1_Conv2d_4_depthwise_BatchNorm_moving_mean",
    "revision": "17563111a0bb2930bf11cf6f677c73d9"
  },
  {
    "url": "dl-manifest/MobilenetV1_Conv2d_4_depthwise_BatchNorm_moving_variance",
    "revision": "02e5b3d1da843ffa864204540cb5b824"
  },
  {
    "url": "dl-manifest/MobilenetV1_Conv2d_4_depthwise_depthwise_weights",
    "revision": "5bbda355d61e8744d845176eb7801b65"
  },
  {
    "url": "dl-manifest/MobilenetV1_Conv2d_4_pointwise_BatchNorm_beta",
    "revision": "95fbc5763b9a5ec9150c6af428cb308b"
  },
  {
    "url": "dl-manifest/MobilenetV1_Conv2d_4_pointwise_BatchNorm_gamma",
    "revision": "8cc9f042a7a9c7f50db987f0a8fec722"
  },
  {
    "url": "dl-manifest/MobilenetV1_Conv2d_4_pointwise_BatchNorm_moving_mean",
    "revision": "84e562a99a86f0e0b8741befc646702d"
  },
  {
    "url": "dl-manifest/MobilenetV1_Conv2d_4_pointwise_BatchNorm_moving_variance",
    "revision": "2fd42437b45b3baf3f66d0002d577f92"
  },
  {
    "url": "dl-manifest/MobilenetV1_Conv2d_4_pointwise_weights",
    "revision": "b66ad21b37c92d191216a9e2360611ca"
  },
  {
    "url": "dl-manifest/MobilenetV1_Conv2d_5_depthwise_BatchNorm_beta",
    "revision": "fe834a2493a3f2746d595b31320303f8"
  },
  {
    "url": "dl-manifest/MobilenetV1_Conv2d_5_depthwise_BatchNorm_gamma",
    "revision": "260b15861a2fbc3a607c08b86877c761"
  },
  {
    "url": "dl-manifest/MobilenetV1_Conv2d_5_depthwise_BatchNorm_moving_mean",
    "revision": "a0fee35b1d97138a96e78dfda78694aa"
  },
  {
    "url": "dl-manifest/MobilenetV1_Conv2d_5_depthwise_BatchNorm_moving_variance",
    "revision": "721ee9773c51c482a97de6c9cb78b0cb"
  },
  {
    "url": "dl-manifest/MobilenetV1_Conv2d_5_depthwise_depthwise_weights",
    "revision": "be10981519db01608e779ad2ae8ba207"
  },
  {
    "url": "dl-manifest/MobilenetV1_Conv2d_5_pointwise_BatchNorm_beta",
    "revision": "9bdf2bb79d7e7d28ee6a813ca9dd3c5f"
  },
  {
    "url": "dl-manifest/MobilenetV1_Conv2d_5_pointwise_BatchNorm_gamma",
    "revision": "199a2304f904a4784cc88c5f5e49101c"
  },
  {
    "url": "dl-manifest/MobilenetV1_Conv2d_5_pointwise_BatchNorm_moving_mean",
    "revision": "b35c2c5cbfb0a3411e22004a36457935"
  },
  {
    "url": "dl-manifest/MobilenetV1_Conv2d_5_pointwise_BatchNorm_moving_variance",
    "revision": "4bec4813947df6abf39372d2ba6fe987"
  },
  {
    "url": "dl-manifest/MobilenetV1_Conv2d_5_pointwise_weights",
    "revision": "840830b7007c281be1aa747aabc6bd66"
  },
  {
    "url": "dl-manifest/MobilenetV1_Conv2d_6_depthwise_BatchNorm_beta",
    "revision": "43580f49ca7899bc1ec952943d850255"
  },
  {
    "url": "dl-manifest/MobilenetV1_Conv2d_6_depthwise_BatchNorm_gamma",
    "revision": "cf14d2ff52ab256ffc19dc710d85dcb8"
  },
  {
    "url": "dl-manifest/MobilenetV1_Conv2d_6_depthwise_BatchNorm_moving_mean",
    "revision": "882c1568f9d62e9b0f5112e41229f78c"
  },
  {
    "url": "dl-manifest/MobilenetV1_Conv2d_6_depthwise_BatchNorm_moving_variance",
    "revision": "c6006b75fe90cf32960c8fdaacad2bf8"
  },
  {
    "url": "dl-manifest/MobilenetV1_Conv2d_6_depthwise_depthwise_weights",
    "revision": "bd8a49e54a4d59a6d4a787a696eb7cda"
  },
  {
    "url": "dl-manifest/MobilenetV1_Conv2d_6_pointwise_BatchNorm_beta",
    "revision": "98ef297407c954c43f06ce29ff70ac10"
  },
  {
    "url": "dl-manifest/MobilenetV1_Conv2d_6_pointwise_BatchNorm_gamma",
    "revision": "62e7233d09fc2209a551ef658530184c"
  },
  {
    "url": "dl-manifest/MobilenetV1_Conv2d_6_pointwise_BatchNorm_moving_mean",
    "revision": "7af9ea34b129ba16e6ff11d9cf74f42a"
  },
  {
    "url": "dl-manifest/MobilenetV1_Conv2d_6_pointwise_BatchNorm_moving_variance",
    "revision": "7c62a6c9f394f764307dade6854f93d9"
  },
  {
    "url": "dl-manifest/MobilenetV1_Conv2d_6_pointwise_weights",
    "revision": "95cde7132af01c016e7653e40f06156e"
  },
  {
    "url": "dl-manifest/MobilenetV1_Conv2d_7_depthwise_BatchNorm_beta",
    "revision": "642a1ef1e78ea97874eecb9fe40218b9"
  },
  {
    "url": "dl-manifest/MobilenetV1_Conv2d_7_depthwise_BatchNorm_gamma",
    "revision": "2a39a0df04914a600cc968d5cad341e0"
  },
  {
    "url": "dl-manifest/MobilenetV1_Conv2d_7_depthwise_BatchNorm_moving_mean",
    "revision": "ac4374ea3bb775d38c9826bcf64aaf8b"
  },
  {
    "url": "dl-manifest/MobilenetV1_Conv2d_7_depthwise_BatchNorm_moving_variance",
    "revision": "f5e0f97c6307106fa321162c2ab1b20a"
  },
  {
    "url": "dl-manifest/MobilenetV1_Conv2d_7_depthwise_depthwise_weights",
    "revision": "ba2ffb124e47441dfee3908e0eca5ded"
  },
  {
    "url": "dl-manifest/MobilenetV1_Conv2d_7_pointwise_BatchNorm_beta",
    "revision": "bcf32c5695ca5d4ae10368aff3ae7239"
  },
  {
    "url": "dl-manifest/MobilenetV1_Conv2d_7_pointwise_BatchNorm_gamma",
    "revision": "a32e2d4cae4fa6efa8127dbe63dea856"
  },
  {
    "url": "dl-manifest/MobilenetV1_Conv2d_7_pointwise_BatchNorm_moving_mean",
    "revision": "f5e26b57b1c4c49abd859ec86e437b69"
  },
  {
    "url": "dl-manifest/MobilenetV1_Conv2d_7_pointwise_BatchNorm_moving_variance",
    "revision": "5872928fbf496e96d6cf5c45519c27b4"
  },
  {
    "url": "dl-manifest/MobilenetV1_Conv2d_7_pointwise_weights",
    "revision": "f61d1997fb58a063599013c79031f1c5"
  },
  {
    "url": "dl-manifest/MobilenetV1_Conv2d_8_depthwise_BatchNorm_beta",
    "revision": "ba6a8f8c4c7ee6a0642d38225d2072cf"
  },
  {
    "url": "dl-manifest/MobilenetV1_Conv2d_8_depthwise_BatchNorm_gamma",
    "revision": "655ee7620e602ef06b8e64f98bc9ebda"
  },
  {
    "url": "dl-manifest/MobilenetV1_Conv2d_8_depthwise_BatchNorm_moving_mean",
    "revision": "3c6002a64a091d2864197184f59fdc39"
  },
  {
    "url": "dl-manifest/MobilenetV1_Conv2d_8_depthwise_BatchNorm_moving_variance",
    "revision": "6183164c29bc582dce48af08638f6b2a"
  },
  {
    "url": "dl-manifest/MobilenetV1_Conv2d_8_depthwise_depthwise_weights",
    "revision": "0e119bf04cbbacc273e0742f772002f0"
  },
  {
    "url": "dl-manifest/MobilenetV1_Conv2d_8_pointwise_BatchNorm_beta",
    "revision": "bee2bab17d44570d67382e2d08994913"
  },
  {
    "url": "dl-manifest/MobilenetV1_Conv2d_8_pointwise_BatchNorm_gamma",
    "revision": "75c1d688227c4e33f9a86fdb4ee94dda"
  },
  {
    "url": "dl-manifest/MobilenetV1_Conv2d_8_pointwise_BatchNorm_moving_mean",
    "revision": "d7eeb2106d12b0fbc2cf8b2ab349d3b1"
  },
  {
    "url": "dl-manifest/MobilenetV1_Conv2d_8_pointwise_BatchNorm_moving_variance",
    "revision": "c5171fbfb3d3beff434392de8434465d"
  },
  {
    "url": "dl-manifest/MobilenetV1_Conv2d_8_pointwise_weights",
    "revision": "ef9127837e244511dccea9dbd3463231"
  },
  {
    "url": "dl-manifest/MobilenetV1_Conv2d_9_depthwise_BatchNorm_beta",
    "revision": "0708b09d52b5bac823eb09b5877169d3"
  },
  {
    "url": "dl-manifest/MobilenetV1_Conv2d_9_depthwise_BatchNorm_gamma",
    "revision": "6311853866c10ad0ae9df42867b7753e"
  },
  {
    "url": "dl-manifest/MobilenetV1_Conv2d_9_depthwise_BatchNorm_moving_mean",
    "revision": "32d3515f72982b2f4469ac81171310bd"
  },
  {
    "url": "dl-manifest/MobilenetV1_Conv2d_9_depthwise_BatchNorm_moving_variance",
    "revision": "5313cd486d6287f60579d0585d4a6e38"
  },
  {
    "url": "dl-manifest/MobilenetV1_Conv2d_9_depthwise_depthwise_weights",
    "revision": "662781bf8c46a6848502d394f8020099"
  },
  {
    "url": "dl-manifest/MobilenetV1_Conv2d_9_pointwise_BatchNorm_beta",
    "revision": "f221a3b7259a4a7c2c3fc45d680f8981"
  },
  {
    "url": "dl-manifest/MobilenetV1_Conv2d_9_pointwise_BatchNorm_gamma",
    "revision": "b6758b6a228832207b7eda59bfd51833"
  },
  {
    "url": "dl-manifest/MobilenetV1_Conv2d_9_pointwise_BatchNorm_moving_mean",
    "revision": "fc976ff9b5e6d42b9d44a1ae04beba08"
  },
  {
    "url": "dl-manifest/MobilenetV1_Conv2d_9_pointwise_BatchNorm_moving_variance",
    "revision": "34099bc7b4d59964d458445a6e759176"
  },
  {
    "url": "dl-manifest/MobilenetV1_Conv2d_9_pointwise_weights",
    "revision": "61cf9624cc457e8499d0600f345aff37"
  },
  {
    "url": "dl-manifest/MobilenetV1_Logits_Conv2d_1c_1x1_biases",
    "revision": "0d65cbc3007f733ce9f711a22ffec7aa"
  },
  {
    "url": "dl-manifest/MobilenetV1_Logits_Conv2d_1c_1x1_weights",
    "revision": "721b0c54a14ea6a54b4619f3c8acca6d"
  },
  {
    "url": "dl-manifest/MobilenetV1_MobilenetV1_Conv2d_0_BatchNorm_batchnorm_add_y",
    "revision": "86b54f333255e8bbb59481253ec7e970"
  },
  {
    "url": "dl-manifest/MobilenetV1_MobilenetV1_Conv2d_1_depthwise_BatchNorm_batchnorm_add_y",
    "revision": "86b54f333255e8bbb59481253ec7e970"
  },
  {
    "url": "dl-manifest/MobilenetV1_MobilenetV1_Conv2d_1_pointwise_BatchNorm_batchnorm_add_y",
    "revision": "86b54f333255e8bbb59481253ec7e970"
  },
  {
    "url": "dl-manifest/MobilenetV1_MobilenetV1_Conv2d_10_depthwise_BatchNorm_batchnorm_add_y",
    "revision": "86b54f333255e8bbb59481253ec7e970"
  },
  {
    "url": "dl-manifest/MobilenetV1_MobilenetV1_Conv2d_10_pointwise_BatchNorm_batchnorm_add_y",
    "revision": "86b54f333255e8bbb59481253ec7e970"
  },
  {
    "url": "dl-manifest/MobilenetV1_MobilenetV1_Conv2d_11_depthwise_BatchNorm_batchnorm_add_y",
    "revision": "86b54f333255e8bbb59481253ec7e970"
  },
  {
    "url": "dl-manifest/MobilenetV1_MobilenetV1_Conv2d_11_pointwise_BatchNorm_batchnorm_add_y",
    "revision": "86b54f333255e8bbb59481253ec7e970"
  },
  {
    "url": "dl-manifest/MobilenetV1_MobilenetV1_Conv2d_12_depthwise_BatchNorm_batchnorm_add_y",
    "revision": "86b54f333255e8bbb59481253ec7e970"
  },
  {
    "url": "dl-manifest/MobilenetV1_MobilenetV1_Conv2d_12_pointwise_BatchNorm_batchnorm_add_y",
    "revision": "86b54f333255e8bbb59481253ec7e970"
  },
  {
    "url": "dl-manifest/MobilenetV1_MobilenetV1_Conv2d_13_depthwise_BatchNorm_batchnorm_add_y",
    "revision": "86b54f333255e8bbb59481253ec7e970"
  },
  {
    "url": "dl-manifest/MobilenetV1_MobilenetV1_Conv2d_13_pointwise_BatchNorm_batchnorm_add_y",
    "revision": "86b54f333255e8bbb59481253ec7e970"
  },
  {
    "url": "dl-manifest/MobilenetV1_MobilenetV1_Conv2d_2_depthwise_BatchNorm_batchnorm_add_y",
    "revision": "86b54f333255e8bbb59481253ec7e970"
  },
  {
    "url": "dl-manifest/MobilenetV1_MobilenetV1_Conv2d_2_pointwise_BatchNorm_batchnorm_add_y",
    "revision": "86b54f333255e8bbb59481253ec7e970"
  },
  {
    "url": "dl-manifest/MobilenetV1_MobilenetV1_Conv2d_3_depthwise_BatchNorm_batchnorm_add_y",
    "revision": "86b54f333255e8bbb59481253ec7e970"
  },
  {
    "url": "dl-manifest/MobilenetV1_MobilenetV1_Conv2d_3_pointwise_BatchNorm_batchnorm_add_y",
    "revision": "86b54f333255e8bbb59481253ec7e970"
  },
  {
    "url": "dl-manifest/MobilenetV1_MobilenetV1_Conv2d_4_depthwise_BatchNorm_batchnorm_add_y",
    "revision": "86b54f333255e8bbb59481253ec7e970"
  },
  {
    "url": "dl-manifest/MobilenetV1_MobilenetV1_Conv2d_4_pointwise_BatchNorm_batchnorm_add_y",
    "revision": "86b54f333255e8bbb59481253ec7e970"
  },
  {
    "url": "dl-manifest/MobilenetV1_MobilenetV1_Conv2d_5_depthwise_BatchNorm_batchnorm_add_y",
    "revision": "86b54f333255e8bbb59481253ec7e970"
  },
  {
    "url": "dl-manifest/MobilenetV1_MobilenetV1_Conv2d_5_pointwise_BatchNorm_batchnorm_add_y",
    "revision": "86b54f333255e8bbb59481253ec7e970"
  },
  {
    "url": "dl-manifest/MobilenetV1_MobilenetV1_Conv2d_6_depthwise_BatchNorm_batchnorm_add_y",
    "revision": "86b54f333255e8bbb59481253ec7e970"
  },
  {
    "url": "dl-manifest/MobilenetV1_MobilenetV1_Conv2d_6_pointwise_BatchNorm_batchnorm_add_y",
    "revision": "86b54f333255e8bbb59481253ec7e970"
  },
  {
    "url": "dl-manifest/MobilenetV1_MobilenetV1_Conv2d_7_depthwise_BatchNorm_batchnorm_add_y",
    "revision": "86b54f333255e8bbb59481253ec7e970"
  },
  {
    "url": "dl-manifest/MobilenetV1_MobilenetV1_Conv2d_7_pointwise_BatchNorm_batchnorm_add_y",
    "revision": "86b54f333255e8bbb59481253ec7e970"
  },
  {
    "url": "dl-manifest/MobilenetV1_MobilenetV1_Conv2d_8_depthwise_BatchNorm_batchnorm_add_y",
    "revision": "86b54f333255e8bbb59481253ec7e970"
  },
  {
    "url": "dl-manifest/MobilenetV1_MobilenetV1_Conv2d_8_pointwise_BatchNorm_batchnorm_add_y",
    "revision": "86b54f333255e8bbb59481253ec7e970"
  },
  {
    "url": "dl-manifest/MobilenetV1_MobilenetV1_Conv2d_9_depthwise_BatchNorm_batchnorm_add_y",
    "revision": "86b54f333255e8bbb59481253ec7e970"
  },
  {
    "url": "dl-manifest/MobilenetV1_MobilenetV1_Conv2d_9_pointwise_BatchNorm_batchnorm_add_y",
    "revision": "86b54f333255e8bbb59481253ec7e970"
  },
  {
    "url": "dl-manifest/MobilenetV1_Predictions_Reshape_shape",
    "revision": "fbc1ef38fd34b82147d0c199205475b8"
  }
].concat(self.__precacheManifest || []);
workbox.precaching.suppressWarnings();
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});
