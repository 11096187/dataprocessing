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
from collections import OrderedDict

csvfile = open("data.csv", "r")
jsonfile = open("data.json", "w")

fieldnames = ("Year", "Population")
reader = csv.DictReader(csvfile, fieldnames)

list = []

for row in reader:
    data = OrderedDict()
    for element in fieldnames:
        data[element] = row[element].strip()
    list.append(data)

json.dump(list, jsonfile)

csvfile.close()
jsonfile.close()
