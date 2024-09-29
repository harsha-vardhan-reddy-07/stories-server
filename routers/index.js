import express from 'express';
import { login, register } from '../controllers/Users.js';
import { addBookmark, addStory, editStory, fetchStories, fetchStory, fetchUserStories, likeStory, removeBookmark, unLikeStory, viewBookmarks } from '../controllers/Stories.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);

router.get('/stories', fetchStories);
router.get('/user-stories/:id', fetchUserStories);
router.post('/add-story', addStory);
router.post('/edit-story/:id', editStory);
router.get('/fetch-story/:id', fetchStory);
router.get('/bookmarks/:id', viewBookmarks);

router.get("/like-story/:storyId/:userId", likeStory);
router.get("/unlike-story/:storyId/:userId", unLikeStory);
router.get('/add-bookmark/:storyId/:userId', addBookmark);
router.get('/remove-bookmark/:storyId/:userId', removeBookmark);




export default router;