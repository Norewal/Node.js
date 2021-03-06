const fs = require('fs');
const Tour = require('./../models/tourModel');
//test
//const tours = JSON.parse(fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`));

exports.checkID = (req, res, next, val) => {
    console.log(`Tour id is: ${val}`);
    if(req.params.id * 1 > tours.length) { 
        return res.status(404).json({
            status: 'fail',
            message: 'Invalid ID'
        });
    }
    next();
};

exports.checkBody = (req, res, next) => {
    if(!req.body.name || !req.body.price) {
        return res.status(400).json({
            status: 'fail',
            message: 'Missing name or price'
        });
    }
    next();
};

//   2 - Route handlers
exports.getAllTours = (req, res) => {
    console.log(req.requestTime);

    res
        .status(200)
        .json({
            status: 'success',
            requestedAt : req.requestTime,
            //results: tours.length,
            //data: {
            //    tours      
            //}
    });
};

exports.getTour = (req, res) => {
    console.log(req.params); 

    const id = req.params.id * 1;

    /* const tour = tours.find(el => el.id === id);

    res
    .status(200)
    .json({
        status: 'success', 

        data: {
            tour       //same name like at the const tours = JSON....
        } 
    }); */
};

exports.createTour = (req, res) => {      
    //console.log(req.body);
    //res.send('Done');

    const newId = tours[tours.length -1].id + 1;   //last tour
    const newTour = Object.assign({id: newId}, req.body);  //assign:  allows us to create a new object by merging two existing objects

    tours.push(newTour);

    fs.writeFile(
        `${__dirname}/../dev-data/data/tours-simple.json`, 
        JSON.stringify(tours), 
        err => {
            res.status(201).json({ // 201 - stands for created a new resource on the server
                status: 'success',
                data: {
                    tour: newTour
            }
        });
    });
};

exports.updateTour = (req, res) => {
    
    res.status(200).json({
        status: 'success',
        data: {
            tour: '<Updated tour here...>'
        }
    });
};

exports.deleteTour = (req, res) => {
    
    res.status(204).json({
        status: 'success',
        data: null
    });
};