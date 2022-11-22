from datetime import datetime
curr_time=str(datetime.now())
sym=[" ","-",".",":"]
time_string=""
for char in curr_time:
    if char in sym:
        continue
    else:
        time_string +=char
print(time_string)
def generate():
    return time_string