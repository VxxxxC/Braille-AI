from sanic import Sanic
from sanic.response import json

app = Sanic(__name__)

@app.get("/")
async def hello_world(request):
    print(request)
    return json("hello world")

if __name__ == "__main__":
    app.run(host="localhost", port=5000, debug=True, dev=True)