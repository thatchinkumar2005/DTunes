from dotenv import load_dotenv
load_dotenv()
import pymongo
import pickle
from bson import ObjectId
import os
import json



client = pymongo.MongoClient(os.getenv("DATABASE_URL"), tls=True, tlsAllowInvalidCertificates=True)
db = client["Dtunes"]

def getRecommended(user_id, page, limit):

    offset = (page - 1) * limit

    mostPlayed = db["interactions"].aggregate(
        [
            {"$match": {"intType": "play"}},
            {"$group": {"_id": "$song", "totalCount": {"$sum": "$count"}}},
            {"$sort": {"totalCount": -1}},
            {"$limit": limit},
            {"$skip": offset},
        ]
    )
    mostLiked = db["likes"].aggregate(
        [
            {"$group": {"_id": "$song", "totalCount": {"$sum": 1}}},
            {"$sort": {"totalCount": -1}},
            {"$limit": limit},
            {"$skip": offset},
        ]
    )

    candidateSongs = []

    for i in mostPlayed:
        candidateSongs.append(i["_id"])
    for j in mostLiked:
        if j["_id"] not in candidateSongs:
            candidateSongs.append(j["_id"])

    if len(candidateSongs) < limit * 2:
        latest = db["songs"].aggregate(
            [
                {"$sort": {"releaseDate": -1}},
                {"$limit": limit * 2 - len(candidateSongs)},
                {"$skip": offset},
            ]
        )
        for i in latest:
            if i["_id"] not in candidateSongs:
                candidateSongs.append(i["_id"])

    interactions = db["interactions"].find({"user": ObjectId(user_id)})
    interactedSongs = []
    for i in interactions:
        if i["song"] not in interactedSongs:
            interactedSongs.append(str(i["song"]))

    interactedSongs = list(set(interactedSongs))

    with open(os.path.join(os.path.dirname(__file__), "../song_recommendation_model.pkl"), "rb") as f:
        model = pickle.load(f)

    recommendations = []

    for song in candidateSongs:
        if song not in interactedSongs:
            pred = model.predict(user_id, song)
            recommendations.append((song, pred.est))

    recommendations.sort(key=lambda x: x[1], reverse=True)
    
    return recommendations


if __name__ == "__main__":
    import sys

    user_id = sys.argv[1]
    page = sys.argv[2]
    limit = sys.argv[3]
    recommendations = getRecommended(str(user_id), int(page), int(limit))
    recommendationsDict = [{"song" : str(song), "score" : score} for song, score in recommendations]
    print(json.dumps(recommendationsDict))
