require('../models/database');
const Categeory=require('../models/Categeory');
const Recipies=require('../models/recipie');


exports.homepage =async(req,res)=>{
    try {

        const limitNumber =5;
        const Categeories=await Categeory.find({}).limit(limitNumber);
     const latest=await Recipies.find({}).sort({_id: -1}).limit(limitNumber);
  const thai = await Recipies.find({ 'category': 'thai' }).limit(limitNumber);
    const american = await Recipies.find({ 'category': 'American' }).limit(limitNumber);
    const chinese = await Recipies.find({ 'category': 'Chinese' }).limit(limitNumber); 

    const food = { latest, thai, american, chinese };
        res.render('index',{title:"homepage",Categeories,food});
    } catch (error) {
        res.status(500).send({message:error.message||"Error"});
    }
    

    
}


async function insertDymmyCategoryData(){
  try {
    await Categeory.insertMany([
      {
        "name": "Thai",
        "image": "thai-food.jpg"
      },
      {
        "name": "American",
        "image": "american-food.jpg"
      }, 
      {
        "name": "Chinese",
        "image": "chinese-food.jpg"
      },
      {
        "name": "Mexican",
        "image": "mexican-food.jpg"
      }, 
      {
        "name": "india",
        "image": "indian-food.jpg"
      },
      {
        "name": "Spanish",
        "image": "spanish-food.jpg"
      }
    ]);
  } catch (error) {
    console.log('err', + error)
  }
}

insertDymmyCategoryData();





exports.exploreRecipe = async(req, res) => {
 try {
   let recipeId = req.params.id;
   const recipe = await Recipies.findById(recipeId);
   res.render('recipe', { title: 'Cooking Blog - Recipe', recipe } );
 } catch (error) {
   res.satus(500).send({message: error.message || "Error Occured" });
 }
} 


exports.explorecategory =async(req,res)=>{
    try {

        const limitNumber =20;
        const Categeories=await Categeory.find({}).limit(limitNumber);
    
        res.render('categories',{title:"category",Categeories});
    } catch (error) {
        res.status(500).send({message:error.message||"Error"});
    }
    
}
   

exports.explorecategoryById =async(req,res)=>{
  try {

       let categoryId=req.params.id;
      const limitNumber =20;
      const CategeoriesById=await Recipies.find({'category': categoryId}).limit(limitNumber);
  
      res.render('categories',{title:"category",CategeoriesById});
  } catch (error) {
      res.status(500).send({message:error.message||"Error"});
  }
  
}



async function insertDymmyRecipeData(){
  try {
    await Recipies.insertMany([
      { 
        "name": "Recipe Name Goes Here",
        "description": `Recipe Description Goes Here`,
        "email": "recipeemail@raddy.co.uk",
        "ingredients": [
          "1 level teaspoon baking powder",
          "1 level teaspoon cayenne pepper",
          "1 level teaspoon hot smoked paprika",
        ],
        "category": "American", 
        "image": "img1.jpg"
      },
      { 
        "name": "Recipe Name Goes Here",
        "description": `Recipe Description Goes Here`,
        "email": "recipeemail@raddy.co.uk",
        "ingredients": [
          "1 level teaspoon baking powder",
          "1 level teaspoon cayenne pepper",
          "1 level teaspoon hot smoked paprika",
        ],
        "category": "thai", 
        "image": "img2.jpg"
      },
      { 
        "name": "Recipe Name Goes Here",
        "description": `Recipe Description Goes Here`,
        "email": "recipeemail@raddy.co.uk",
        "ingredients": [
          "1 level teaspoon baking powder",
          "1 level teaspoon cayenne pepper",
          "1 level teaspoon hot smoked paprika",
        ],
        "category": "Chinese", 
        "image": "img3.jpg"
      },
      { 
        "name": "Recipe Name Goes Here",
        "description": `Recipe Description Goes Here`,
        "email": "recipeemail@raddy.co.uk",
        "ingredients": [
          "1 level teaspoon baking powder",
          "1 level teaspoon cayenne pepper",
          "1 level teaspoon hot smoked paprika",
        ],
        "category": "India", 
        "image": "img4.jpg"
      },
      { 
        "name": "Recipe Name Goes Here",
        "description": `Recipe Description Goes Here`,
        "email": "recipeemail@raddy.co.uk",
        "ingredients": [
          "1 level teaspoon baking powder",
          "1 level teaspoon cayenne pepper",
          "1 level teaspoon hot smoked paprika",
        ],
        "category": "Mexican", 
        "image": "img5.jpg"
      },

    ]);
  } catch (error) {
    console.log(error);
  }
}

insertDymmyRecipeData();




exports.searchRecipe = async(req, res) => {
  try {
    let searchTerm = req.body.searchTerm;
    let recipe = await Recipies.find( { $text: { $search: searchTerm, $diacriticSensitive: true } });
    res.render('search', { title: 'Cooking Blog - Search', recipe } );
  } catch (error) {
    res.satus(500).send({message: error.message || "Error Occured" });
  }
  
}

exports.submitrecipe = async(req, res) => {
  const infoErrorsObj = req.flash('infoErrors');
  const infoSubmitObj = req.flash('infoSubmit');
  res.render('submit-recipe', { title: 'Cooking Blog - Submit Recipe', infoErrorsObj, infoSubmitObj  } );
}



exports.submitRecipeOnPost = async(req, res) => {
  try {

    let imageUploadFile;
    let uploadPath;
    let newImageName;

    if(!req.files || Object.keys(req.files).length === 0){
      console.log('No Files where uploaded.');
    } else {

      imageUploadFile = req.files.image;
      newImageName = Date.now() + imageUploadFile.name;

      uploadPath = require('path').resolve('./') + '/public/uploads/' + newImageName;

      imageUploadFile.mv(uploadPath, function(err){
        if(err) return res.satus(500).send(err);
      })

    }

    const newRecipe = new Recipies({
      name: req.body.name,
      description: req.body.description,
      email: req.body.email,
      ingredients: req.body.ingredients,
      category: req.body.category,
      image: newImageName
    });
    
    await newRecipe.save();

    req.flash('infoSubmit', 'Recipe has been added.')
    res.redirect('/submit-recipe');
  } catch (error) {
    // res.json(error);
    req.flash('infoErrors', error);
    res.redirect('/submit-recipe');
  }
}




   
// async function insertDymmyRecipeData(){
//     try {
//       await Recipie.insertMany([
//         { 
//           "name": "Recipe Name Goes Here",
//           "description": `Recipe Description Goes Here`,
//           "email": "recipeemail@raddy.co.uk",
//           "ingredients": [
//             "1 level teaspoon baking powder",
//             "1 level teaspoon cayenne pepper",
//             "1 level teaspoon hot smoked paprika",
//           ],
//           "category": "American", 
//           "image": "southern-friend-chicken.jpg"
//         },
//         { 
//           "name": "Recipe Name Goes Here",
//           "description": `Recipe Description Goes Here`,
//           "email": "recipeemail@raddy.co.uk",
//           "ingredients": [
//             "1 level teaspoon baking powder",
//             "1 level teaspoon cayenne pepper",
//             "1 level teaspoon hot smoked paprika",
//           ],
//           "category": "American", 
//           "image": "southern-friend-chicken.jpg"
//         },
//       ]);
//     } catch (error) {
//       console.log(error);
//     }
//   }
  
//   insertDymmyRecipeData();
  
  
  
  
  
