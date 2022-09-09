const Actor = require('../models/Actor');



exports.createActor = (req, res) => {

    const actor = new Actor(req.body); 

    actor.save((err, actor) => {
         
        if(err) {
            return res.status(400).json({
                error: 'bad Request !'
            })
        }

        res.json({
            actor: actor
        })
    })

}

exports.getAllActor = (req, res) => {

   
    Actor.find().exec((err, actor) => {

              if(err) {
                  return res.status(404).json({
                      error: "actor not found !"
                  })
              }

              res.json({
                  actor
              })
           })

}

exports.upadateActor = (req, res) => {


         const id = req.params.id_actor;
             
        //update
      Actor.findByIdAndUpdate(id,req.body, {useFindAndModify:false})
      .then(data => {
         res.send({
             message:"is updated  ",
             data
            })
        })
        .catch(() => {
            res.status(404).send({message:"Not upadte actor "});
        });

}

exports.deleteActorById = (req, res) => {

    const id = req.params.id_actr;
    //console.log(id)

    Actor.findByIdAndRemove(id)
       .then(() => {

          res.send({message:"deleted "})

       })
       .catch(() => {
             res.status(404).send({message:"Not found "});
        });

}

exports.findActorById = (req, res) => {

     const id = req.params.id_Act;

    Actor.findById(id)
       .then(data => {
           res.send(data)
       })
        .catch(() => {
             res.status(404).send({message:"Not found "});
        });

}