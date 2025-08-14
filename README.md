# frame-interplation-webapp
* proxy need to be set in `setupProxy.js` 
* Auto reload feature is there


# How to run
* Download pre-trained TF2 Saved Models from [s3](https://my-inhouse-models.s3.ap-northeast-1.amazonaws.com/frame_interpolation_models.zip) and put into `/<root>/backend/media/models`

* The downloaded folder should have the following structure:

```
/home/app/backend/media/models
├── film_net/
│   ├── L1/
│   ├── Style/
│   ├── VGG/
├── vgg/
│   ├── imagenet-vgg-verydeep-19.mat
```

* Run by docker
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

