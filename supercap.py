import pymongo
import json

#Replace username and password. User must be in database users list.
client = pymongo.MongoClient('mongodb://<username>:<password>@ds055752.mongolab.com:55752/supercap')

#Change the filename as needed
with open("supercap.json") as json_file:
    json_data = json.load(json_file)
    db = client.supercap #client.<database name>
    table = db.ionic_liquids #db.<table name>
    for obj in json_data[0]:
        json_data[0][obj]['_id'] = obj; #Adds _id into the document so mongodb doesn't give us new one.
        table.update_one({'_id': obj}, {'$set': json_data[0][obj]}, True) #Creates new document or updates existing one.
print("Done")
