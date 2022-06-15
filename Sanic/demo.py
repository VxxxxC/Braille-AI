
# %%
from PIL import Image
import tensorflow as tf
import os
import numpy as np
from tensorflow import keras

# %%
dir = os.path.dirname('./model/saved_model.pb')
print(dir)
# tf.saved_model.LoadOptions(experimental_io_device='/job:localhost')image_path = '/Users/veperho/Desktop/Tecky_BAD_Project/Express/upload'
img_path = os.path.join(
    "./uploads", "d8439768be365c657f06fc700.jpeg")  # Load the model
model = tf.saved_model.load('./model')

print('load model ok..')
print(img_path)

# %%
# pil
IMG_SIZE = (28, 28)
img = Image.open(img_path)
print(img.format)
print(img.size)
print(img.mode)
img = img.resize(IMG_SIZE)
print(img.size)
img_arr = np.array(img)
print(type(img))
print(type(img_arr))
print(img_arr.shape)

# %%
class_names = [
    'a', 'b', 'c', 'd', 'e', 'f',
    'g', 'h', 'i', 'j', 'k', 'l',
    'm', 'n', 'o', 'p', 'q', 'r',
    's', 't', 'u', 'v', 'w', 'x',
    'y', 'z'
]

# %%
prediction = model([img_arr])
print(prediction[0])
chance_list = []
for i in range(len(class_names)):
    chance_list.append((class_names[i], float(prediction[0][i])))

# print(chance_list)
# print(float(prediction[0][0]))

# lambda x: -x[1] === (x)=>{-x[1]} forEach
chance_list.sort(key=lambda x: -x[1])
print(chance_list)
print(chance_list[0][0])

# %%
sum(list(prediction[0]))

# 1. read image

# 2. resize image

# 3. convert np array

# 4. put it into model to predict

# 5. 對答案 for loop find the highest probability of answer with the matching classes

# print(predict_dataset.shape)

# predict_dataset = tf.convert_to_tensor([sample_image])

# %%
