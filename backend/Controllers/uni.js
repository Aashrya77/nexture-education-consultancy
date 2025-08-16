const uniSchema = require('../models/University'); 
// Adjust the path as necessary
const getUni = async (req, res) => {
    try {
        const universities = await uniSchema.find();
        res.status(200).json({
            success: true,
            data: universities
        });
    } catch (error) {
        console.error('Error fetching universities:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch universities'
        });
    }
}

const getUniByCountry = async (req, res) => {
    const { country } = req.params;
    try {
        const university = await uniSchema.find({country: country})
        if (!university) {
            return res.status(404).json({
                success: false,
                message: 'University not found'
            });
        }
        res.status(200).json({
            success: true,
            data: university
        });
    } catch (error) {
        console.error('Error fetching university by ID:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch university'
        });
    }   
}

const updateUni = async (req, res) => {
    const { id } = req.params;
    const { title, country, description, features } = req.body;
    try {
        const university = await uniSchema.findByIdAndUpdate(id, {
            title,
            country,
            description,
            features
        }, { new: true });  
        if (!university) {
            return res.status(404).json({
                success: false,
                message: 'University not found'
            });
        }
        res.status(200).json({
            success: true,
            data: university
        });
    }
    catch (error) {
        console.error('Error updating university:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to update university'
        });
    }
}

const deleteUni = async (req, res) => {
    const { id } = req.params;
    try {
        const university = await uniSchema.findByIdAndDelete(id);
        if (!university) {
            return res.status(404).json({
                success: false,
                message: 'University not found'
            });
        }
        res.status(200).json({
            success: true,
            message: 'University deleted successfully'
        });
    } catch (error) {
        console.error('Error deleting university:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to delete university'
        });
    }   
}

module.exports = {
    getUni,
    getUniByCountry,
    updateUni,
    deleteUni
};