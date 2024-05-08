const projects = require('../Models/projectSchema')

exports.addProject = async(req,res) => {
    console.log('Inside addProject method');
    const {title,language,github,livelink,overview} = req.body
    const projectImage = req.file.filename
    const userId = req.payload
    console.log(title,language,github,livelink,overview);
    console.log(userId);
    try{
        const existingProject = await projects.findOne({github})
        console.log(existingProject);
        if(existingProject){
            res.status(406).json("Project already exist")
        }
        else{
            const newProject = new projects({
                userId,
                title,
                language,
                github,
                livelink,
                overview,
                projectImage,
            })
            await newProject.save()
            res.status(200).json(newProject)
        }
    }
    catch(err){
        res.status(500).json("Project adding failed ...." + err)
    }
   
}

// 1 get a particular project details
exports.viewProject = async(req,res)=>{
    const userId = req.payload
    console.log(userId);
    try{
        const viewProjects = await projects.find({userId})
        if(viewProjects){
            res.status(200).json(viewProjects)
        }
        else{
            res.status(403).json("Projects not found")
        }
    }
    catch(err){
        res.status(500).json("View Project Failed")
    }
}
// 2 get 3 project details for home project
exports.homeProject = async(req,res)=>{
    try{
        const hProject = await projects.find().limit(3)
        if(hProject){
            res.status(200).json(hProject)
        }
        else{
            res.status(404).json("noproject found")
        }
    }
    catch(err){
        res.status(500).json("display failed"+err)
    }
}
// 3 get all project details
exports.allProjects = async(req,res)=>{

    const searchKey = req.query.search
    console.log(searchKey);

    let query = {}

    // case sensitive
    if(searchKey){
        query.language = {$regex:searchKey,$options:"i"}
    }  

    try{
        const allProjects = await projects.find(query)
        console.log(allProjects);
        if(allProjects){
            res.status(200).json(allProjects)
        }
        else{
            res.status(402).json("No project found")
        }

    }
    catch(err){
        res.status(500).json("No existed projects" +err)
    }
}


// 4 delete user project
exports.deleteUserProject = async(req,res)=>{
    const {pid} =req.params //get params 
    try{
        const deleteUserProject = await projects.findOneAndDelete({_id:pid})
        // Creates a findOneAndDelete query: atomically finds the given document, deletes it, and returns the document as it was before deletion.
        res.status(200).json(deleteUserProject)
    }
    catch(err){
        res.status(401).json({message:err.message})
    }
}


// updata user project 
exports.updateUserProject = async (req,res) =>{
    const {title,language,github,livelink,overview} = req.body
    userId = req.payload
    const {pid} = req.params
    const uploadImage = req.file?req.file.filename:projectImage

    try{
        // FIND PARTICULAR PROJECT , UPDATE THE DATA AND SAVE THE CHANGES
    
        const updateProject = await projects.findByIdAndUpdate({_id:pid},{title,language,github,livelink,overview,projectImage:uploadImage,userId})
        await updateProject.save()
        res.status(200).json(updateProject)
    }
    catch(err){
        res.status(401).json({ message: err.message })
    }
}