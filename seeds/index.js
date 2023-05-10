const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');

main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/yelp-camp");
  console.log("--------------------");
  console.log("Database Connected");
}

// pick random elements from array
const sample = (array) => {
  return array[Math.floor(Math.random() * array.length)];
};

const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 200; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            //YOUR USER ID
            author: '6455f61f8934e87c40a897cb',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam dolores vero perferendis laudantium, consequuntur voluptatibus nulla architecto, sit soluta esse iure sed labore ipsam a cum nihil atque molestiae deserunt!',
            price,
            geometry: {
                type: "Point",
                coordinates: [
                  cities[random1000].longitude,
                  cities[random1000].latitude
                ]
            },
            images:[
        {
        url: 'https://res.cloudinary.com/dv4drvuki/image/upload/v1683447629/YelpCamp/uvmahs8d897camd1sr6j.jpg',
        filename: 'YelpCamp/uvmahs8d897camd1sr6j',
        },
        {
        url: 'https://res.cloudinary.com/dv4drvuki/image/upload/v1683447628/YelpCamp/kcynnvy6p8wm5aarwswg.jpg',
        filename: 'YelpCamp/kcynnvy6p8wm5aarwswg',
        }
      ]
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})