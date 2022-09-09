const Category = require('../models/Category');



exports.createCategory = (req, res) => {

    const category = new Category(req.body); 

    category.save((err, category) => {
         
        if(err) {
            return res.status(400).json({
                error: 'bad Request !'
            })
        }

        res.json({
            category: category
        })
    })

}

exports.getAllCategory = (req, res) => {

   
    Category.find().exec((err, category) => {

              if(err) {
                  return res.status(404).json({
                      error: "Category not found !"
                  })
              }

              res.json({
                  category
              })
           })

}

exports.upadateCategory = (req, res) => {


         const id = req.params.id_category;
             
        //update
      Category.findByIdAndUpdate(id,req.body, {useFindAndModify:false})
      .then(data => {
         res.send({
             message:"is updated  ",
             data
            })
        })
        .catch(() => {
            res.status(404).send({message:"Not upadte Category "});
        });

}

exports.deleteCategoryById = (req, res) => {

    const id = req.params.id_categ;
    //console.log(id)

    Category.findByIdAndRemove(id)
       .then(() => {

          res.send({message:"deleted "})

       })
       .catch(() => {
             res.status(404).send({message:"Not found "});
        });

}

exports.findCategoryById = (req, res) => {

     const id = req.params.id_catg;

    Category.findById(id)
       .then(data => {
           res.send(data)
       })
        .catch(() => {
             res.status(404).send({message:"Not found "});
        });

}