# frame-interplation-webapp
* proxy need to be set in `setupProxy.js` 
* Auto reload feature is there


# How to run
```
docker-compose build
docker-compose up
```

* Open browser and access `http://localhost:3000`

# Note
* How to run interpolation algorithm
```
python3 /home/app/eval/interpolator_cli.py --pattern /home/app/ghibli --model_path /home/app/models/film_net/Style/saved_model    --times_to_interpolate 5 --output_video
```

* Remember not to put last `/` onto path

