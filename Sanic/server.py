# %%
from logging import root
from sanic import Sanic
from sanic.response import json
from PIL import Image
import tensorflow as tf
import os
import numpy as np
from functools import reduce


# %%
app = Sanic(__name__)


# @app.get("/")
# def test(request):
#     print(request)
#     return json("Hello World by Sanic")


@app.post("/api")
def braille_api(request):

    # %%
    res = request.json
    print('Sample received from Frontend via Express Server!')
    print(res)

    # %%
    # Load the model
    model = tf.saved_model.load('./model')
    print(model)
    print('load model ok..')


    real_path = (os.path.dirname(os.path.realpath(__file__)))
    print('start point:',real_path)

    root =os.path.dirname(real_path)
    print('root is ',root)

    path_list = os.listdir(root)
    print('dir list at root',path_list)

    express_dir = os.path.join(root,'Express/upload')
    print('imaeg print',express_dir)

    image = os.path.join(express_dir, res)
    print('show the',image)

# %%
    class_names = [
        'a', 'b', 'c', 'd', 'e', 'f',
        'g', 'h', 'i', 'j', 'k', 'l',
        'm', 'n', 'o', 'p', 'q', 'r',
        's', 't', 'u', 'v', 'w', 'x',
        'y', 'z'
    ]

    # %%
    # pil
    IMG_SIZE = (28, 28)
    img = Image.open(image)
    # print(type(img))
    print(img.format)
    print(img.size)
    print(img.mode)
    img = img.resize(IMG_SIZE)
    print(img.size)
    img_arr = np.array(img)
    # print(type(img_arr))
    print("this is np.arry of image : ", img_arr)
    print("this is image shape : ", img_arr.shape)

    # %%
    # print(prediction)
    prediction = model([img_arr], training=False)

    chance_list = []
    for i in range(len(class_names)):
        chance_list.append((class_names[i], float(prediction[0][i])))
        # print("this is prediction of image : ", chance_list[i])

    chance_list.sort(key=lambda x: -x[1])
    alphabet = (chance_list[0][0])
    print(alphabet)
    confidence = ((str(int(chance_list[0][1]*100))) + '%')
    print(confidence)

    return json({"Predicted Word": alphabet, "Confidence": confidence})


# app.run must be at the bottom , otherwise cannot start the server
if __name__ == "__main__":
    app.run(host="localhost", port=5010, dev=True, debug=True)

# %%
