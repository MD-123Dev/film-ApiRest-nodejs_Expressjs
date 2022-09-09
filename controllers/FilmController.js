
const Film = require('../models/Film');
const Joi = require('joi');
const fs = require('fs');
const formidable = require('formidable')

//***add film  */
exports.createFilm= (req, res) => {
     
     //***image */

       let form = new formidable.IncomingForm();

       form.keepExtensions = true;

        form.parse(req, (err, fields, files) => {

            if(err) {
                return res.status(400).json({
                    error: 'Image could not uploaded !'
                })
            }

             const film = new Film(fields); 

             //****validation  */
                const schema = Joi.object({
                        name: Joi.string().required(),
                        description: Joi.string().required(),
                        rate: Joi.number(),
                        category: Joi.required(),
                        actor: Joi.required()
                    })

                    const { error } = schema.validate(fields);

                    if(error) {
                        return res.status(400).json({
                            error: error.details[0].message
                        })
                    }

              //***/ 

       if(files.image) {
           
            if(files.image.size > Math.pow(10, 6)) {
                return res.status(400).json({
                    error: 'Image should be less than 1 mb in size !'
                })
            }

            film.image.data = fs.readFileSync(files.image.filepath )
            film.image.contentType = files.image.type
        }
     
     //*** */


    film.save((err, film) => {
         
        if(err) {
            return res.status(400).json({
                error: 'bad Request !'
            })
        }

        res.json({
            film: film
        })
    })

    })
        
}

//**get film by id  */
exports.filmById = (req, res, next, id) => {


    Film.findById(id)
       .then(data => {
           res.send(data)
       })
        .catch(() => {
             res.status(404).send({message:"Not found "});
        });

}


//***get all films  */
exports.getAllFilms = (req, res) => {
  
    let sortBy = req.query.sortBy ? req.query.sortBy : '_id';//sorting 
    let order = req.query.order ? req.query.order : 'asc';//**order by asc */
    let limit = req.query.limit ||  3; //*limit in page
    let page = req.query.page || 1; //*page

    let start = (page - 1) * limit;
   
    Film.find()
           .select()
           .sort([[sortBy, order]])
           .limit(limit)
           .skip(start)
           .exec((err, film) => {

              if(err) {
                  return res.status(404).json({
                      error: "Films not found !"
                  })
              }

              res.json({
                  film,
                   currentPage: page
              })
           })
  
}

//***delete film by id  */
exports.deleteFilm = (req, res) => {
  
    const id = req.params.id_film;
    //console.log(id)

    Film.findByIdAndRemove(id)
       .then(() => {

          res.send({message:"deleted "})

       })
       .catch(() => {
             res.status(404).send({message:"Not found "});
        });
       

  
}

//****delete all films */

exports.deleteAllFilms = (req, res) => {
  
    
      Film.deleteMany()
       .then(() => {
         res.send({message:"is delete  "})
        })
        .catch(() => {
              res.status(404).send({message:"Not delete Films "});
        });
     

}

//***upadte data  */
exports.updateFilm = (req, res) => {
  
      

      //***image */

       let form = new formidable.IncomingForm();

       form.keepExtensions = true;

        form.parse(req, (err, fields, files) => {

            if(err) {
                return res.status(400).json({
                    error: 'Image could not uploaded !'
                })
            }

            const id = req.params.id_movie;
            
           let film = new Film();
            

       if(files.image) {
           
            if(files.image.size > Math.pow(10, 6)) {
                return res.status(400).json({
                    error: 'Image should be less than 1mb in size !'
                })
            }

            film.image.data = fs.readFileSync(files.image.filepath )
            film.image.contentType = files.image.type
        }
      
            //****validation  */
                const schema = Joi.object({
                        name: Joi.string().required(),
                        description: Joi.string().required(),
                        rate: Joi.number(),
                        category: Joi.required(),
                        actor: Joi.required()
                    })

                   const  {error}  = schema.validate(fields);

                    if(error) {
                        return res.status(400).json({
                            error: error.details[0].message
                        })
                    }

             
           
      
        //update
      Film.findByIdAndUpdate(id,fields, {useFindAndModify:false})
      .then(data => {
         res.send({
             message:"is updated  ",
             data
            })
        })
        .catch(() => {
            res.status(404).send({message:"Not upadte Films "});
        });

       
      });   
  
}

//***search by name or rate  */
exports.searchFilm = (req, res) => {

    const name = req.query.name;
    const rate = req.query.rate;
     
    Film.find({ $or: [{name: name}, {rate: rate}]})
        .then(data => {
        res.send(data);
        })
        .catch(err => {
        res.status(500).send({
            message:
            err.message || "Some error occurred while retrieving Films."
        });
        });
  
}

//***get film with category "" */

 exports.getFilmWithCategory = (req, res ) => {
    

    Film.find({_id:req.params.filmId})
           .select('-image')
           .populate('category', 'name')
           .exec((err, film) => {

                if(err) {
                    return res.status(404).json({
                        error: "film not found !"
                    })
                }

                res.json({
                    film:film
                })

           })

}

//***get film with category and actors "" */

 exports.getFilmWithCategoryAndActor = (req, res ) => {
    

    Film.find({_id:req.params.movieId})
           .select('-image')
           .populate('category', 'name')
           .populate('actor', 'lastname nationality' )
           .exec((err, film) => {

                if(err) {
                    return res.status(404).json({
                        error: "film not found !"
                    })
                }

                res.json({
                    film:film
                })

           })

}