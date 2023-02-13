from yelpapi import YelpAPI
import pandas as pd
import time
import psycopg2
import datetime
from psycopg2.extensions import ISOLATION_LEVEL_AUTOCOMMIT

from pprint import pprint

yelp_api = YelpAPI('UXXqWGDx32G-Giwe4qOmun6BmN4HfcIQ1Z-rR4BrwWebEAyJrUZgFTzqKXlzVcVdjoRAOIWCqr-HkZMYsVrG69AKgerKQFjCAurXORnekQSaKmQI4h2Z-j8FxDuAYXYx')

chicago_downtown_zipcodes = [60626, 60601, 60602, 60603, 60604, 60605, 60606, 60607, 60608, 60610, 60611, 60612, 60616]

db_connection = psycopg2.connect(host='127.0.0.1',dbname="home_hub_db", user="postgres" , password="root")
db_connection.set_isolation_level(ISOLATION_LEVEL_AUTOCOMMIT)

cursor = db_connection.cursor()

while(True):


    count=0
    business = []
    for zip_code in chicago_downtown_zipcodes:
        for x in range(6):
            response = yelp_api.search_query(categories='hardware',location=zip_code,
                                     sort_by='rating', limit=40, offset=x*40)


    #         business = business.append(pd.DataFrame(response['businesses']))
            response = response['businesses'];
            if len(response) > 0:
                for r in response:
                    business.append([r['id'],r['location']['display_address'][0], '', r['is_closed'], r['display_phone'], r['distance'], r['image_url'], r['coordinates']['latitude'], r['coordinates']['longitude'], r['name'], r['review_count'], r['location']['zip_code'], r['rating'], r['location']['city']])


#     cursor.execute('Delete from public.stores ')
#     db_connection.commit()



    for row in business:
        val = '\', \''.join([str(x).replace("'", "") for x in row])

        try:

            cursor.execute( f"INSERT INTO public.stores (id, address_line1, address_line2, closed, display_phone, distance, image_url, latitude, longitude, name, review_count, zip_code, rating, city) VALUES('{val}')")


            db_connection.commit()

            cursor.execute(f"UPDATE public.stores SET where_is = ST_POINT(latitude,longitude);")
            db_connection.commit()

        except Exception as e:
            print(e)

    # print(datetime.now(), ' : Updated the store details and sleep for 2 minutes now ...')
    # time.sleep(120)
    continue