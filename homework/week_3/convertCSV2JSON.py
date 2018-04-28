# ConvertCSV2JSON
# Converts data in csv to json.
#
# Name: Felicia van Gastel
# Student nr: 11096187
# Date: 27-04-2018
#
# Data Processing
# Week 3

import csv
import json

csvfile = open("data.csv", "r")
jsonfile = open("data.json", "w")

fieldnames = ("year", "population")
reader = csv.DictReader(csvfile, fieldnames)

for row in reader:
    json.dump(row, jsonfile)
    jsonfile.write('\n')

csvfile.close()
jsonfile.close()
