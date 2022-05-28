const mongoose=require('mongoose');

const recipieSchema=new mongoose.Schema({

    name: {
        type: String,
        required: 'This field is required.'
      },
      email: {
        type: String,
        required: 'This field is required.'
      },
      description: {
        type: String,
        required: 'This field is required.'
      },
      ingredients: {
        type: Array,
        required: 'This field is required.'
      },
      category: {
        type: String,
        enum:['thai','American','Chinese','Mexican','India'],
        required: 'This field is required.'
      },
     
      image: {
        type: String,
        required: 'This field is required.'
      }
     ,

});
recipieSchema.index({ "$**" : 'text' });

module.exports=mongoose.model('Recipie',recipieSchema);