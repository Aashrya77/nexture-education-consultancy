import HomeContent from '../models/Homecontent.js';
import multer from 'multer';
const upload = multer({ dest: 'uploads/' });
const createContent = async (req, res) => {
    const { title, description, highlight } = req.body;
    try {
        const newContent = new HomeContent({ title, description, highlight, images: [] });
        // Handle file uploads if any
         if (req.files && req.files.length > 0) {
      newContent.images = req.files.map(file => `uploads/${file.filename}`);
    }

        await newContent.save();
        res.status(201).json({ success: true, data: newContent });
    } catch (error) {
        console.error('Error creating content:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
}

const getContent = async (req, res) => {
    try {
        const content = await HomeContent.find();
        res.status(200).json({ success: true, data: content });
    } catch (error) {
        console.error('Error fetching content:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
}

const deleteContent = async (req, res) => {
    const { id } = req.params;
    try {
        const content = await HomeContent.findByIdAndDelete(id);
        if (!content) {
            return res.status(404).json({ success: false, message: 'Content not found' });
        }
        res.status(200).json({ success: true, message: 'Content deleted successfully' });
    } catch (error) {
        console.error('Error deleting content:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
}
const updateContent = async (req, res) => {
    const { id } = req.params;
    const { title, description, highlight } = req.body;
    try {
        const content = await HomeContent.findByIdAndUpdate(id, { title, description, highlight }, { new: true });
        if (!content) {
            return res.status(404).json({ success: false, message: 'Content not found' });
        }
        // Handle file uploads if any
        if (req.files && req.files.length > 0) {
            content.images = req.files.map(file => `uploads/${file.filename}`);
        }
        await content.save();
        res.status(200).json({ success: true, data: content });
    } catch (error) {
        console.error('Error updating content:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
}

export { createContent, getContent, updateContent };