import json

file = open('store.json')

data = json.load(file)

arr = ['de', 'at', 'ch', 'es', 'fr', 'fi', 'hk', 'hr', 'it', 'jp', 'kr', 'kw', 'lt', 'nl', 'pl', 'ro', 'no', 'pt', 'ru', 'sk', 'se', 'sg', 'us', 'sa', 'tw', 'qa', 'au', 'ca', 'cn', 'cz', 'dk', 'hu', 'jo', 'th', 'my', 'ie', 'gb', 'be']

dict = {}

for a in arr:
    dict[a] = []

for d in data:
    cc = d['countryCode']
    buCode = d['buCode']
    name = d['name']

    dict[cc].append(buCode)

out_file = open("myfile.json", "w")

json.dump(dict, out_file, indent=6)

out_file.close()




