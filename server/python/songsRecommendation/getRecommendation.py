import pymongo
import pickle
from bson import ObjectId


client = pymongo.MongoClient("mongodb://localhost:27017")
db = client["Dtunes"]


def getRecommended(user_id,limit):

    popularSongs = db["interactions"].aggregate([
        {"$match" : {"intType" : "play"}},
        {
        "$group" : {
            "_id" : "$song",
            "totalCount" : {"$sum" : "$count"}
        }
        },
        {
            "$sort" : {"totalCount" : -1}
        }, 
        {
            "$limit" : limit
        }
    ])
    print(popularSongs)
    candidateSongs = [str(i["_id"]) for i in popularSongs]
    
    print(candidateSongs)

    interactions = db["interactions"].find({"user" : user_id});
    interactedSongs = []
    for i in interactions:
        interactedSongs.append(str(i["song"]))

    interactedSongs = list(set(interactedSongs))

    print(interactedSongs)

    with open("song_recommendation_model.pkl", "rb") as f:
        model = pickle.load(f)

    recommendations = []

    for song in candidateSongs:
        if(song not in interactedSongs):
            pred = model.predict(user_id, song)
            recommendations.append((song, pred.est))

    recommendations.sort(key=lambda x: x[1], reverse=True)
    return recommendations


if __name__ == "__main__":
    import sys
    user_id = sys.argv[1]
    recommendations = getRecommended(user_id, 1000)

