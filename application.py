from flask import Flask,render_template,request
from pipeline.prediction_pipeline import hybrid_recommendation

app = Flask(__name__) ## initializing flask app

@app.route('/' , methods=['GET','POST'])
def home(): ## home page route
    ## this is the home page route where we will render the index.html file
    recommendations = None ## no recommendations at the start

    if request.method == 'POST':
        try:
            user_id = int(request.form["userID"])

            recommendations = hybrid_recommendation(user_id)
        except Exception as e:
            print("Error occurred....")

    return render_template('index.html' , recommendations=recommendations) ## render the index.html file and pass the recommendations to it

if __name__=="__main__":
    app.run(debug=True,host='0.0.0.0',port=5000)