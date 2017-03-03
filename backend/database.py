#library imports
import mysql.connector
import configparser
import sqlalchemy.pool as pool
from sqlalchemy import create_engine

#no custom imports


'''
None of these are needed yet, but better to have them here now

#Getting config information for mysql login
#Reading config information for mysql from file in order to 
#avoid having sensitive info in shared source code. Will require
#dev credentials for local developement, and production credentials
#for deployment. These can be in any file, as long as they are in correct
#format. 
config = configparser.ConfigParser() 
config.read("devcfg")
my_host = config.get('test', 'mysql_host')
my_user = config.get('test', 'mysql_user')
my_pwd = config.get('test', 'mysql_pwd')
my_db = config.get('test', 'mysql_db')

#Initial database pool creation
#using pool so a new database connection isnt established everytime any request is made
conString = "mysql+mysqlconnector://%s:%s@%s/%s" %(my_user, my_pwd, my_host, my_db)
dbPool = create_engine(conString, poolclass=pool.QueuePool, pool_recycle=28800, pool_size=20)
'''

dbPool = None	#will obvi change this once we get database set up
