from dotenv import load_dotenv
load_dotenv()
import pymongo
from surprise import Reader, Dataset, KNNBasic
import pandas as pd
import pickle
import os

client = pymongo.MongoClient(os.getenv("DATABASE_URL"))
db = client["Dtunes"]

interactions = db.interactions.find()

data = []

for i in interactions:
    if i["intType"] == "play":
        rating = min(i["count"], 10)
    else:
        rating = 5

    
    data.append((str(i["user"]), str(i["song"]), rating))

df = pd.DataFrame(data, columns=["user", "song", "rating"])
reader = Reader(rating_scale=(1,10))
data = Dataset.load_from_df(df[["user", "song", "rating"]], reader)

print(df)

trainset = data.build_full_trainset()
model = KNNBasic(sim_options={"name" : "cosine", "user_based":False})
model.fit(trainset)


with open("song_recommendation_model.pkl", "wb") as f:
    pickle.dump(model, f)

