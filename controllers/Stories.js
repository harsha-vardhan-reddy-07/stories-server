import Stories from '../models/Stories.js';
import Users from '../models/Users.js';

export const fetchStories = async (req, res) =>{
    try {

        const {category} = req.query
        let storiesData = {};

        const data = await Stories.find();
        if(category === 'all' || category === '' || category === null || category === undefined){

            const storyCategories = ["Food", "Fitness", "Travel", "Movie", "Education"]

            storyCategories.map((cat)=>{
                console.log(cat);
                
                storiesData[cat] = data.filter(story => story.category === cat)
            })
            
        }else{
            storiesData[category] = data.filter(story => story.category === category)
        }
        
        return res.json({status: true, data:    storiesData});
      } catch (error) {
        return res.json({status: false, message: 'Server error' });
      }
} 

export const fetchUserStories = async (req, res) =>{
    try {

        const {id} = req.params
        const {category} = req.query

        let stories = []

        if(category === 'all' || category === '' || category === null || category === undefined){

            stories = await Stories.find({user: id}) 
        }else{
            stories = await Stories.find({user: id, category: category}) 
        }
        
        const reversedArray = stories.reverse();


        return res.json({status: true, data: reversedArray});
      } catch (error) {
        console.error(error);
        return res.json({status: false, message: 'Network Error' });
      }
} 


export const addStory = async (req, res) =>{
    try {

        const {slidesData, category, user} = req.body
        

        const newStory = new Stories({slidesCount: slidesData?.length, slides: slidesData, category, user})

        const r = await newStory.save()

        await Users.updateOne({ _id: user }, { $push: { stories: r._id } })

        return res.json({status: true, message: "Story Added Successfully!!"})

      } catch (error) {
        return res.json({status: false, message: "Error occured!! Please try again later!"})
      }
} 

export const editStory = async (req, res) =>{
    try {
        const {id} = req.params
        const {slidesData, category} = req.body
        
        await Stories.updateOne({_id: id}, {slides: slidesData, category: category})

        return res.json({status: true, message: "Story Updated Successfully!!"})

      } catch (error) {
        return res.json({status: false, message: "Error occured!! Please try again later!"})
      }
} 

export const fetchStory = async (req, res) =>{
    try {

        const {id} = req.params

        const story = await Stories.findById(id)
        
        res.json({status: true, data: story});
      } catch (error) {
        console.error(error);
        return res.json({status: false, message: 'Network error' });
      }
} 

export const viewBookmarks = async (req, res) =>{
    try {

        const {id} = req.params;

        const user = await Users.findById(id).select('bookmarks')

        if (!user) {
            return res.json({status: false, message: 'User not found' });
          }
      
          const bookmarks = user.bookmarks; 
      
          const stories = await Stories.find({ _id: { $in: bookmarks } });
      
          return res.json({status: true, data: stories});
        
      } catch (error) {
        console.log(error);
        
        return  res.json({status: false, message: 'Server Error' });
      }
} 

export const likeStory = async (req, res) =>{
    try {

        const {storyId, userId} = req.params

        await Stories.updateOne({_id: storyId}, { $addToSet: { likes: userId },  $inc: { likesCount: 1 }})

        return res.json({status: true, message: "Like Added!!"});
      } catch (error) {
        console.error(error);
        return  res.json({status: false, message: "Error Occured!!"});
      }
} 

export const unLikeStory = async (req, res) =>{
    try {

        const {storyId, userId} = req.params

        await Stories.updateOne({_id: storyId}, { $pull: { likes: userId },  $inc: { likesCount: -1 }})

        return res.json({status: true, message: "Like Added!!"});
      } catch (error) {
        console.error(error);
        return  res.json({status: false, message: "Error Occured!!"});
      }
} 

export const addBookmark = async (req, res) =>{
    try {

        const {storyId, userId} = req.params

        await Stories.updateOne({_id: storyId}, { $addToSet: { bookmarks: userId } })
        await Users.updateOne({_id: userId}, { $addToSet: { bookmarks: storyId } })

        return res.json({status: true, message: "Bookmark Added!!"});
      } catch (error) {
        console.error(error);
        return  res.json({status: false, message: "Error Occured!!"});
      }
} 

export const removeBookmark = async (req, res) =>{
    try {

        const {storyId, userId} = req.params

        await Stories.updateOne({_id: storyId}, { $pull: { bookmarks: userId } })
        await Users.updateOne({_id: userId}, { $pull: { bookmarks: storyId } })

        return res.json({status: true, message: "Bookmark Removed!!"});
      } catch (error) {
        console.error(error);
        return  res.json({status: false, message: "Error Occured!!"});
      }
} 

