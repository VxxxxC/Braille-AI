from sanic import Sanic
from sanic.response import json

app = Sanic(__name__)

@app.get("/")
def test(request):
    print(request)
    return json("Hello World by Sanic")

@app.post("/api")
def express_api(request):
    print(request)
    res = request.json
    print(res)
    return json("Sanic server: Hello!!")




# app.run must be at the bottom , otherwise cannot start the server
if __name__ == "__main__":
    app.run(host="localhost", port=5000)
