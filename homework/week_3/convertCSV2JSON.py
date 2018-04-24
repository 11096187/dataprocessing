import csv
import json

csvfile = open("data.csv", "r")
jsonfile = open("data.json", "w")

fieldnames = ("year", "number")
reader = csv.DictReader(csvfile, fieldnames)

for row in reader:
    json.dump(row, jsonfile)
    jsonfile.write("\n")
