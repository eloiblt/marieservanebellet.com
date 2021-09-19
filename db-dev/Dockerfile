FROM mongo:latest

COPY sample_database/ /sample_database/

CMD mongorestore --host mongo:27017 --username eloiblt --password pwd --authenticationDatabase admin -d marieservanebellet /sample_database