import pandas
import sys
data = {
    '_id':sys.argv[3],
    'username': sys.argv[1],
    'password':sys.argv[2]
}

excel_data = pandas.DataFrame([data])

excel_data.to_excel("./Python/Data/users.xlsx",index=False)